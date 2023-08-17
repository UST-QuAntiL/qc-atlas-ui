import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector:
    'app-implementation-nisq-analyzer-qpu-selection-sensitivity-analysis-dialog',
  templateUrl:
    './implementation-nisq-analyzer-qpu-selection-sensitivity-analysis-dialog.component.html',
  styleUrls: [
    './implementation-nisq-analyzer-qpu-selection-sensitivity-analysis-dialog.component.scss',
  ],
})
export class ImplementationNisqAnalyzerQpuSelectionSensitivityAnalysisDialogComponent
  implements OnInit {
  sensitivityAnalysisForm: UntypedFormGroup;

  constructor(
    public dialogRef: MatDialogRef<ImplementationNisqAnalyzerQpuSelectionSensitivityAnalysisDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog
  ) {}

  get stepSize(): AbstractControl | null {
    return this.sensitivityAnalysisForm.get('stepSize');
  }

  get upperBound(): AbstractControl | null {
    return this.sensitivityAnalysisForm.get('upperBound');
  }

  get lowerBound(): AbstractControl | null {
    return this.sensitivityAnalysisForm.get('lowerBound');
  }

  ngOnInit(): void {
    this.sensitivityAnalysisForm = new UntypedFormGroup({
      stepSize: new UntypedFormControl(this.data.stepSize, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
      ]),
      upperBound: new UntypedFormControl(this.data.upperBound, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
      ]),
      lowerBound: new UntypedFormControl(this.data.lowerBound, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
      ]),
    });

    this.stepSize.setValue(0.01);
    this.upperBound.setValue(500);
    this.lowerBound.setValue(0.001);

    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.stepSize = this.stepSize.value;
      this.data.upperBound = this.upperBound.value;
      this.data.lowerBound = this.lowerBound.value;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  isRequiredDataMissing(): boolean {
    return this.upperBound.errors?.required;
    return this.lowerBound.errors?.required;
    return this.stepSize.errors?.required;
  }
}

interface DialogData {
  title: string;
  stepSize: number;
  upperBound: number;
  lowerBound: number;
}
