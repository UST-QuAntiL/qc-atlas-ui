import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-bibentry-dialog',
  templateUrl: './add-bibentry-dialog.component.html',
  styleUrls: ['./add-bibentry-dialog.component.scss']
})
export class AddBibentryDialogComponent implements OnInit {
  bibEntryForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddBibentryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog
  ) {
  }

  get name(): AbstractControl | null {
    return this.bibEntryForm.get('name');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.bibEntryForm = new FormGroup({
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


