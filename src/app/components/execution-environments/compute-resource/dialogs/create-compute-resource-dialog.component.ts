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
  selector: 'app-create-compute-resource-dialog',
  templateUrl: './create-compute-resource-dialog.component.html',
  styleUrls: ['./create-compute-resource-dialog.component.scss'],
})
export class CreateComputeResourceDialogComponent implements OnInit {
  computeResourceForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateComputeResourceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog
  ) {}

  get name(): AbstractControl | null {
    return this.computeResourceForm.get('name');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.computeResourceForm = new FormGroup({
      name: new FormControl(this.data.name, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.maxLength(255),
      ]),
    });

    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.name = this.name.value;
    });
  }

  isRequiredDataMissing(): boolean {
    return this.name.errors?.required;
  }
}

export interface DialogData {
  title: string;
  name: string;
}
