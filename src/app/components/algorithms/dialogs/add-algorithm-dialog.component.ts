import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-algorithm-dialog-component',
  templateUrl: 'add-algorithm-dialog.html',
})
export class AddAlgorithmDialogComponent implements OnInit {
  algorithmForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddAlgorithmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog
  ) {}

  get name() {
    return this.algorithmForm.get('name');
  }
  get computationModel() {
    return this.algorithmForm.get('computationModel');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.algorithmForm = new FormGroup({
      name: new FormControl(this.data.name, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.maxLength(255),
      ]),
      computationModel: new FormControl(this.data.computationModel, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
      ]),

      quantumComputationModel: new FormControl(
        this.data.quantumComputationModel,
        [
          // eslint-disable-next-line @typescript-eslint/unbound-method
          Validators.required,
        ]
      ),
    });

    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.name = this.name.value;
    });
  }

  isRequiredDataMissing(): boolean {
    return this.name.errors?.required && this.computationModel.errors?.required;
  }
}

export interface DialogData {
  title: string;
  name: string;
  computationModel: string;
  quantumComputationModel: string;
}
