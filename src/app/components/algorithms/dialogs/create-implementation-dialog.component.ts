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
  selector: 'app-create-implementation-dialog',
  templateUrl: './create-implementation-dialog.component.html',
  styleUrls: ['./create-implementation-dialog.component.scss'],
})
export class CreateImplementationDialogComponent implements OnInit {
  implementationForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateImplementationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateDialogData,
    public dialog: MatDialog
  ) {}

  get name(): AbstractControl | null {
    return this.implementationForm.get('name');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.implementationForm = new FormGroup({
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

export interface CreateDialogData {
  title: string;
  name: string;
}
