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
  selector: 'app-add-qai-app-dialog-component',
  styleUrls: ['./add-qai-app-dialog.scss'],
  templateUrl: 'add-qai-app-dialog.html',
})
export class AddQAIAppDialogComponent implements OnInit {
  algorithmForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddQAIAppDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog
  ) {}

  get name(): AbstractControl | null {
    return this.algorithmForm.get('name');
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
    });

    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.name = this.name.value;
    });
  }

  isRequiredDataMissing(): boolean {
    return this.name.errors?.required || this.data.file === undefined;
  }

  onFileSelected(event): void {
    const file: File = event.target.files[0];

    if (file) {
      this.data.file = file;
    }
  }
}

export interface DialogData {
  title: string;
  name: string;
  file: File;
}
