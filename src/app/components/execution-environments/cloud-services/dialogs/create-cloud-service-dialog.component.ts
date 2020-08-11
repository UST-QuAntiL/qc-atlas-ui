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
  selector: 'app-create-cloud-service-dialog',
  templateUrl: './create-cloud-service-dialog.component.html',
  styleUrls: ['./create-cloud-service-dialog.component.scss'],
})
export class CreateCloudServiceDialogComponent implements OnInit {
  cloudServiceForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CreateCloudServiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog
  ) {}

  get name(): AbstractControl | null {
    return this.cloudServiceForm.get('name');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.cloudServiceForm = new FormGroup({
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
