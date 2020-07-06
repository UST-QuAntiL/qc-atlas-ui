import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-publication-dialog-component',
  templateUrl: 'add-publication-dialog.html',
  styleUrls: ['add-publication-dialog.scss'],
})
export class AddPublicationDialogComponent implements OnInit {
  publicationForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddPublicationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog
  ) {}

  removeItem(index) {
    console.log(this.data.authors);
    console.log(index);
    if (index > -1) {
      this.data.authors.splice(index, 1);
    }
    console.log(this.data.authors);
  }

  addItem() {
    this.data.authors.push('');
  }

  get publicationTitle() {
    return this.publicationForm.get('publicationTitle');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.data.authors = [''];
    this.publicationForm = new FormGroup({
      publicationTitle: new FormControl(this.data.publicationTitle, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.maxLength(255),
      ]),
    });

    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.publicationTitle = this.publicationTitle.value;
    });
  }

  isRequiredDataMissing(): boolean {
    return this.publicationTitle.errors?.required;
  }
}

export interface DialogData {
  title: string;
  publicationTitle: string;
  authors: string[];
}
