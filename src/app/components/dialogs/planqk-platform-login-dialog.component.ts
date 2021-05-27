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
  selector: 'app-planqk-platform-login-dialog',
  templateUrl: './planqk-platform-login-dialog.component.html',
  styleUrls: ['./planqk-platform-login-dialog.component.scss'],
})
export class PlanqkPlatformLoginDialogComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PlanqkPlatformLoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog
  ) {}

  get name(): AbstractControl | null {
    return this.loginForm.get('name');
  }

  get password(): AbstractControl | null {
    return this.loginForm.get('password');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      name: new FormControl(this.data.name, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.maxLength(255),
      ]),
      password: new FormControl(this.data.password, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.maxLength(255),
      ]),
    });

    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.name = this.name.value;
      this.data.password = this.password.value;
    });
  }

  isRequiredDataMissing(): boolean {
    return this.name.errors?.required || this.password.errors?.required;
  }
}

export interface DialogData {
  title: string;
  name: string;
  password: string;
}
