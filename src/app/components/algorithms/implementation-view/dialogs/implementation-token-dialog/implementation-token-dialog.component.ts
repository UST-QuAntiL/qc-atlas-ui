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

  get ibmqToken(): AbstractControl | null {
    return this.implementationExecutionForm.get('ibmqToken');
  }

  get ionqToken(): AbstractControl | null {
    return this.implementationExecutionForm.get('ionqToken');
  }

  get awsToken(): AbstractControl | null {
    return this.implementationExecutionForm.get('awsToken');
  }

  get awsSecretToken(): AbstractControl | null {
    return this.implementationExecutionForm.get('awsSecretToken');
  }

  ngOnInit(): void {
    this.implementationExecutionForm = new FormGroup({
      ibmqToken: new FormControl(this.data.ibmqToken),
      ionqToken: new FormControl(this.data.ionqToken),
      awsToken: new FormControl(this.data.awsToken),
      awsSecretToken: new FormControl(this.data.awsSecretToken),
    });
    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.ibmqToken = this.ibmqToken.value;
      this.data.ionqToken = this.ionqToken.value;
      this.data.awsToken = this.awsToken.value;
      this.data.awsSecretToken = this.awsSecretToken.value;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface DialogData {
  title: string;
  vendor: string;
  ibmqToken: string;
  ionqToken: string;
  awsToken: string;
  awsSecretToken: string;
}
