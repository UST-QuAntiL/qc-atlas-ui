import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AlgorithmDto } from 'api-atlas/models/algorithm-dto';
import { ParameterDto } from 'api-nisq/models/parameter-dto';
import { SdkDto } from 'api-nisq/models/sdk-dto';
import { ExecutionResultDto } from 'api-nisq/models/execution-result-dto';
import { ExecutionRequest } from 'api-nisq/models/execution-request';
import { AnalysisResultDto } from 'api-nisq/models/analysis-result-dto';
import { ImplementationDto as NISQImplementationDto } from 'api-nisq/models';
import { NisqAnalyzerService } from './nisq-analyzer.service';

export interface ImplementationParameter extends ParameterDto {
  // TODO change value type
  value: string;
}

export interface NisqExecutionParameters extends ExecutionRequest {
  params: { [key: string]: string };
  cloudService: string;
}

// TODO: ID instead of name?
const DUMMY_CLOUD_SERVICES: SdkDto[] = [
  {
    name: 'IBMQ',
  },
];

const DUMMY_ANALYZE_RESULTS: AnalysisResultDto[] = [
  {
    qpu: {
      id: '0',
      name: 'some Qpu',
      numberOfQubits: 5,
      t1: 0,
      maxGateTime: 100,
    },
    implementation: {
      id: '0',
      name: 'some impl',
      implementedAlgorithm: 'some algo',
    },
    estimate: true,
    analysedDepth: 1,
    analysedWidth: 1,
  },
  {
    qpu: {
      id: '0',
      name: 'some Qpu',
      numberOfQubits: 5,
      t1: 0,
      maxGateTime: 100,
    },
    implementation: {
      id: '0',
      name: 'some impl',
      implementedAlgorithm: 'some algo',
    },
    estimate: true,
    analysedDepth: 1,
    analysedWidth: 1,
  },
];

const DUMMY_RESULTS: ExecutionResultDto = {
  inputParameters: {
    N: '15',
    L: '4',
  },
  statusCode: '1',
  status: 'FINISHED',
  id: '0',
  result: 'success: true\nstatus: SuccessfulCompletion,\ntime_taken: 3ms',
};

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

  params: ParameterDto[];
  cloudServices = DUMMY_CLOUD_SERVICES;

  inputFormGroup: FormGroup;

  columnsToDisplay = ['backendName', 'width', 'depth', 'execution'];
  expandedElement: ExecutionRequest | null;

  analyzerResults: AnalysisResultDto[] = DUMMY_ANALYZE_RESULTS;

  resultBackendColumns = ['backendName', 'width', 'depth'];
  results?: ExecutionResultDto = undefined;

  selectedExecutionParams: ExecutionRequest;
  nisqExecutionParams: NisqExecutionParameters;

  constructor(
    private nisqAnalyzerService: NisqAnalyzerService,
    private formBuilder: FormBuilder
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
    this.nisqExecutionParams = {
      ...value,
      // array of objects to one object
      params: Object.assign.apply(undefined, [
        {
          token: value.qiskitToken,
        },
        ...value.params,
      ]),
    } as NisqExecutionParameters;
    return true;
  }

  execute(selectedExecutionParams: ExecutionRequest): void {
    this.results = undefined;
    setTimeout(() => {
      this.results = DUMMY_RESULTS;
    }, 3000);
    this.selectedExecutionParams = selectedExecutionParams;
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
        tmp.results.push(tmp);
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
