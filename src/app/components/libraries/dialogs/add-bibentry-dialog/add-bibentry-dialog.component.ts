import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-bibentry-dialog',
  templateUrl: './add-bibentry-dialog.component.html',
  styleUrls: ['./add-bibentry-dialog.component.scss'],
})
export class AddBibentryDialogComponent implements OnInit {
  bibEntryForm: FormGroup;
  fields = ['author', 'title', 'citationKey', 'entryType', 'date'];

  constructor(
    public dialogRef: MatDialogRef<AddBibentryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}

  get title(): AbstractControl | null {
    return this.bibEntryForm.get('title');
  }

  get citekey(): AbstractControl | null {
    return this.bibEntryForm.get('citekey');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.bibEntryForm = this.formBuilder.group(this.fields);

    for (const f of this.fields) {
      this.bibEntryForm.addControl(f, this.formBuilder.control(''));
    }

    this.dialogRef.beforeClosed().subscribe(() => {
      for (const f of this.fields) {
        const value = this.bibEntryForm.get(f).value;
        if (value !== '') {
          this.data[f] = value;
        }
      }
    });
  }

  isRequiredDataMissing(): boolean {
    return false;
  }
}

export interface DialogData {
  title: string;
  name: string;
}
