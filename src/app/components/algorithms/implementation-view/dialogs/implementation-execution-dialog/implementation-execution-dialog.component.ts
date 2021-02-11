import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-implementation-execution-dialog',
  templateUrl: './implementation-execution-dialog.component.html',
  styleUrls: ['./implementation-execution-dialog.component.scss'],
})
export class ImplementationExecutionDialogComponent implements OnInit {
  implementationExecutionForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ImplementationExecutionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog
  ) {}

  get vendor(): AbstractControl | null {
    return this.implementationExecutionForm.get('vendor');
  }

  get qpu(): AbstractControl | null {
    return this.implementationExecutionForm.get('qpu');
  }

  get token(): AbstractControl | null {
    return this.implementationExecutionForm.get('token');
  }

  ngOnInit(): void {
    this.implementationExecutionForm = new FormGroup({
      vendor: new FormControl(this.data.vendor, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.maxLength(255),
      ]),
      qpu: new FormControl(this.data.qpu, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.maxLength(255),
      ]),
      token: new FormControl(this.data.token, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.maxLength(255),
      ]),
    });

    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.vendor = this.vendor.value;
      this.data.qpu = this.qpu.value;
      this.data.token = this.token.value;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  isRequiredDataMissing(): boolean {
    return this.vendor.errors?.required;
    return this.qpu.errors?.required;
    return this.token.errors?.required;
  }
}

export interface DialogData {
  title: string;
  vendor: string;
  qpu: string;
  token: string;
}
