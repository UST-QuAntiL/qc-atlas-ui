import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-publication-dialog-component',
  templateUrl: 'add-publication-dialog.html',
  styleUrls: ['add-publication-dialog.scss'],
})
export class AddPublicationDialogComponent implements OnInit {
  publicationForm: FormGroup;
  authorsForm = new FormArray([]);

  constructor(
    public dialogRef: MatDialogRef<AddPublicationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog
  ) {}

  removeItem(index) {
    this.authorsForm.removeAt(index);
  }

  addItem() {
    this.authorsForm.push(new FormControl());
  }

  get publicationTitle() {
    return this.publicationForm.get('publicationTitle');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.addItem();
    this.publicationForm = new FormGroup({
      publicationTitle: new FormControl(this.data.publicationTitle, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.maxLength(255),
      ]),
      // eslint-disable-next-line @typescript-eslint/unbound-method
      authorsForm: new FormArray([], [Validators.required]),
    });

    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.publicationTitle = this.publicationTitle.value;
      this.data.authors = this.authorsForm.getRawValue();
      console.log(this.data.authors);
    });
  }

  isRequiredDataMissing(): boolean {
    return (
      this.publicationTitle.errors?.required ||
      this.authorsForm.errors?.required
    );
  }
}

export interface DialogData {
  title: string;
  publicationTitle: string;
  authors: string[];
}
