import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

interface BackendExecutionParams {
  backendName: string;
  backendProviderName: string;
  maxDepth: number;
  depth: number;
  qbits: number;
  width: number;
  maxWidth: number;
}

interface NISQResult {
  implementationName: string;
  backendExecutionParams: BackendExecutionParams[];
}

export interface ImplementationParameter {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
}

export interface CloudServiceOption {
  name: string;
  label: string;
}

export interface NisqExecutionParameters {
  params: { [key: string]: string };
  cloudService: string;
  shotCount: number;
  qiskitToken: string;
}

export interface NisqAnalyzeResults {
  params: { [key: string]: string };
  chosenImplementation: string;
  backendExecutionParams: BackendExecutionParams[];
  outcome: string;
}

// TODO: ID instead of name?
const DUMMY_PARAMS: ImplementationParameter[] = [
  {
    name: 'N',
    label: 'N - Integer, N > 0, Number to be factored',
    placeholder: 'e.g. 15',
  },
  {
    name: 'L',
    label: 'L - Length of binary L',
    placeholder: 'e.g. 4',
  },
];

// TODO: ID instead of name?
const DUMMY_CLOUD_SERVICES: CloudServiceOption[] = [
  {
    name: 'IBMQ',
    label: 'IBMQ',
  },
];

const DUMMY_ANALYZE_RESULTS: NISQResult[] = [
  {
    implementationName: 'shor-general-qiskit',
    backendExecutionParams: [
      {
        backendName: 'ibmq_16_melbourne',
        backendProviderName: 'IBMQ',
        maxDepth: 232,
        depth: 123,
        qbits: 15,
        width: 11,
        maxWidth: 200,
      },
    ],
  },
  {
    implementationName: 'shor-15-qiskit',
    backendExecutionParams: [
      {
        backendName: 'ibmq_16_melbourne',
        backendProviderName: 'IBMQ',
        maxDepth: 232,
        depth: 5,
        qbits: 15,
        width: 5,
        maxWidth: 200,
      },
      {
        backendName: 'ibmq_ourense',
        backendProviderName: 'IBMQ',
        maxDepth: 232,
        depth: 11,
        qbits: 15,
        width: 19,
        maxWidth: 200,
      },
    ],
  },
];

const DUMMY_RESULTS: NisqAnalyzeResults = {
  params: {
    N: '15',
    L: '4',
  },
  chosenImplementation: 'ibmq_16_melbourne',
  backendExecutionParams: [
    {
      backendName: 'ibmq_16_melbourne',
      backendProviderName: 'IBMQ',
      maxDepth: 232,
      depth: 123,
      qbits: 15,
      width: 11,
      maxWidth: 200,
    },
  ],
  outcome: 'success: true\nstatus: SuccessfulCompletion,\ntime_taken: 3ms',
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
  @Input() params = DUMMY_PARAMS;
  @Input() cloudServices = DUMMY_CLOUD_SERVICES;

  inputFormGroup: FormGroup;

  columnsToDisplay = ['backendName', 'width', 'depth', 'execution'];
  expandedElement: BackendExecutionParams | null;

  analyzerResults: NISQResult[] = DUMMY_ANALYZE_RESULTS;

  resultBackendColumns = ['backendName', 'width', 'depth', 'execution'];
  results?: NisqAnalyzeResults = undefined;

  constructor(private formBuilder: FormBuilder) {}

  get resultParams(): string[] {
    return Object.keys(this.results.params);
  }

  ngOnInit(): void {
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
      shotCount: ['', Validators.required],
      // eslint-disable-next-line @typescript-eslint/unbound-method
      qiskitToken: ['', Validators.required],
    });
  }

  submit(): boolean {
    const value = this.inputFormGroup.value;
    const result = {
      ...value,
      // array of objects to one object
      params: Object.assign.apply(undefined, [{}, ...value.params]),
    } as NisqExecutionParameters;
    console.log(result);
    return true;
  }

  execute(): void {
    this.results = undefined;
    setTimeout(() => {
      this.results = DUMMY_RESULTS;
    }, 3000);
  }

  getInputParameter(name: string): ImplementationParameter {
    return this.params.find((p) => p.name === name);
  }
}
