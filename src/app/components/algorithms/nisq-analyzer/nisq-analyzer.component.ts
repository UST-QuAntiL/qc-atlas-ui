import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { BehaviorSubject, interval, Observable, Subscription } from 'rxjs';
import { exhaustMap, first, map, startWith, switchMap } from 'rxjs/operators';

import { ExecutionEnvironmentsService } from 'api-atlas/services';
import { AlgorithmDto, CloudServiceDto } from 'api-atlas/models';
import {
  ParameterDto,
  AnalysisResultDto,
  ExecutionResultDto,
  ImplementationDto as NISQImplementationDto,
  AnalysisJobDto,
  ExecuteAnalysisResultRequestDto,
  QpuSelectionResultDto,
  EntityModelMcdaSensitivityAnalysisJob,
  EntityModelMcdaWeightLearningJob,
  CriterionValue,
  EntityModelMcdaJob,
  QpuSelectionJobDto,
} from 'api-nisq/models';
import { AnalysisResultService } from 'api-nisq/services/analysis-result.service';
import { ImplementationService } from 'api-nisq/services/implementation.service';
import { SdksService } from 'api-nisq/services/sdks.service';
import { MatTableDataSource } from '@angular/material/table';
import { ProviderService } from 'generated/api-qprov/services';
import { MatSort } from '@angular/material/sort';
import { QpuSelectionResultService } from 'api-nisq/services/qpu-selection-result.service';
import { XmcdaCriteriaService } from 'api-nisq/services/xmcda-criteria.service';
import { UtilService } from '../../../util/util.service';
import { AddNewAnalysisDialogComponent } from '../dialogs/add-new-analysis-dialog.component';
import { ImplementationTokenDialogComponent } from '../implementation-view/dialogs/implementation-token-dialog/implementation-token-dialog.component';
import { PlanqkPlatformLoginService } from '../../../services/planqk-platform-login.service';
// eslint-disable-next-line max-len
import {
  Criterion,
  DialogData,
  ImplementationNisqAnalyzerQpuSelectionPrioritizationDialogComponent,
} from '../implementation-view/dialogs/implementation-nisq-analyzer-qpu-selection-prioritization-dialog/implementation-nisq-analyzer-qpu-selection-prioritization-dialog.component';
// eslint-disable-next-line max-len
import { ImplementationNisqAnalyzerQpuSelectionLearnedWeightsDialogComponent } from '../implementation-view/dialogs/implementation-nisq-analyzer-qpu-selection-learned-weights-dialog/implementation-nisq-analyzer-qpu-selection-learned-weights-dialog.component';
import { ChangePageGuard } from '../../../services/deactivation-guard';
// eslint-disable-next-line max-len
import { ImplementationNisqAnalyzerQpuSelectionSensitivityAnalysisDialogComponent } from '../implementation-view/dialogs/implementation-nisq-analyzer-qpu-selection-sensitivity-analysis-dialog/implementation-nisq-analyzer-qpu-selection-sensitivity-analysis-dialog.component';
import { NisqAnalyzerService } from './nisq-analyzer.service';

@Component({
  selector: 'app-algorithm-nisq-analyzer',
  templateUrl: './nisq-analyzer.component.html',
  styleUrls: ['./nisq-analyzer.component.scss'],
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
export class NisqAnalyzerComponent implements OnInit {
  @Input() algo: AlgorithmDto;
  @Input() guard: ChangePageGuard;
  @ViewChild(MatSort) sort: MatSort;

  // 1) Selection
  params: ParameterDto[];
  cloudServices: CloudServiceDto[];
  implListEmpty = true;
  sdksEmpty = true;

  // 2) Analyze phase
  analyzeColumns = [
    'implementationName',
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
    'estimatedHistogramIntersectionValue',
    'execution',
  ];
  analyzerResults: AnalysisResultDto[] = [];
  allQpuSelectionResults: QpuSelectionResultDto[] = [];
  jobColumns = ['inputParameters', 'time', 'ready'];
  analyzerJobs$: Observable<AnalysisJobDto[]>;
  sort$ = new BehaviorSubject<string[] | undefined>(undefined);
  analyzerJob: AnalysisJobDto;
  jobReady = false;
  expandedElement: QpuSelectionResultDto | null;
  pollingAnalysisJobData: Subscription;
  queueLengths = new Map<string, number>();
  executionResultsAvailable = new Map<string, boolean>();
  loadingResults = new Map<string, boolean>();
  qpuDataIsUpToDate = new Map<QpuSelectionResultDto, boolean>();
  qpuCounter = 0;
  qpuCheckFinished = false;
  loadingLearnWeights = false;
  learnedWeightsReady = false;
  loadingMCDAJob = false;
  usedMcdaMethod: string;
  usedLearningMethod: string;
  dataSource = new MatTableDataSource(this.allQpuSelectionResults);
  rankings: Ranking[] = [];
  usedShortWaitingTime: boolean;
  usedStableExecutionResults: boolean;
  queueImportanceRatio: number;
  sensitivityAnalysisJob: EntityModelMcdaSensitivityAnalysisJob;
  sensitivityAnalysisJobReady = false;
  pollingSensitivityAnalysisJobReadyData: Subscription;
  sensitivityAnalysisJobSuccessful = false;
  waitUntilSensitivityAnalysisIsFinished = false;
  sensitivityAnalysisPlot: string;
  bordaCountEnabled: boolean;
  pollingWeightLearningJobData: Subscription;
  weightLearningJob: EntityModelMcdaWeightLearningJob;
  learningJobReady: boolean;
  prioritizationJobReady = false;
  prioritizationJob: EntityModelMcdaJob;
  mcdaJobSuccessful = false;

  // 3) Execution
  resultBackendColumns = ['backendName', 'width', 'depth'];
  executedQpuSelectionResult: QpuSelectionResultDto;
  expandedElementExecResult: ExecutionResultDto | null;
  results?: ExecutionResultDto = undefined;
  expandedElementMap: Map<QpuSelectionResultDto, ExecutionResultDto> = new Map<
    QpuSelectionResultDto,
    ExecutionResultDto
  >();
  executeAnalysisResultRequestDto: ExecuteAnalysisResultRequestDto = {
    refreshToken: '',
    tokens: new Map<string, Map<string, string>>(),
  };

  constructor(
    private analysisResultService: AnalysisResultService,
    private nisqAnalyzerService: NisqAnalyzerService,
    private utilService: UtilService,
    private http: HttpClient,
    private implementationService: ImplementationService,
    private sdkService: SdksService,
    private qprovService: ProviderService,
    private planqkService: PlanqkPlatformLoginService,
    private qpuSelectionService: QpuSelectionResultService,
    private mcdaService: XmcdaCriteriaService
  ) {}

  ngOnInit(): void {
    this.sdkService.getSdks().subscribe((sdks) => {
      if (sdks.sdkDtos.length > 0) {
        this.sdksEmpty = false;
      }
    });
    this.implementationService
      .getImplementations({ algoId: this.algo.id })
      .subscribe((implementations) => {
        if (implementations.implementationDtos.length > 0) {
          this.implListEmpty = false;
        }
      });
    this.analyzerJobs$ = this.sort$
      .pipe(
        switchMap((sort) =>
          this.analysisResultService.getAnalysisJobsOfAlgorithm({
            algoId: this.algo.id,
            sort,
          })
        )
      )
      .pipe(map((dto) => dto.analysisJobList));
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  changeSort(active: string, direction: 'asc' | 'desc' | ''): void {
    if (!active || !direction) {
      this.sort$.next(undefined);
    } else {
      this.sort$.next([`${active},${direction}`]);
    }
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

  formatParameters(analysisJob: AnalysisJobDto): string {
    const result: string[] = [];
    for (const key of Object.keys(analysisJob.inputParameters)) {
      if (key === 'token') {
        continue;
      }
      result.push(`${key} = ${analysisJob.inputParameters[key]}`);
    }
    return result.join(' ');
  }

  filterInputParams(inputParameters: Map<string, string>): Map<string, string> {
    // Remove token from input parameters, as it is handled separately.
    /* copy inputParameters into new Map to create an instance
              to enable operations on the map, i.e., inputParameters*/
    const inputParametersCopy = new Map<string, string>();
    for (const key of Object.keys(inputParameters)) {
      if (key !== 'token') {
        inputParametersCopy.set(key, inputParameters[key]);
      }
    }
    return inputParametersCopy;
  }

  onAddAnalysis(): void {
    let refreshToken = '';
    this.utilService
      .createDialog(AddNewAnalysisDialogComponent, {
        title: 'Start Analysis',
        algo: this.algo.id,
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          this.analyzerJob = undefined;
          this.jobReady = false;
          refreshToken = this.planqkService.getRefreshToken();
          const tokensToDeliver = this.setVendorTokens(
            dialogResult.vendors,
            dialogResult.ibmqToken,
            dialogResult.ionqToken,
            dialogResult.awsToken,
            dialogResult.awsSecretToken
          );
          const analyzeParams = Object.assign.apply(undefined, [
            ...dialogResult.params,
          ]);
          this.nisqAnalyzerService
            .analyze({
              algorithmId: this.algo.id,
              parameters: analyzeParams,
              tokens: tokensToDeliver,
              refreshToken,
              allowedProviders: dialogResult.vendors,
              compilers: dialogResult.selectedCompilers,
              preciseResultsPreference: dialogResult.stableExecutionResults,
              shortWaitingTimesPreference: dialogResult.shortWaitingTime,
              queueImportanceRatio: dialogResult.queueImportanceRatio,
              maxNumberOfCompiledCircuits:
                dialogResult.maxNumberOfCompiledCircuits,
              predictionAlgorithm: dialogResult.predictionAlgorithm,
              metaOptimizer: dialogResult.metaOptimizer,
              mcdaMethodName: dialogResult.mcdaMethod,
              mcdaWeightLearningMethod: dialogResult.weightLearningMethod,
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
                    this.nisqAnalyzerService.getJob(this.analyzerJob.id)
                  )
                )
                .subscribe(
                  (jobResult) => {
                    this.analyzerJob = jobResult;
                    this.jobReady = jobResult.ready;
                    if (this.jobReady) {
                      this.ngOnInit();
                      this.analyzerResults = jobResult.analysisResultList;
                      this.analyzerResults.forEach((analysisResult) => {
                        this.qpuSelectionService
                          .getQpuSelectionJob({
                            resId: analysisResult.qpuSelectionJobId,
                          })
                          .subscribe((qpuSelectionJob) => {
                            this.allQpuSelectionResults = this.allQpuSelectionResults.concat(
                              qpuSelectionJob.qpuSelectionResultList
                            );
                            this.dataSource = new MatTableDataSource(
                              this.allQpuSelectionResults
                            );
                            this.pollAnalysisJobData(
                              jobResult.initialMcdaMethod,
                              jobResult.initialMcdaJob
                            );
                          });
                      });
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

  showAnalysisResult(analysisJob: AnalysisJobDto): boolean {
    this.nisqAnalyzerService.getJob(analysisJob.id).subscribe((jobResult) => {
      this.jobReady = jobResult.ready;
      this.analyzerJob = jobResult;
      this.analyzerResults = jobResult.analysisResultList;
      this.allQpuSelectionResults = [];
      this.analyzerResults.forEach((analysisResult) => {
        this.qpuSelectionService
          .getQpuSelectionJob({ resId: analysisResult.qpuSelectionJobId })
          .subscribe((qpuSelectionJob) => {
            this.allQpuSelectionResults = this.allQpuSelectionResults.concat(
              qpuSelectionJob.qpuSelectionResultList
            );
            this.dataSource = new MatTableDataSource(
              this.allQpuSelectionResults
            );
            for (const analysisQpuSelectionResult of qpuSelectionJob.qpuSelectionResultList) {
              this.queueLengths[analysisQpuSelectionResult.qpu] =
                analysisQpuSelectionResult.queueSize;
              this.hasExecutionResult(analysisQpuSelectionResult);
              this.checkIfQpuDataIsOutdated(
                analysisQpuSelectionResult,
                qpuSelectionJob
              );
            }
          });
      });
    });
    return true;
  }

  checkIfQpuDataIsOutdated(
    analysisResult: QpuSelectionResultDto,
    qpuSelectionJob: QpuSelectionJobDto
  ): void {
    let provider = null;
    this.qprovService.getProviders().subscribe((providers) => {
      for (const providerDto of providers._embedded.providerDtoes) {
        if (
          providerDto.name.toLowerCase() ===
          analysisResult.provider.toLowerCase()
        ) {
          provider = providerDto;
          break;
        }
      }
      // search for QPU with given name from the given provider
      this.qprovService
        .getQpUs({ providerId: provider.id })
        .subscribe((qpuResult) => {
          if (analysisResult.qpu.toLowerCase() === 'aer_simulator') {
            this.qpuDataIsUpToDate.set(analysisResult, true);
          } else {
            for (const qpuDto of qpuResult._embedded.qpuDtoes) {
              if (
                qpuDto.name.toLowerCase() === analysisResult.qpu.toLowerCase()
              ) {
                if (
                  qpuDto.lastCalibrated === null ||
                  Date.parse(analysisResult.time) >=
                    Date.parse(qpuDto.lastCalibrated)
                ) {
                  this.qpuDataIsUpToDate.set(analysisResult, true);
                } else {
                  this.qpuDataIsUpToDate.set(analysisResult, false);
                }
                break;
              }
            }
          }
        });
    });
  }

  goToLink(url: string): void {
    window.open(url, '_blank');
  }

  analyzeSensitivity(): void {
    this.utilService
      .createDialog(
        ImplementationNisqAnalyzerQpuSelectionSensitivityAnalysisDialogComponent,
        {
          title: 'Analyze Sensitivity of Ranking',
        }
      )
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          this.mcdaService
            .analyzeSensitivityOfCompiledCircuitsOfJob({
              methodName: this.usedMcdaMethod,
              jobId: this.analyzerJob.id,
              stepSize: dialogResult.stepSize,
              upperBound: dialogResult.upperBound,
              lowerBound: dialogResult.lowerBound,
              useBordaCount: this.bordaCountEnabled,
              queueImportanceRatio: this.queueImportanceRatio,
            })
            .subscribe(
              (job) => {
                this.waitUntilSensitivityAnalysisIsFinished = true;
                this.sensitivityAnalysisJobSuccessful = false;
                this.sensitivityAnalysisJob = job;
                this.sensitivityAnalysisJobReady = job.ready;
                this.utilService.callSnackBar(
                  'Successfully created sensitivity analysis job "' +
                    job.id +
                    '".'
                );

                this.pollingSensitivityAnalysisJobReadyData = interval(2000)
                  .pipe(
                    startWith(0),
                    switchMap(() =>
                      this.mcdaService.getSensitivityAnalysisJob({
                        methodName: this.usedMcdaMethod,
                        jobId: job.id,
                      })
                    )
                  )
                  .subscribe((jobResult) => {
                    this.sensitivityAnalysisJob = jobResult;
                    this.sensitivityAnalysisJobReady = jobResult.ready;
                    if (jobResult.state === 'FINISHED') {
                      this.sensitivityAnalysisJobSuccessful = true;
                      this.waitUntilSensitivityAnalysisIsFinished = false;
                      this.sensitivityAnalysisPlot = jobResult.plotFileLocation;
                      this.pollingSensitivityAnalysisJobReadyData.unsubscribe();
                    }
                  });
              },
              () => {
                this.utilService.callSnackBar(
                  'Error! Could not start sensitivity analysis.'
                );
              }
            );
        }
      });
  }

  execute(analysisResult: QpuSelectionResultDto): void {
    let token = ' ';
    this.utilService
      .createDialog(ImplementationTokenDialogComponent, {
        title: 'Enter the token for the Vendor : ' + analysisResult.provider,
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        this.loadingResults[analysisResult.id] = true;
        this.results = undefined;
        this.executedQpuSelectionResult = analysisResult;
        if (dialogResult.token) {
          token = dialogResult.token;
        }
        const rawTokens: Map<string, string> = new Map();
        rawTokens.set(analysisResult.provider, token);
        const tokens: Map<string, Map<string, string>> = new Map();
        tokens.set(analysisResult.provider, rawTokens);
        this.executeAnalysisResultRequestDto.tokens = tokens;
        this.nisqAnalyzerService
          .execute(analysisResult.id, this.executeAnalysisResultRequestDto)
          .subscribe(
            (results) => {
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
                  .subscribe((finalResult) => (this.results = finalResult));
              }
              this.utilService.callSnackBar(
                'Successfully started execution "' + results.id + '".'
              );
              this.hasExecutionResult(analysisResult);
            },
            () => {
              this.utilService.callSnackBar(
                'Error! Could not start execution.'
              );
            }
          );
      });
  }

  hasExecutionResult(analysisResult: QpuSelectionResultDto): void {
    this.analysisResultService
      .getAnalysisResult({ resId: analysisResult.id })
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
    this.analysisResultService
      .getAnalysisResult({ resId: analysisResult.id })
      .subscribe((result) => {
        const key = Object.keys(result._links).find((k) =>
          k.startsWith('execute-')
        );
        const href = result._links[key].href;
        this.http.get<ExecutionResultDto>(href).subscribe((dto) => {
          this.expandedElement = analysisResult;
          this.expandedElementExecResult = dto;
          this.expandedElementMap.set(analysisResult, dto);
        });
      });
  }

  beautifyResult(result: string): string {
    // TODO: once we have JSON, prettify
    return result;
  }

  showBackendQueueSize(analysisResult: QpuSelectionResultDto): void {
    if (analysisResult.qpu !== 'aer_simluator') {
      this.nisqAnalyzerService
        .getIBMQBackendState(analysisResult.qpu)
        .subscribe((data) => {
          this.queueLengths[analysisResult.qpu] = data.lengthQueue;
        });
    } else {
      this.queueLengths[analysisResult.qpu] = analysisResult.queueSize;
    }
  }

  setVendorTokens(
    vendors: string[],
    ibmqToken: string,
    ionqToken: string,
    awsToken: string,
    awsSecretToken: string
  ): {} {
    const providerTokens = new Map<string, Map<string, string>>();
    const rawTokensIbmq = new Map<string, string>();
    const rawTokensIonq = new Map<string, string>();
    const rawTokensAws = new Map<string, string>();

    if (vendors.includes('ibmq')) {
      rawTokensIbmq.set('ibmq', ibmqToken);
      providerTokens.set('ibmq', rawTokensIbmq);
    }
    if (vendors.includes('ionq')) {
      rawTokensIonq.set('ionq', ionqToken);
      providerTokens.set('ionq', rawTokensIonq);
    }
    if (vendors.includes('aws')) {
      rawTokensAws.set('awsAccessKey', awsToken);
      rawTokensAws.set('awsSecretKey', awsSecretToken);
      providerTokens.set('aws', rawTokensAws);
    }

    // converting such that it can be delivered via HTTP
    const convMap: { [props: string]: { [props: string]: string } } = {};
    providerTokens.forEach((val: Map<string, string>, key: string) => {
      const innerConvMap: { [props: string]: string } = {};
      val.forEach((subVal: string, subkey: string) => {
        innerConvMap[subkey] = subVal;
      });
      convMap[key] = innerConvMap;
    });
    return convMap;
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
    if (
      rankingResult &&
      this.prioritizationJob.method !== 'electre-III' &&
      !this.bordaCountEnabled
    ) {
      return rankingResult.score;
    } else {
      return '-';
    }
  }

  prioritize(): void {
    this.utilService
      .createDialog(
        ImplementationNisqAnalyzerQpuSelectionPrioritizationDialogComponent,
        {
          title: 'Prioritize Analysis Results',
        }
      )
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          this.learnedWeightsReady = false;
          this.usedMcdaMethod = dialogResult.mcdaMethod;
          this.usedLearningMethod = dialogResult.weightLearningMethod;
          this.usedShortWaitingTime = dialogResult.shortWaitingTime;
          this.usedStableExecutionResults = dialogResult.stableExecutionResults;
          this.queueImportanceRatio = dialogResult.queueImportanceRatio;
          if (dialogResult.stableExecutionResults) {
            this.loadingLearnWeights = true;
            this.mcdaService
              .learnWeightsForCompiledCircuitsOfJob({
                methodName: this.usedMcdaMethod,
                weightLearningMethod: this.usedLearningMethod,
              })
              .subscribe((job) => {
                this.weightLearningJob = job;
                this.learningJobReady = job.ready;
                this.utilService.callSnackBar(
                  'Successfully started to learn weights.'
                );
                this.pollingWeightLearningJobData = interval(2000)
                  .pipe(
                    startWith(0),
                    switchMap(() =>
                      this.mcdaService.getWeightLearningJob({
                        methodName: this.usedMcdaMethod,
                        weightLearningMethod: this.usedLearningMethod,
                        jobId: this.weightLearningJob.id,
                      })
                    )
                  )
                  .subscribe((jobResult) => {
                    this.weightLearningJob = jobResult;
                    this.learningJobReady = jobResult.ready;
                    if (jobResult.state === 'FINISHED') {
                      this.pollingWeightLearningJobData.unsubscribe();
                      this.loadingLearnWeights = false;
                      this.learnedWeightsReady = true;
                      this.utilService.callSnackBar(
                        'Learned weights are ready.'
                      );
                    } else if (jobResult.state === 'FAILED') {
                      this.pollingWeightLearningJobData.unsubscribe();
                      this.loadingLearnWeights = false;
                      this.learnedWeightsReady = false;
                      this.utilService.callSnackBar(
                        'Error! Could not learn weights.'
                      );
                    }
                  });
              });
          } else {
            this.executePrioritization(dialogResult);
          }
        }
      });
  }

  seeLearnedWeights(): void {
    this.utilService
      .createDialog(
        ImplementationNisqAnalyzerQpuSelectionLearnedWeightsDialogComponent,
        {
          title: 'Learned Weights',
          mcdaMethod: this.usedMcdaMethod,
        }
      )
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          this.learnedWeightsReady = false;
          this.executePrioritization(dialogResult);
        }
      });
  }

  executePrioritization(dialogResult): void {
    this.loadingMCDAJob = true;
    this.prioritizationJobReady = false;
    let totalSum = 0;
    let criteria = dialogResult.criteriaAndValues;
    this.bordaCountEnabled = !!(
      this.usedStableExecutionResults && this.usedShortWaitingTime
    );
    if (this.usedStableExecutionResults) {
      criteria = dialogResult.criteriaAndValues;
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
                  useBordaCount: this.bordaCountEnabled,
                  queueImportanceRatio: this.queueImportanceRatio,
                })
                .subscribe((job) => {
                  this.rankings = [];
                  this.prioritizationJob = job;
                  this.prioritizationJobReady = job.ready;
                  this.mcdaJobSuccessful = false;

                  this.utilService.callSnackBar(
                    'Successfully created prioritization job "' + job.id + '".'
                  );
                  this.pollAnalysisJobData(
                    dialogResult.mcdaMethod,
                    this.prioritizationJob.id
                  );
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

  pollAnalysisJobData(mcdaMethod: string, prioritizationJobId: string): void {
    this.pollingAnalysisJobData = interval(2000)
      .pipe(
        startWith(0),
        switchMap(() =>
          this.mcdaService.getPrioritizationJob({
            methodName: mcdaMethod,
            jobId: prioritizationJobId,
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
            this.allQpuSelectionResults.sort((a, b) => {
              const objA = this.rankings.find((value) => value.id === a.id);
              const objB = this.rankings.find((value) => value.id === b.id);
              if (objA.rank < objB.rank) {
                return -1;
              } else {
                return 1;
              }
            });
            this.dataSource = new MatTableDataSource(
              this.allQpuSelectionResults
            );
            this.mcdaJobSuccessful = true;
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
}

interface QiskitBackendState {
  state: boolean;
  status: string;
  message: string;
  lengthQueue: number;
  backend_version: string;
}

interface Ranking {
  id: string;
  rank: number;
  score: number;
}
