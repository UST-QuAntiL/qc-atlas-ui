import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ParameterDto } from 'api-nisq/models/parameter-dto';
import { CloudServiceDto } from 'api-atlas/models/cloud-service-dto';
import { ExecutionEnvironmentsService } from 'api-atlas/services/execution-environments.service';
import { NisqAnalyzerService } from '../nisq-analyzer/nisq-analyzer.service';

@Component({
  selector: 'app-add-new-analysis-dialog',
  templateUrl: './add-new-analysis-dialog.component.html',
  styleUrls: ['./add-new-analysis-dialog.component.scss'],
})
export class AddNewAnalysisDialogComponent implements OnInit {
  addNewAnalysisForm: FormGroup;
  cloudServices: CloudServiceDto[];
  parameters: ParameterDto[];

  constructor(
    public dialogRef: MatDialogRef<AddNewAnalysisDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private executionEnvironmentsService: ExecutionEnvironmentsService,
    private nisqAnalyzerService: NisqAnalyzerService
  ) {}

  get params(): AbstractControl | null {
    return this.addNewAnalysisForm.get('params');
  }

  get cloudService(): AbstractControl | null {
    return this.addNewAnalysisForm.get('cloudService');
  }

  get token(): AbstractControl | null {
    return this.addNewAnalysisForm.get('token');
  }

  ngOnInit(): void {
    this.executionEnvironmentsService
      .getCloudServices()
      .subscribe((value) => (this.cloudServices = value.content ?? []));
    this.nisqAnalyzerService.getParams(this.data.algo).subscribe((params) => {
      this.parameters = this.nisqAnalyzerService.collapseParams(
        params.filter((p) => p.name !== 'token')
      );
      this.addNewAnalysisForm = this.formBuilder.group({
        params: this.formBuilder.array(
          this.parameters.map((param) =>
            this.formBuilder.group({
              [param.name]: [''],
            })
          )
        ),
        cloudService: new FormControl(this.data.cloudService, [
          // eslint-disable-next-line @typescript-eslint/unbound-method
          Validators.required,
        ]),
        // eslint-disable-next-line @typescript-eslint/unbound-method
        shotCount: [''],
        // eslint-disable-next-line @typescript-eslint/unbound-method
        token: new FormControl(this.data.token, [
          // eslint-disable-next-line @typescript-eslint/unbound-method
          Validators.required,
        ]),
      });

      this.dialogRef.beforeClosed().subscribe(() => {
        this.data.params = this.params.value;
        this.data.cloudService = this.cloudService.value;
        this.data.token = this.token.value;
      });
    });
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

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface DialogData {
  title: string;
  params: string;
  cloudService: string;
  token: string;
  algo: string;
}
