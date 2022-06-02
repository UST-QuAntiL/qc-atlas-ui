import { Component, Input, OnInit, ViewChild } from '@angular/core';
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
import {
  ImplementationService,
  QpuSelectionResultService,
  RootService,
} from 'api-nisq/services';
import { CompilerSelectionDto, QpuSelectionJobDto } from 'api-nisq/models';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { ProviderService } from 'generated/api-qprov/services';
import { ChangePageGuard } from '../../../../services/deactivation-guard';
import { UtilService } from '../../../../util/util.service';
import { ImplementationExecutionDialogComponent } from '../dialogs/implementation-execution-dialog/implementation-execution-dialog.component';
import { NisqAnalyzerService } from '../../nisq-analyzer/nisq-analyzer.service';
import { ImplementationTokenDialogComponent } from '../dialogs/implementation-token-dialog/implementation-token-dialog.component';

@Component({
  selector: 'app-implementation-execution',
  templateUrl: './implementation-execution.component.html',
  styleUrls: ['./implementation-execution.component.scss'],
})
export class ImplementationExecutionComponent implements OnInit {
  @Input() algo: AlgorithmDto;
  @Input() impl: ImplementationDto;
  @Input() guard: ChangePageGuard;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<Element>;

  analyzeColumns = [
    'qpu',
    'provider',
    'compiler',
    'analyzedDepth',
    'analyzedWidth',
    'analyzedMultiQubitGateDepth',
    'analyzedTotalNumberOfOperations',
    'analyzedNumberOfSingleQubitGates',
    'analyzedNumberOfMultiQubitGates',
    'analyzedNumberOfMeasurementOperations',
    'avgSingleQubitGateError',
    'avgMultiQubitGateError',
    'avgSingleQubitGateTime',
    'avgMultiQubitGateTime',
    'avgReadoutError',
    't1',
    't2',
    'lengthQueue',
    'time',
    'execution',
  ];

  latestCompilationJob?: CompilationJobDto = undefined;
  executedCompilationResult: CompilerAnalysisResultDto;
  results?: ExecutionResultDto = undefined;
  nisqImpl: NisqImplementationDto;
  compilerResults$: Observable<CompilerAnalysisResultDto[]>;
  compilerResults: CompilerAnalysisResultDto[] = [];
  expandedElement: CompilerAnalysisResultDto | null;
  expandedElementExecResult: ExecutionResultDto | null;
  queueLengths = new Map<string, number>();
  analyzerJobs: QpuSelectionJobDto[];
  pollingAnalysisJobData: Subscription;
  notReadycompilationJobsMap: Map<string, string> = new Map();
  expandedElementMap: Map<
    CompilerAnalysisResultDto,
    ExecutionResultDto
  > = new Map<CompilerAnalysisResultDto, ExecutionResultDto>();
  qpuDataIsUpToDate = new Map<string, true>();
  qpuCounter = 0;
  qpuCheckFinished = false;

  sort$ = new BehaviorSubject<string[] | undefined>(undefined);
  dataSource = new MatTableDataSource(this.compilerResults);

  constructor(
    private readonly http: HttpClient,
    private readonly compilerResultService: CompilerAnalysisResultService,
    private utilService: UtilService,
    private rootService: RootService,
    private nisqImplementationService: ImplementationService,
    private nisqAnalyzerService: NisqAnalyzerService,
    private qpuSelectionService: QpuSelectionResultService,
    private qprovService: ProviderService
  ) {}

  ngOnInit(): void {
    this.sort$
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
      )
      .subscribe((res) => {
        this.compilerResults = res;
        this.dataSource = new MatTableDataSource(this.compilerResults);
        this.getQueueSizes();
        this.checkIfQpuDataIsOutdated(this.compilerResults);
      });
    this.refreshNisqImpl();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
  ngAfterViewChecked(): void {
    if (this.table) {
      this.table.updateStickyColumnStyles();
    }
  }
  onMatSortChange(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property): string | number => {
      switch (property) {
        case 'lengthQueue':
          return this.queueLengths[item.qpu];
        default:
          return item[property];
      }
    };
  }

  execute(analysisResult: CompilerAnalysisResultDto): void {
    let token = ' ';
    this.utilService
      .createDialog(ImplementationTokenDialogComponent, {
        title: 'Enter the token for the Vendor : ' + analysisResult.provider,
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult.token) {
          token = dialogResult.token;
        }
        this.results = undefined;
        this.executedCompilationResult = analysisResult;
        this.nisqAnalyzerService
          .executeCompilationResult(analysisResult.id, token)
          .subscribe(
            (results) => {
              this.utilService.callSnackBar(
                'Successfully created execution job "' + results.id + '".'
              );
              this.ngOnInit();
              if (
                results.status === 'FAILED' ||
                results.status === 'FINISHED'
              ) {
                this.results = results;
              } else {
                interval(1000)
                  .pipe(
                    exhaustMap(() =>
                      this.http.get<ExecutionResultDto>(
                        results._links['self'].href
                      )
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
      });
  }

  hasExecutionResult(analysisResult: CompilerAnalysisResultDto): boolean {
    return !!Object.keys(analysisResult._links).find((key) =>
      key.startsWith('execute-')
    );
  }

  checkIfQpuDataIsOutdated(
    compilerAnalysisResults: CompilerAnalysisResultDto[]
  ): void {
    compilerAnalysisResults.forEach((compilerAnalysisResult) => {
      let provider = null;
      this.qprovService.getProviders().subscribe((providers) => {
        for (const providerDto of providers._embedded.providerDtoes) {
          if (
            providerDto.name.toLowerCase() ===
            compilerAnalysisResult.provider.toLowerCase()
          ) {
            provider = providerDto;
            break;
          }
        }
        // search for QPU with given name from the given provider
        this.qprovService
          .getQpUs({ providerId: provider.id })
          .subscribe((qpuResult) => {
            for (const qpuDto of qpuResult._embedded.qpuDtoes) {
              if (
                qpuDto.name.toLowerCase() ===
                compilerAnalysisResult.qpu.toLowerCase()
              ) {
                if (
                  qpuDto.lastCalibrated === null ||
                  Date.parse(compilerAnalysisResult.time) >=
                    Date.parse(qpuDto.lastCalibrated)
                ) {
                  this.qpuDataIsUpToDate[compilerAnalysisResult.qpu] = true;
                } else {
                  this.qpuDataIsUpToDate[compilerAnalysisResult.qpu] = false;
                }
                break;
              }
            }
            this.qpuCounter++;
            if (this.qpuCounter === compilerAnalysisResults.length) {
              this.qpuCheckFinished = true;
              this.qpuCounter = 0;
            } else {
              this.qpuCheckFinished = false;
            }
          });
      });
    });
  }

  showExecutionResult(analysisResult: CompilerAnalysisResultDto): void {
    if (this.expandedElementMap.has(analysisResult)) {
      this.expandedElementMap.delete(analysisResult);
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
      this.expandedElementMap.set(analysisResult, dto);
    });
  }

  onAddElement(): void {
    let token = ' ';
    this.refreshNisqImpl();
    this.utilService
      .createDialog(ImplementationExecutionDialogComponent, {
        title: 'Start Compilation',
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          if (dialogResult.token) {
            token = dialogResult.token;
          }
          const compilerSelectionDto: CompilerSelectionDto = {
            providerName: dialogResult.vendor,
            circuitLanguage: this.nisqImpl.language,
            circuitName: this.nisqImpl.name,
            qpuName: dialogResult.qpu,
            circuitUrl: this.nisqImpl.fileLocation,
            token,
          };
          this.rootService
            .selectCompilerForFile1$Json({
              providerName: dialogResult.vendor,
              circuitLanguage: this.nisqImpl.language,
              circuitName: this.nisqImpl.name,
              qpuName: dialogResult.qpu,
              token,
              body: compilerSelectionDto,
            })
            .subscribe(
              (compilationJob: CompilationJobDto) => {
                this.latestCompilationJob = compilationJob;
                this.notReadycompilationJobsMap.set(
                  compilationJob.id,
                  dialogResult.qpu
                );
                this.utilService.callSnackBar(
                  'Successfully created compilation job "' +
                    compilationJob.id +
                    '".'
                );
                this.pollAnalysisJobData(compilationJob.id);
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

  getQueueSizes(): void {
    this.compilerResults.forEach((analysisResult) => {
      this.nisqAnalyzerService
        .getIBMQBackendState(analysisResult.qpu)
        .subscribe((data) => {
          this.queueLengths[analysisResult.qpu] = data.lengthQueue;
        });
    });
  }

  pollAnalysisJobData(compilationJobId: string): void {
    const pollingAnalysisJobData = interval(2000)
      .pipe(
        startWith(0),
        exhaustMap(() =>
          this.compilerResultService.getCompilerAnalysisJob({
            resId: compilationJobId,
          })
        )
      )
      .subscribe((compileJob) => {
        if (compileJob.ready) {
          pollingAnalysisJobData.unsubscribe();
          if (this.notReadycompilationJobsMap.has(compileJob.id)) {
            this.notReadycompilationJobsMap.delete(compileJob.id);
          }
          this.ngOnInit();
        }
      });
  }
}
