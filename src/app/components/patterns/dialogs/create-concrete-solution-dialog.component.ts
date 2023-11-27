import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';

@Component({
  selector: 'app-create-concrete-solution-dialog',
  templateUrl: './create-concrete-solution-dialog.component.html',
  styleUrls: ['./create-concrete-solution-dialog.component.scss'],
})
export class CreateConcreteSolutionDialogComponent implements OnInit {
  concreteSolutionForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateConcreteSolutionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog
  ) {}

  get qubitCount(): AbstractControl | null {
    return this.concreteSolutionForm.get('qubitCount');
  }

  get name(): AbstractControl | null {
    return this.concreteSolutionForm.get('name');
  }

  get description(): AbstractControl | null {
    return this.concreteSolutionForm.get('description');
  }

  get inputParameterFormat(): AbstractControl | null {
    return this.concreteSolutionForm.get('inputParameterFormat');
  }

  get hasHeader(): AbstractControl | null {
    return this.concreteSolutionForm.get('hasHeader');
  }

  get hasMeasurement(): AbstractControl | null {
    return this.concreteSolutionForm.get('hasMeasurement');
  }

  get startPattern(): AbstractControl | null {
    return this.concreteSolutionForm.get('startPattern');
  }

  get endPattern(): AbstractControl | null {
    return this.concreteSolutionForm.get('endPattern');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.concreteSolutionForm = new FormGroup({
      // eslint-disable-next-line @typescript-eslint/unbound-method
      name: new FormControl(this.data.name),
      // eslint-disable-next-line @typescript-eslint/unbound-method
      qubitCount: new FormControl(this.data.qubitCount, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.min(1),
      ]),
      inputParameterFormat: new FormControl(this.data.inputParameterFormat),
      description: new FormControl(this.data.description),
      hasHeader: new FormControl(this.data.hasHeader),
      hasMeasurement: new FormControl(this.data.hasMeasurement),
      startPattern: new FormControl(this.data.startPattern),
      endPattern: new FormControl(this.data.endPattern),
    });

    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.qubitCount = this.qubitCount.value;
      this.data.name = this.name.value;
      this.data.description = this.description.value;
      this.data.inputParameterFormat = this.inputParameterFormat.value;
      this.data.hasHeader = this.hasHeader.value;
      this.data.hasMeasurement = this.hasMeasurement.value;
      this.data.startPattern = this.startPattern.value;
      this.data.endPattern = this.endPattern.value;
    });
  }

  isRequiredDataMissing(): boolean {
    return this.qubitCount.errors?.required;
  }
}

export interface DialogData {
  title: string;
  name: string;
  description: string;
  qubitCount: number;
  inputParameterFormat: string;
  hasHeader: boolean;
  hasMeasurement: boolean;
  startPattern: boolean;
  endPattern: boolean;
}
