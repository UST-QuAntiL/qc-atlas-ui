import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
const DUMMY_CLOUD_SERVICES = [
  {
    name: 'IBMQ',
    label: 'IBMQ',
  },
];

@Component({
  selector: 'app-algorithm-nisq-analyzer',
  templateUrl: './nisq-analyzer.component.html',
  styleUrls: ['./nisq-analyzer.component.scss'],
})
export class NisqAnalyzerComponent implements OnInit {
  @Input() params = DUMMY_PARAMS;
  @Input() cloudServices = DUMMY_CLOUD_SERVICES;

  inputFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.inputFormGroup = this.formBuilder.group({
      params: this.formBuilder.array(
        this.params.map((param) =>
          this.formBuilder.group({
            [param.name]: [''],
          })
        )
      ),
      shotCount: ['', Validators.required],
      qiskitToken: ['', Validators.required],
    });
  }

  submit(): boolean {
    console.log(this.inputFormGroup.value);
    return true;
  }
}
