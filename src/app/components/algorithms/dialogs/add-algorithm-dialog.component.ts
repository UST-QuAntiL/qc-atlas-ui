import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-algorithm-dialog-component',
  templateUrl: 'add-algorithm-dialog.html',
})
export class AddAlgorithmDialogComponent implements OnInit {
  algorithmForm: UntypedFormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddAlgorithmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog
  ) {}

  get name(): AbstractControl | null {
    return this.algorithmForm.get('name');
  }
  get computationModel(): AbstractControl | null {
    return this.algorithmForm.get('computationModel');
  }
  get quantumComputationModel(): AbstractControl | null {
    return this.algorithmForm.get('quantumComputationModel');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.algorithmForm = new UntypedFormGroup({
      name: new UntypedFormControl(this.data.name, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.maxLength(255),
      ]),
      computationModel: new UntypedFormControl(this.data.computationModel, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
      ]),
      quantumComputationModel: new UntypedFormControl(
        this.data.quantumComputationModel,
        [
          // eslint-disable-next-line @typescript-eslint/unbound-method
          Validators.required,
        ]
      ),
    });

    // Set default computation models
    this.computationModel.setValue('CLASSIC');
    this.quantumComputationModel.setValue('GATE_BASED');

    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.name = this.name.value;
      this.data.computationModel = this.computationModel.value;
      if (this.computationModel.value !== 'CLASSIC') {
        this.data.quantumComputationModel = this.quantumComputationModel.value;
      }
    });
  }

  isRequiredDataMissing(): boolean {
    return (
      this.name.errors?.required ||
      this.computationModel.errors?.required ||
      (this.computationModel.value !== 'CLASSIC' &&
        this.quantumComputationModel.errors?.required)
    );
  }
}

export interface DialogData {
  title: string;
  name: string;
  computationModel: string;
  quantumComputationModel: string;
}
