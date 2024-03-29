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
} from 'api-nisq/models';
import { AnalysisResultService } from 'api-nisq/services/analysis-result.service';
import { ImplementationService } from 'api-nisq/services/implementation.service';
import { SdksService } from 'api-nisq/services/sdks.service';
import { MatTableDataSource } from '@angular/material/table';
import { ProviderService } from 'generated/api-qprov/services';
import { MatSort } from '@angular/material/sort';
import { UtilService } from '../../../util/util.service';
import { AddNewAnalysisDialogComponent } from '../dialogs/add-new-analysis-dialog.component';
import { ImplementationTokenDialogComponent } from '../implementation-view/dialogs/implementation-token-dialog/implementation-token-dialog.component';
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
  @ViewChild('nisqAnalysisResultSort') public nisqAnalysisResultSort: MatSort;

  // 1) Selection
  params: ParameterDto[];
  cloudServices: CloudServiceDto[];
  implListEmpty = true;
  sdksEmpty = true;

  // 2) Analyze phase
  analyzeColumns = [
    'qpu',
    'provider',
    'compiler',
    'width',
    'depth',
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
  analyzerResults: AnalysisResultDto[] = [];
  jobColumns = ['inputParameters', 'time', 'ready'];
  analyzerJobs$: Observable<AnalysisJobDto[]>;
  sort$ = new BehaviorSubject<string[] | undefined>(undefined);
  analyzerJob: AnalysisJobDto;
  jobReady = false;
  expandedElement: AnalysisResultDto | null;
  pollingAnalysisJobData: Subscription;
  queueLengths = new Map<string, number>();
  executionResultsAvailable = new Map<string, boolean>();
  loadingResults = new Map<string, boolean>();
  groupedResultsMap = new Map<
    NISQImplementationDto,
    MatTableDataSource<AnalysisResultDto>
  >();
  qpuDataIsUpToDate = new Map<AnalysisResultDto, boolean>();
  qpuCounter = 0;
  qpuCheckFinished = false;

  // 3) Execution
  resultBackendColumns = ['backendName', 'width', 'depth'];
  executedAnalyseResult: AnalysisResultDto;
  expandedElementExecResult: ExecutionResultDto | null;
  results?: ExecutionResultDto = undefined;
  expandedElementMap: Map<AnalysisResultDto, ExecutionResultDto> = new Map<
    AnalysisResultDto,
    ExecutionResultDto
  >();
  executeAnalysisResultRequestDto: ExecuteAnalysisResultRequestDto = {
    refreshToken: '',
    token: '',
  };

  constructor(
    private executionEnvironmentsService: ExecutionEnvironmentsService,
    private analysisResultService: AnalysisResultService,
    private nisqAnalyzerService: NisqAnalyzerService,
    private utilService: UtilService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private implementationService: ImplementationService,
    private sdkService: SdksService,
    private qprovService: ProviderService
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
    for (const entry of this.groupedResultsMap.entries()) {
      const value = entry[1];
      value.sort = this.nisqAnalysisResultSort;
      this.groupedResultsMap.set(entry[0], value);
    }
  }

  changeSort(active: string, direction: 'asc' | 'desc' | ''): void {
    if (!active || !direction) {
      this.sort$.next(undefined);
    } else {
      this.sort$.next([`${active},${direction}`]);
    }
  }

  onMatSortChange(active: string, direction: 'asc' | 'desc' | ''): void {
    for (const entry of this.groupedResultsMap.entries()) {
      const value = entry[1];
      this.nisqAnalysisResultSort.active = active;
      this.nisqAnalysisResultSort.direction = direction;
      value.sort = this.nisqAnalysisResultSort;
      value.sortingDataAccessor = (item, property): string | number => {
        switch (property) {
          case 'lengthQueue':
            return this.queueLengths[item.qpu];
          default: {
            if (property === 'width') {
              property = 'analyzedWidth';
            }
            if (property === 'depth') {
              property = 'analyzedDepth';
            }
            return item[property];
          }
        }
      };
      this.groupedResultsMap.set(entry[0], value);
    }
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
    let token = ' ';
    this.utilService
      .createDialog(AddNewAnalysisDialogComponent, {
        title: 'Start Analysis',
        algo: this.algo.id,
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          if (dialogResult.token) {
            token = dialogResult.token;
          }
          // Merge a list of parameter objects into a single parameter object.
          const analyzeParams = Object.assign.apply(undefined, [
            {
              token,
            },
            ...dialogResult.params,
          ]);
          this.analyzerJob = undefined;
          this.jobReady = false;
          this.nisqAnalyzerService
            .analyze({
              algorithmId: this.algo.id,
              parameters: analyzeParams,
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
      this.groupResultsByImplementation(this.analyzerResults);
      for (const analysisResult of this.analyzerResults) {
        this.showBackendQueueSize(analysisResult);
        this.hasExecutionResult(analysisResult);
        this.checkIfQpuDataIsOutdated(analysisResult);
      }
    });
    return true;
  }

  groupResultsByImplementation(analysisResults: AnalysisResultDto[]): void {
    const results: GroupedResults[] = [];
    const resultMap = new Map<
      NISQImplementationDto,
      MatTableDataSource<AnalysisResultDto>
    >();
    for (const analysisResult of analysisResults) {
      const group = results.find(
        (res) => res.implementation.id === analysisResult.implementation.id
      );
      if (group) {
        group.results.push(analysisResult);
      } else {
        results.push({
          implementation: analysisResult.implementation,
          results: [analysisResult],
        });
      }
    }
    for (const res of results) {
      if (!resultMap.has(res.implementation)) {
        const temp = new MatTableDataSource(res.results);
        // temp.sort = this.nisqAnalysisResultSort;
        resultMap.set(res.implementation, temp);
      }
    }
    this.groupedResultsMap = resultMap;
  }

  checkIfQpuDataIsOutdated(analysisResult: AnalysisResultDto): void {
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
          this.qpuCounter++;
          if (this.qpuCounter === this.analyzerJob.analysisResultList.length) {
            this.qpuCheckFinished = true;
            this.qpuCounter = 0;
          } else {
            this.qpuCheckFinished = false;
          }
        });
    });
  }

  execute(analysisResult: AnalysisResultDto): void {
    let token = ' ';
    this.utilService
      .createDialog(ImplementationTokenDialogComponent, {
        title: 'Enter the token for the Vendor : ' + analysisResult.provider,
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        this.loadingResults[analysisResult.id] = true;
        this.results = undefined;
        this.executedAnalyseResult = analysisResult;
        if (dialogResult.token) {
          token = dialogResult.token;
        }
        this.executeAnalysisResultRequestDto.token = token;
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

  hasExecutionResult(analysisResult: AnalysisResultDto): void {
    this.analysisResultService
      .getAnalysisResult({ resId: analysisResult.id })
      .subscribe((result) => {
        this.executionResultsAvailable[analysisResult.id] = !!Object.keys(
          result._links
        ).find((key) => key.startsWith('execute-'));
        this.loadingResults[analysisResult.id] = false;
      });
  }

  showExecutionResult(analysisResult: AnalysisResultDto): void {
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

  showBackendQueueSize(analysisResult: AnalysisResultDto): void {
    this.nisqAnalyzerService
      .getIBMQBackendState(analysisResult.qpu)
      .subscribe((data) => {
        this.queueLengths[analysisResult.qpu] = data.lengthQueue;
      });
  }
}

interface QiskitBackendState {
  state: boolean;
  status: string;
  message: string;
  lengthQueue: number;
  backend_version: string;
}

export interface GroupedResults {
  implementation: NISQImplementationDto;
  results: AnalysisResultDto[];
}
