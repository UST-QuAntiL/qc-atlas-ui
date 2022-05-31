import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialog,
} from '@angular/material/dialog';

@Component({
  selector: 'app-implementation-token-dialog',
  templateUrl: './implementation-token-dialog.component.html',
  styleUrls: ['./implementation-token-dialog.component.scss'],
})
export class ImplementationTokenDialogComponent implements OnInit {
  implementationExecutionForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ImplementationTokenDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog
  ) {}

  get token(): AbstractControl | null {
    return this.implementationExecutionForm.get('token');
  }

  ngOnInit(): void {
    this.implementationExecutionForm = new FormGroup({
      token: new FormControl(this.data.token, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.maxLength(255),
      ]),
    });
    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.token = this.token.value;
    });
  }

  isRequiredDataMissing(): boolean {
    return this.token.errors?.required;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface DialogData {
  title: string;
  token: string;
}
