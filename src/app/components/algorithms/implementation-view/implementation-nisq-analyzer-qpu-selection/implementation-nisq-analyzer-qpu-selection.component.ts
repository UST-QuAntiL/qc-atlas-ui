import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import { MatSort } from '@angular/material/sort';
import { ImplementationService } from 'api-nisq/services/implementation.service';
import { exhaustMap, first, map, startWith, switchMap } from 'rxjs/operators';
import { QpuSelectionResultService } from 'api-nisq/services/qpu-selection-result.service';
import { BehaviorSubject, interval, Observable, Subscription } from 'rxjs';
import { QpuSelectionJobDto } from 'api-nisq/models/qpu-selection-job-dto';
import { RootService } from 'api-nisq/services/root.service';
import { ImplementationDto as NisqImplementationDto } from 'api-nisq/models/implementation-dto';
import {
  CriterionValue,
  EntityModelMcdaJob,
  ExecutionResultDto,
  QpuSelectionDto,
  QpuSelectionResultDto,
} from 'api-nisq/models';
import { HttpClient } from '@angular/common/http';
import { PlanqkPlatformLoginService } from 'src/app/services/planqk-platform-login.service';
import { EntityModelQpuDto } from 'api-qprov/models/entity-model-qpu-dto';
import { ProviderService } from 'api-qprov/services/provider.service';
import { EntityModelProviderDto } from 'api-qprov/models/entity-model-provider-dto';
import { XmcdaCriteriaService } from 'api-nisq/services/xmcda-criteria.service';
import { MatTableDataSource } from '@angular/material/table';
import { UtilService } from '../../../../util/util.service';
import { ChangePageGuard } from '../../../../services/deactivation-guard';
// eslint-disable-next-line max-len
import { ImplementationNisqAnalyzerQpuSelectionDialogComponent } from '../dialogs/implementation-nisq-analyzer-qpu-selection-dialog/implementation-nisq-analyzer-qpu-selection-dialog.component';
import { NisqAnalyzerService } from '../../nisq-analyzer/nisq-analyzer.service';
// eslint-disable-next-line max-len
import {
  DialogData,
  ImplementationNisqAnalyzerQpuSelectionPrioritizationDialogComponent,
} from '../dialogs/implementation-nisq-analyzer-qpu-selection-prioritization-dialog/implementation-nisq-analyzer-qpu-selection-prioritization-dialog.component';

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
export class ImplementationNisqAnalyzerQpuSelectionComponent
  implements OnInit, AfterViewInit {
  @Input() algo: AlgorithmDto;
  @Input() impl: ImplementationDto;
  @Input() guard: ChangePageGuard;
  @ViewChild(MatSort) sort: MatSort;

  analyzeColumns = [
    'rank',
    'score',
    'qpu',
    'provider',
    'compiler',
    'analyzedWidth',
    'analyzedDepth',
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
    'execution',
  ];
  jobColumns = ['time', 'ready'];
  sort$ = new BehaviorSubject<string[] | undefined>(undefined);
  analyzerJobs$: Observable<QpuSelectionJobDto[]>;
  analyzerResults: QpuSelectionResultDto[] = [];
  nisqImpl: NisqImplementationDto;
  analyzerJob: QpuSelectionJobDto;
  jobReady = false;
  pollingAnalysisJobData: Subscription;
  executionResultsAvailable = new Map<string, boolean>();
  loadingResults = new Map<string, boolean>();
  expandedElement: QpuSelectionResultDto | null;
  expandedElementMap: Map<QpuSelectionResultDto, ExecutionResultDto> = new Map<
    QpuSelectionResultDto,
    ExecutionResultDto
  >();
  expandedElementExecResult: ExecutionResultDto | null;
  executedAnalyseResult: QpuSelectionResultDto;
  results?: ExecutionResultDto = undefined;
  provider?: EntityModelProviderDto;
  qpu?: EntityModelQpuDto;
  queueLengths = new Map<string, number>();
  qpuDataIsUpToDate = new Map<string, true>();
  qpuCounter = 0;
  qpuCheckFinished = false;
  prioritizationJob: EntityModelMcdaJob;
  prioritizationJobReady = false;
  loadingMCDAJob = false;
  rankings: Ranking[] = [];
  dataSource = new MatTableDataSource(this.analyzerResults);

  constructor(
    private utilService: UtilService,
    private formBuilder: FormBuilder,
    private implementationService: ImplementationService,
    private qpuSelectionService: QpuSelectionResultService,
    private nisqAnalyzerRootService: RootService,
    private nisqAnalyzerService: NisqAnalyzerService,
    private qprovService: ProviderService,
    private http: HttpClient,
    private planqkService: PlanqkPlatformLoginService,
    private mcdaService: XmcdaCriteriaService
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

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  onMatSortChange(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property): string | number => {
      switch (property) {
        case 'rank':
          const rankObject = this.rankings.find(
            (value) => value.id === item.id
          );
          return rankObject.rank;
        case 'score':
          const scoreObject = this.rankings.find(
            (value) => value.id === item.id
          );
          return scoreObject.score;
        case 'lengthQueue':
          return this.queueLengths[item.qpu];
        default:
          return item[property];
      }
    };
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
          refreshToken = this.planqkService.getRefreshToken();
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
              compilers: dialogResult.selectedCompilers,
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
                      this.dataSource = new MatTableDataSource(
                        this.analyzerResults
                      );
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
        this.dataSource = new MatTableDataSource(this.analyzerResults);

        for (const analysisResult of this.analyzerResults) {
          this.showBackendQueueSize(analysisResult);
          setInterval(() => this.showBackendQueueSize(analysisResult), 300000);
          this.hasExecutionResult(analysisResult);
          this.checkIfQpuDataIsOutdated(analysisResult);
        }
      });
    return true;
  }

  execute(analysisResult: QpuSelectionResultDto): void {
    this.loadingResults[analysisResult.id] = true;
    this.results = undefined;
    this.executedAnalyseResult = analysisResult;
    this.qpuSelectionService
      .executeQpuSelectionResult({ resId: analysisResult.id })
      .subscribe(
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
    if (this.expandedElementMap.has(analysisResult)) {
      this.expandedElementMap.delete(analysisResult);
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
          this.expandedElementMap.set(analysisResult, dto);
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

  prioritize(): void {
    this.rankings = [];
    this.utilService
      .createDialog(
        ImplementationNisqAnalyzerQpuSelectionPrioritizationDialogComponent,
        {
          title: 'Prioritize Analysis Results',
        }
      )
      .afterClosed()
      .subscribe((dialogResult) => {
        let totalSum = 0;
        if (dialogResult) {
          this.loadingMCDAJob = true;
          this.prioritizationJob = undefined;
          this.prioritizationJobReady = false;
          let criteria = dialogResult.criteriaAndValues;
          if (dialogResult.stableExecutionResults) {
            criteria = dialogResult.criteriaAndWeightValues;
          } else {
            // calculate SMART with new assigned points
            dialogResult.criteriaAndValues.forEach((obj) => {
              totalSum += obj.points;
            });
            dialogResult.criteriaAndValues.forEach((obj) => {
              if (obj.points !== 0) {
                obj.weight = obj.points / totalSum;
              } else {
                obj.weight = 0;
              }
            });
          }

          let numberOfCriterion = 0;
          criteria.forEach((obj) => {
            const criterionValue: CriterionValue = {
              description: { title: 'points', subTitle: obj.points.toString() },
              criterionID: obj.id,
              valueOrValues: [{ real: obj.weight }],
              mcdaMethod: dialogResult.mcdaMethod,
            };
            this.mcdaService
              .updateCriterionValue({
                methodName: dialogResult.mcdaMethod,
                criterionId: obj.id,
                body: criterionValue,
              })
              .subscribe(
                () => {
                  numberOfCriterion++;
                  if (numberOfCriterion === criteria.length) {
                    this.mcdaService
                      .prioritizeCompiledCircuitsOfJob({
                        methodName: dialogResult.mcdaMethod,
                        jobId: this.analyzerJob.id,
                        useBordaCount: false,
                      })
                      .subscribe((job) => {
                        this.prioritizationJob = job;
                        this.prioritizationJobReady = job.ready;

                        this.utilService.callSnackBar(
                          'Successfully created prioritization job "' +
                            job.id +
                            '".'
                        );
                        this.pollAnalysisJobData(dialogResult);
                      });
                  }
                },
                () => {
                  this.loadingMCDAJob = false;
                  this.utilService.callSnackBar(
                    'Error! Could not set weight for criteria "' +
                      obj.name +
                      '". Please try again.'
                  );
                }
              );
          });
        }
      });
  }

  pollAnalysisJobData(dialogResult: DialogData): void {
    this.pollingAnalysisJobData = interval(2000)
      .pipe(
        startWith(0),
        switchMap(() =>
          this.mcdaService.getPrioritizationJob({
            methodName: dialogResult.mcdaMethod,
            jobId: this.prioritizationJob.id,
          })
        )
      )
      .subscribe(
        (jobResult) => {
          this.prioritizationJob = jobResult;
          this.prioritizationJobReady = jobResult.ready;
          if (this.prioritizationJobReady) {
            this.loadingMCDAJob = false;
            jobResult.rankedResults.forEach((rankedResult) => {
              this.rankings.push({
                id: rankedResult.resultId,
                rank: rankedResult.position,
                score: rankedResult.score,
              });
            });
            this.analyzerResults.sort((a, b) => {
              const objA = this.rankings.find((value) => value.id === a.id);
              const objB = this.rankings.find((value) => value.id === b.id);
              if (objA.rank < objB.rank) {
                return -1;
              } else {
                return 1;
              }
            });
            this.dataSource = new MatTableDataSource(this.analyzerResults);
            this.pollingAnalysisJobData.unsubscribe();
          }
        },
        () => {
          this.loadingMCDAJob = false;
          this.utilService.callSnackBar(
            'Error! Could not create prioritization job.'
          );
        }
      );
  }

  getRankOfResult(result: QpuSelectionResultDto): number | string {
    const rankingResult = this.rankings.find((value) => value.id === result.id);
    if (rankingResult) {
      return rankingResult.rank;
    } else {
      return '-';
    }
  }

  getScoreOfResult(result: QpuSelectionResultDto): number | string {
    const rankingResult = this.rankings.find((value) => value.id === result.id);
    if (rankingResult && this.prioritizationJob.method !== 'electre-III') {
      return rankingResult.score;
    } else {
      return '-';
    }
  }

  showBackendQueueSize(analysisResult: QpuSelectionResultDto): void {
    this.nisqAnalyzerService
      .getIBMQBackendState(analysisResult.qpu)
      .subscribe((data) => {
        this.queueLengths[analysisResult.qpu] = data.lengthQueue;
      });
  }

  checkIfQpuDataIsOutdated(analysisResult: QpuSelectionResultDto): void {
    this.qprovService.getProviders().subscribe((providers) => {
      for (const providerDto of providers._embedded.providerDtoes) {
        if (
          providerDto.name.toLowerCase() ===
          analysisResult.provider.toLowerCase()
        ) {
          this.provider = providerDto;
          break;
        }
      }
      // search for QPU with given name from the given provider
      this.qprovService
        .getQpUs({ providerId: this.provider.id })
        .subscribe((qpuResult) => {
          for (const qpuDto of qpuResult._embedded.qpuDtoes) {
            if (
              qpuDto.name.toLowerCase() === analysisResult.qpu.toLowerCase()
            ) {
              if (
                qpuDto.lastCalibrated === null ||
                Date.parse(analysisResult.time) >=
                  Date.parse(qpuDto.lastCalibrated)
              ) {
                this.qpuDataIsUpToDate[analysisResult.qpu] = true;
              } else {
                this.qpuDataIsUpToDate[analysisResult.qpu] = false;
              }
              break;
            }
          }
          this.qpuCounter++;
          if (
            this.qpuCounter === this.analyzerJob.qpuSelectionResultList.length
          ) {
            this.qpuCheckFinished = true;
            this.qpuCounter = 0;
          } else {
            this.qpuCheckFinished = false;
          }
        });
    });
  }
}

interface Ranking {
  id: string;
  rank: number;
  score: number;
}
