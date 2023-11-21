import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-concrete-solution-dialog-component',
  templateUrl: 'add-concrete-solution-dialog.html',
  styleUrls: ['add-concrete-solution-dialog.scss'],
})
export class AddConcreteSolutionComponent implements OnInit {
  concreteSolutionForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddConcreteSolutionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog
  ) {}

  get concreteSolutionName(): AbstractControl {
    return this.concreteSolutionForm.get('name');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.concreteSolutionForm = new FormGroup({
      // eslint-disable-next-line @typescript-eslint/unbound-method
      description: new FormControl('', Validators.required),
      startPattern: new FormControl(false),
      endPattern: new FormControl(false),
      // eslint-disable-next-line @typescript-eslint/unbound-method
      qubitCount: new FormControl(0, [Validators.required, Validators.min(1)]),
      // eslint-disable-next-line @typescript-eslint/unbound-method
      inputParameterFormat: new FormControl('', Validators.required),
      header: new FormControl(false),
      measurement: new FormControl(false),

      name: new FormControl(null, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.maxLength(255),
      ]),
    });
  }

  isRequiredDataMissing(): boolean {
    return this.concreteSolutionName.errors?.required;
  }
}

export interface DialogData {
  title: string;
  publicationTitle: string;
}
