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

import { ExecutionEnvironmentsService } from 'api-atlas/services';
import { AlgorithmDto, CloudServiceDto } from 'api-atlas/models';
import {
  ParameterDto,
  AnalysisResultDto,
  ExecutionResultDto,
  ImplementationDto as NISQImplementationDto,
} from 'api-nisq/models';
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

  // 1) Selection
  params: ParameterDto[];
  cloudServices: CloudServiceDto[];
  inputFormGroup: FormGroup;

  // 2) Analyze phase
  analyzeColumns = ['backendName', 'width', 'depth', 'execution'];
  analyzerResults: AnalysisResultDto[] = [];
  expandedElement: AnalysisResultDto | null;

  // 3) Execution
  resultBackendColumns = ['backendName', 'width', 'depth'];
  executedAnalyseResult: AnalysisResultDto;
  results?: ExecutionResultDto = undefined;

  constructor(
    private executionEnvironmentsService: ExecutionEnvironmentsService,
    private nisqAnalyzerService: NisqAnalyzerService,
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.executionEnvironmentsService
      .getCloudServices()
      .subscribe(
        (value) => (this.cloudServices = value._embedded.cloudServices ?? [])
      );
    this.nisqAnalyzerService.getParams(this.algo.id).subscribe((params) => {
      this.params = this.nisqAnalyzerService.collapseParams(
        params.filter((p) => p.name !== 'token')
      );
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
      this.onCloudServiceChanged('');
    });
  }

  submit(): boolean {
    const value = this.inputFormGroup.value;
    // Merge a list of parameter objects into a single parameter object.
    const analyzeParams = Object.assign.apply(undefined, [
      {
        token: value.qiskitToken,
      },
      ...value.params,
    ]);
    this.analyzerResults = undefined;
    this.nisqAnalyzerService
      .analyze({
        algorithmId: this.algo.id,
        parameters: analyzeParams,
      })
      .subscribe((results) => (this.analyzerResults = results));
    return true;
  }

  execute(analysisResult: AnalysisResultDto): void {
    this.results = undefined;
    this.executedAnalyseResult = analysisResult;
    this.nisqAnalyzerService.execute(analysisResult.id).subscribe((results) => {
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
    return results;
  }

  filterInputParams(inputParameters: any): {} {
    // Remove token from input parameters, as it is handled separately.
    inputParameters = Object.assign({}, inputParameters);
    delete inputParameters.token;
    return inputParameters;
  }

  beautifyResult(result: string): string {
    // TODO: once we have JSON, prettify
    return result;
  }

  patternForParam(param: ParameterDto): string {
    switch (param.type) {
      case 'Integer':
        return '[0-9]+';
      // https://stackoverflow.com/questions/12643009/regular-expression-for-floating-point-numbers
      case 'Float':
        return '[+-]?([0-9]*[.])?[0-9]+';
      default:
        return undefined;
    }
  }

  onCloudServiceChanged(value: string): void {
    if (value === 'IBMQ') {
      this.inputFormGroup.controls.qiskitToken.enable();
    } else {
      this.inputFormGroup.controls.qiskitToken.disable();
    }
  }
}

export interface GroupedResults {
  implementation: NISQImplementationDto;
  results: AnalysisResultDto[];
}
