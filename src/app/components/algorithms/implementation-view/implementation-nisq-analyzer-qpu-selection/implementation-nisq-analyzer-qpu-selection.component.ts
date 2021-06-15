import { Component, Input, OnInit } from '@angular/core';
import { AlgorithmDto } from 'api-atlas/models/algorithm-dto';
import { ImplementationDto } from 'api-atlas/models/implementation-dto';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { FormBuilder } from '@angular/forms';
import { ImplementationService } from 'api-nisq/services/implementation.service';
import { exhaustMap, first, map, startWith, switchMap } from 'rxjs/operators';
import { QpuSelectionResultService } from 'api-nisq/services/qpu-selection-result.service';
import { BehaviorSubject, interval, Observable } from 'rxjs';
import { QpuSelectionJobDto } from 'api-nisq/models/qpu-selection-job-dto';
import { RootService } from 'api-nisq/services/root.service';
import { ImplementationDto as NisqImplementationDto } from 'api-nisq/models/implementation-dto';
import {
  ExecutionResultDto,
  QpuSelectionDto,
  QpuSelectionResultDto,
} from 'api-nisq/models';
import { HttpClient } from '@angular/common/http';
import { UtilService } from '../../../../util/util.service';
import { ChangePageGuard } from '../../../../services/deactivation-guard';
import { ImplementationNisqAnalyzerQpuSelectionDialogComponent } from '../dialogs/implementation-nisq-analyzer-qpu-selection-dialog/implementation-nisq-analyzer-qpu-selection-dialog.component';
import { NisqAnalyzerService } from '../../nisq-analyzer/nisq-analyzer.service';

@Component({
  selector: 'app-implementation-nisq-analyzer-qpu-selection',
  templateUrl: './implementation-nisq-analyzer-qpu-selection.component.html',
  styleUrls: ['./implementation-nisq-analyzer-qpu-selection.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ImplementationNisqAnalyzerQpuSelectionComponent implements OnInit {
  @Input() algo: AlgorithmDto;
  @Input() impl: ImplementationDto;
  @Input() guard: ChangePageGuard;

  analyzeColumns = [
    'backendName',
    'provider',
    'compiler',
    'width',
    'depth',
    'execution',
  ];
  jobColumns = ['time', 'ready'];
  sort$ = new BehaviorSubject<string[] | undefined>(undefined);
  analyzerJobs$: Observable<QpuSelectionJobDto[]>;
  analyzerResults: QpuSelectionResultDto[] = [];
  nisqImpl: NisqImplementationDto;
  analyzerJob: QpuSelectionJobDto;
  jobReady = false;
  pollingAnalysisJobData: any;
  queueLengths = new Map<string, number>();
  executionResultsAvailable = new Map<string, boolean>();
  loadingResults = new Map<string, boolean>();
  expandedElement: QpuSelectionResultDto | null;
  expandedElementExecResult: ExecutionResultDto | null;
  executedAnalyseResult: QpuSelectionResultDto;
  results?: ExecutionResultDto = undefined;

  constructor(
    private utilService: UtilService,
    private formBuilder: FormBuilder,
    private implementationService: ImplementationService,
    private qpuSelectionService: QpuSelectionResultService,
    private nisqAnalyzerRootService: RootService,
    private nisqAnalyzerService: NisqAnalyzerService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.analyzerJobs$ = this.sort$
      .pipe(
        switchMap((sort) =>
          this.qpuSelectionService.getQpuSelectionJobs({
            sort,
          })
        )
      )
      .pipe(
        map((dto) =>
          dto.qpuSelectionJobList.filter(
            (analysisJob) => analysisJob.circuitName === this.impl.name
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

  onAddAnalysis(): void {
    this.refreshNisqImpl();
    let refreshToken = '';
    this.utilService
      .createDialog(ImplementationNisqAnalyzerQpuSelectionDialogComponent, {
        title: 'Start QPU-Selection-Analysis',
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          this.analyzerJob = undefined;
          this.jobReady = false;
          if (localStorage.getItem('refreshToken')) {
            refreshToken = localStorage.getItem('refreshToken');
          }
          const providerTokens = {};
          providerTokens[dialogResult.vendor] = dialogResult.token;

          const qpuSelectionDto: QpuSelectionDto = {
            simulatorsAllowed: dialogResult.simulatorAllowed,
            allowedProviders: [dialogResult.vendor],
            circuitLanguage: this.nisqImpl.language,
            circuitUrl: this.nisqImpl.fileLocation,
            tokens: providerTokens,
            refreshToken,
            circuitName: this.nisqImpl.name,
          };
          this.nisqAnalyzerRootService
            .selectQpuForCircuitFile1$Json({
              simulatorsAllowed: dialogResult.simulatorAllowed,
              circuitLanguage: this.nisqImpl.language,
              circuitName: this.nisqImpl.name,
              allowedProviders: [dialogResult.vendor],
              tokens: providerTokens,
              body: qpuSelectionDto,
            })
            .subscribe((job) => {
              this.analyzerJob = job;
              this.jobReady = job.ready;

              this.utilService.callSnackBar(
                'Successfully created analysis job "' + job.id + '".'
              );
              this.ngOnInit();

              this.pollingAnalysisJobData = interval(2000)
                .pipe(
                  startWith(0),
                  switchMap(() =>
                    this.qpuSelectionService.getQpuSelectionJob({
                      resId: this.analyzerJob.id,
                    })
                  )
                )
                .subscribe(
                  (jobResult) => {
                    this.analyzerJob = jobResult;
                    this.jobReady = jobResult.ready;
                    if (this.jobReady) {
                      this.ngOnInit();
                      this.analyzerResults = jobResult.qpuSelectionResultList;
                      this.pollingAnalysisJobData.unsubscribe();
                    }
                  },
                  () => {
                    this.utilService.callSnackBar(
                      'Error! Could not create analysis job.'
                    );
                  }
                );
            });
        }
      });
  }

  showAnalysisResult(analysisJob: QpuSelectionJobDto): boolean {
    this.qpuSelectionService
      .getQpuSelectionJob({ resId: analysisJob.id })
      .subscribe((jobResult) => {
        this.jobReady = jobResult.ready;
        this.analyzerJob = jobResult;
        this.analyzerResults = jobResult.qpuSelectionResultList;

        for (const analysisResult of this.analyzerResults) {
          this.showBackendQueueSize(analysisResult);
          this.hasExecutionResult(analysisResult);
        }
      });
    return true;
  }

  execute(analysisResult: QpuSelectionResultDto): void {
    this.loadingResults[analysisResult.id] = true;
    this.results = undefined;
    this.executedAnalyseResult = analysisResult;
    this.nisqAnalyzerService.execute(analysisResult.id).subscribe(
      (results) => {
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
            .subscribe((finalResult) => (this.results = finalResult));
        }
        this.utilService.callSnackBar(
          'Successfully started execution "' + results.id + '".'
        );
        this.hasExecutionResult(analysisResult);
      },
      () => {
        this.utilService.callSnackBar('Error! Could not start execution.');
      }
    );
  }

  hasExecutionResult(analysisResult: QpuSelectionResultDto): void {
    this.qpuSelectionService
      .getQpuSelectionResult({ resId: analysisResult.id })
      .subscribe((result) => {
        this.executionResultsAvailable[analysisResult.id] = !!Object.keys(
          result._links
        ).find((key) => key.startsWith('execute-'));
        this.loadingResults[analysisResult.id] = false;
      });
  }

  showExecutionResult(analysisResult: QpuSelectionResultDto): void {
    if (Object.is(this.expandedElement, analysisResult)) {
      this.expandedElement = undefined;
      this.expandedElementExecResult = undefined;
      return;
    }
    this.qpuSelectionService
      .getQpuSelectionResult({ resId: analysisResult.id })
      .subscribe((result) => {
        const key = Object.keys(result._links).find((k) =>
          k.startsWith('execute-')
        );
        const href = result._links[key].href;
        this.http.get<ExecutionResultDto>(href).subscribe((dto) => {
          this.expandedElement = analysisResult;
          this.expandedElementExecResult = dto;
        });
      });
  }

  refreshNisqImpl(): void {
    this.implementationService
      .getImplementations({ algoId: this.algo.id })
      .subscribe((impls) => {
        const foundImpl = impls.implementationDtos.find(
          (i) => i.name === this.impl.name
        );
        this.nisqImpl = foundImpl;
      });
  }

  showBackendQueueSize(analysisResult: QpuSelectionResultDto): void {
    this.nisqAnalyzerService
      .getIBMQBackendState(analysisResult.qpu)
      .subscribe((data) => {
        this.queueLengths[analysisResult.qpu] = data.lengthQueue;
      });
  }
}

export interface TokenArray {
  [provider: string]: string;
}
