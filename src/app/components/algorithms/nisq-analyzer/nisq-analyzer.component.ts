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
} from 'api-nisq/models';
import { AnalysisResultService } from 'api-nisq/services/analysis-result.service';
import { ImplementationService } from 'api-nisq/services/implementation.service';
import { SdksService } from 'api-nisq/services/sdks.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UtilService } from '../../../util/util.service';
import { AddNewAnalysisDialogComponent } from '../dialogs/add-new-analysis-dialog.component';
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
  @ViewChild(MatSort) sort: MatSort;

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
  groupedResults: GroupedResults[] = [];
  dataSource = new MatTableDataSource(this.groupedResults);
  groupedResults$ = new BehaviorSubject<GroupedResults[]>(this.groupedResults);

  // 3) Execution
  resultBackendColumns = ['backendName', 'width', 'depth'];

  executedAnalyseResult: AnalysisResultDto;
  expandedElementExecResult: ExecutionResultDto | null;
  results?: ExecutionResultDto = undefined;

  constructor(
    private executionEnvironmentsService: ExecutionEnvironmentsService,
    private analysisResultService: AnalysisResultService,
    private nisqAnalyzerService: NisqAnalyzerService,
    private utilService: UtilService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private implementationService: ImplementationService,
    private sdkService: SdksService
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
    this.groupedResults$.subscribe((val) =>
      console.log('subscribed grouped results : ', val)
    );
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  changeSort(active: string, direction: 'asc' | 'desc' | ''): void {
    console.log(active, direction);
    if (!active || !direction) {
      this.sort$.next(undefined);
    } else {
      this.sort$.next([`${active},${direction}`]);
    }
  }

  onMatSortChange(active: string, direction: 'asc' | 'desc' | ''): void {
    switch (active) {
      case 'qpu':
        if (direction === 'desc') {
          this.groupedResults.map((groupedResult) => {
            groupedResult.results = groupedResult.results
              .sort((a, b) => a.qpu.localeCompare(b.qpu))
              .reverse();
          });
        } else {
          this.groupedResults.map((groupedResult) => {
            groupedResult.results = groupedResult.results.sort((a, b) =>
              a.qpu.localeCompare(b.qpu)
            );
          });
        }
    }
    this.groupedResults$.next(this.groupedResults);
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
    this.utilService
      .createDialog(AddNewAnalysisDialogComponent, {
        title: 'Start Analysis',
        algo: this.algo.id,
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          // Merge a list of parameter objects into a single parameter object.
          const analyzeParams = Object.assign.apply(undefined, [
            {
              token: dialogResult.token,
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
      }
    });
    return true;
  }

  groupResultsByImplementation(analysisResults: AnalysisResultDto[]): void {
    const results: GroupedResults[] = [];

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
    this.groupedResults = results;
    this.groupedResults$.next(this.groupedResults);
    console.log('Initial grouped results', this.groupedResults);
  }

  execute(analysisResult: AnalysisResultDto): void {
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
    if (Object.is(this.expandedElement, analysisResult)) {
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
