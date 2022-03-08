import { Component, Input, OnInit } from '@angular/core';
import { AlgorithmDto } from 'api-atlas/models/algorithm-dto';
import { ImplementationDto } from 'api-atlas/models/implementation-dto';
import { ImplementationDto as NisqImplementationDto } from 'api-nisq/models/implementation-dto';
import { BehaviorSubject, interval, Observable, Subscription } from 'rxjs';
import { CompilerAnalysisResultDto } from 'api-nisq/models/compiler-analysis-result-dto';
import { CompilationJobDto } from 'api-nisq/models/compilation-job-dto';
import {
  exhaustMap,
  first,
  map,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { CompilerAnalysisResultService } from 'api-nisq/services/compiler-analysis-result.service';
import { ExecutionResultDto } from 'api-nisq/models/execution-result-dto';
import { ImplementationService, RootService } from 'api-nisq/services';
import { CompilerSelectionDto } from 'api-nisq/models';
import { MatTableDataSource } from '@angular/material/table';
import { ChangePageGuard } from '../../../../services/deactivation-guard';
import { UtilService } from '../../../../util/util.service';
import { ImplementationExecutionDialogComponent } from '../dialogs/implementation-execution-dialog/implementation-execution-dialog.component';
import { NisqAnalyzerService } from '../../nisq-analyzer/nisq-analyzer.service';

@Component({
  selector: 'app-implementation-execution',
  templateUrl: './implementation-execution.component.html',
  styleUrls: ['./implementation-execution.component.scss'],
})
export class ImplementationExecutionComponent implements OnInit {
  @Input() algo: AlgorithmDto;
  @Input() impl: ImplementationDto;
  @Input() guard: ChangePageGuard;

  analyzeColumns = [
    'qpu',
    'provider',
    'compiler',
    'analyzedDepth',
    'analyzedWidth',
    'time',
    'execution',
  ];

  latestCompilationJob?: CompilationJobDto = undefined;
  executedCompilationResult: CompilerAnalysisResultDto;
  results?: ExecutionResultDto = undefined;
  nisqImpl: NisqImplementationDto;
  compilerResults$: Observable<CompilerAnalysisResultDto[]>;
  expandedElement: CompilerAnalysisResultDto | null;
  expandedElementExecResult: ExecutionResultDto | null;
  pollingAnalysisJobData: Subscription;
  notReadycompilationJobsMap: Map<string, CompilationJobDto> = new Map();

  sort$ = new BehaviorSubject<string[] | undefined>(undefined);

  constructor(
    private readonly http: HttpClient,
    private readonly compilerResultService: CompilerAnalysisResultService,
    private utilService: UtilService,
    private rootService: RootService,
    private nisqImplementationService: ImplementationService,
    private nisqAnalyzerService: NisqAnalyzerService
  ) {}

  ngOnInit(): void {
    this.compilerResults$ = this.sort$
      .pipe(
        switchMap((sort) =>
          this.compilerResultService.getCompilerAnalysisResults({
            sort,
          })
        )
      )
      .pipe(tap(() => (this.expandedElement = null)))
      .pipe(
        map((dto) =>
          dto.compilerAnalysisResultList.filter(
            (compilerResult) => compilerResult.circuitName === this.impl.name
          )
        )
      );
    this.refreshNisqImpl();
  }

  changeSort(active: string, direction: 'asc' | 'desc' | ''): void {
    if (!active || !direction) {
      this.sort$.next(undefined);
    } else {
      this.sort$.next([`${active},${direction}`]);
    }
  }

  execute(analysisResult: CompilerAnalysisResultDto): void {
    this.results = undefined;
    this.executedCompilationResult = analysisResult;
    this.nisqAnalyzerService
      .executeCompilationResult(analysisResult.id)
      .subscribe(
        (results) => {
          this.utilService.callSnackBar(
            'Successfully created execution job "' + results.id + '".'
          );
          this.ngOnInit();
          if (results.status === 'FAILED' || results.status === 'FINISHED') {
            this.results = results;
          } else {
            interval(1000)
              .pipe(
                exhaustMap(() =>
                  this.http.get<ExecutionResultDto>(results._links['self'].href)
                ),
                first(
                  (value) =>
                    value.status === 'FAILED' || value.status === 'FINISHED'
                )
              )
              .subscribe((finalResult) => {
                this.results = finalResult;
              });
          }
        },
        () => {
          this.utilService.callSnackBar('Error! Could not execute.');
        }
      );
  }

  hasExecutionResult(analysisResult: CompilerAnalysisResultDto): boolean {
    return !!Object.keys(analysisResult._links).find((key) =>
      key.startsWith('execute-')
    );
  }

  showExecutionResult(analysisResult: CompilerAnalysisResultDto): void {
    if (Object.is(this.expandedElement, analysisResult)) {
      this.expandedElement = undefined;
      this.expandedElementExecResult = undefined;
      return;
    }
    const key = Object.keys(analysisResult._links).find((k) =>
      k.startsWith('execute-')
    );
    const href = analysisResult._links[key].href;
    this.http.get<ExecutionResultDto>(href).subscribe((dto) => {
      this.expandedElement = analysisResult;
      this.expandedElementExecResult = dto;
    });
  }

  onAddElement(): void {
    this.refreshNisqImpl();
    this.utilService
      .createDialog(ImplementationExecutionDialogComponent, {
        title: 'Start Compilation',
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          const compilerSelectionDto: CompilerSelectionDto = {
            providerName: dialogResult.vendor,
            circuitLanguage: this.nisqImpl.language,
            circuitName: this.nisqImpl.name,
            qpuName: dialogResult.qpu,
            circuitUrl: this.nisqImpl.fileLocation,
            token: dialogResult.token,
          };
          this.rootService
            .selectCompilerForFile1$Json({
              providerName: dialogResult.vendor,
              circuitLanguage: this.nisqImpl.language,
              circuitName: this.nisqImpl.name,
              qpuName: dialogResult.qpu,
              token: dialogResult.token,
              body: compilerSelectionDto,
            })
            .subscribe(
              (compilationJob: CompilationJobDto) => {
                this.latestCompilationJob = compilationJob;
                this.notReadycompilationJobsMap.set(
                  compilationJob.id,
                  this.latestCompilationJob
                );
                this.utilService.callSnackBar(
                  'Successfully created compilation job "' +
                    compilationJob.id +
                    '".'
                );
                this.pollAnalysisJobData();
              },
              () => {
                this.utilService.callSnackBar(
                  'Error! Could not create compilation job.'
                );
              }
            );
        }
      });
  }

  refreshNisqImpl(): void {
    this.nisqImplementationService
      .getImplementations({ algoId: this.algo.id })
      .subscribe((impls) => {
        const foundImpl = impls.implementationDtos.find(
          (i) => i.name === this.impl.name
        );
        this.nisqImpl = foundImpl;
      });
  }

  pollAnalysisJobData(): void {
    this.pollingAnalysisJobData = interval(2000)
      .pipe(
        startWith(0),
        exhaustMap(() =>
          this.compilerResultService.getCompilerAnalysisJob({
            resId: this.latestCompilationJob.id,
          })
        )
      )
      .subscribe((compileJob) => {
        if (compileJob.ready) {
          this.pollingAnalysisJobData.unsubscribe();
          if (this.notReadycompilationJobsMap.has(compileJob.id)) {
            this.notReadycompilationJobsMap.delete(compileJob.id);
          }
          this.ngOnInit();
        }
      });
  }
}
