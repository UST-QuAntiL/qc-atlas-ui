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
  isCanceld = false;

  constructor(
    public dialogRef: MatDialogRef<AddPublicationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog
  ) {}

  removeItem(index) {
    this.authorsForm.removeAt(index);
  }

  addItem() {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    this.authorsForm.push(new FormControl('', Validators.required));
  }

  get publicationTitle() {
    return this.publicationForm.get('publicationTitle');
  }

  onNoClick(): void {
    this.isCanceld = true;
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
      // authorsForm: new FormArray([], [Validators.required]),
    });

    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.publicationTitle = this.publicationTitle.value;
      this.data.authors = this.authorsForm.getRawValue();
    });
  }

  isRequiredDataMissing(): boolean {
    return this.publicationTitle.errors?.required || this.checkAuthors();
  }

  checkAuthors(): boolean {
    if (this.authorsForm.length < 1) {
      return true;
    }
    for (let i = 0; i < this.authorsForm.length; i++) {
      if (this.authorsForm.get([i]).errors?.required) {
        return true;
      }
    }
    return false;
  }
}

export interface DialogData {
  title: string;
  publicationTitle: string;
  authors: string[];
}
