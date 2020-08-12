import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { interval } from 'rxjs';
import { exhaustMap, first } from 'rxjs/operators';

import { AlgorithmDto } from 'api-atlas/models/algorithm-dto';
import { ParameterDto } from 'api-nisq/models/parameter-dto';
import { SdkDto } from 'api-nisq/models/sdk-dto';
import {
  AnalysisResultDto,
  ExecutionRequestDto,
  ExecutionResultDto,
  ImplementationDto as NISQImplementationDto,
} from 'api-nisq/models';
import { NisqAnalyzerService } from './nisq-analyzer.service';

// TODO: ID instead of name?
const DUMMY_CLOUD_SERVICES: SdkDto[] = [
  {
    name: 'IBMQ',
  },
];

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

  // 1) Selection
  params: ParameterDto[];
  cloudServices = DUMMY_CLOUD_SERVICES;
  inputFormGroup: FormGroup;

  // 2) Analyze phase
  analyzeParams: {};
  analyzerResults: AnalysisResultDto[] = [];

  // 3) Execution
  executedAnalyseResult: AnalysisResultDto;
  results?: ExecutionResultDto = undefined;

  // Misc UI state
  analyzeColumns = ['backendName', 'width', 'depth', 'execution'];
  resultBackendColumns = ['backendName', 'width', 'depth'];
  expandedElement: ExecutionRequestDto | null;

  constructor(
    private nisqAnalyzerService: NisqAnalyzerService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.nisqAnalyzerService.getParams(this.algo.id).subscribe((params) => {
      this.params = params.filter((p) => p.name !== 'token');
      this.inputFormGroup = this.formBuilder.group({
        params: this.formBuilder.array(
          this.params.map((param) =>
            this.formBuilder.group({
              [param.name]: [''],
            })
          )
        ),
        // eslint-disable-next-line @typescript-eslint/unbound-method
        cloudService: ['', Validators.required],
        // eslint-disable-next-line @typescript-eslint/unbound-method
        shotCount: [''],
        // eslint-disable-next-line @typescript-eslint/unbound-method
        qiskitToken: ['', Validators.required],
      });
    });
  }

  submit(): boolean {
    const value = this.inputFormGroup.value;
    this.analyzeParams = Object.assign.apply(undefined, [
      {
        token: value.qiskitToken,
      },
      ...value.params,
    ]);
    this.nisqAnalyzerService
      .analyze({
        algorithmId: this.algo.id,
        parameters: this.analyzeParams,
      })
      .subscribe((results) => (this.analyzerResults = results));
    return true;
  }

  execute(analysisResult: AnalysisResultDto): void {
    this.results = undefined;
    this.executedAnalyseResult = analysisResult;
    const request = {
      parameters: this.analyzeParams,
      qpuId: analysisResult.qpu.id,
      analysedDepth: analysisResult.analysedDepth,
      analysedWidth: analysisResult.analysedWidth,
    };
    this.nisqAnalyzerService
      .execute(analysisResult.implementation.id, request)
      .subscribe((results) => {
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
      });
  }

  groupResultsByImplementation(
    analysisResults: AnalysisResultDto[]
  ): GroupedResults[] {
    const results: GroupedResults[] = [];

    for (const analysisResult of analysisResults) {
      const tmp = results.find(
        (res) => res.implementation.id === analysisResult.implementation.id
      );
      if (tmp) {
        tmp.results.push(analysisResult);
      } else {
        results.push({
          implementation: analysisResult.implementation,
          results: [analysisResult],
        });
      }
    }
    return results;
  }
}

export interface GroupedResults {
  implementation: NISQImplementationDto;
  results: AnalysisResultDto[];
}
