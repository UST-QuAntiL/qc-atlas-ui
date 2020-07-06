import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-publication-dialog-component',
  templateUrl: 'add-publication-dialog.html',
})
export class AddPublicationDialogComponent implements OnInit {
  publicationForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddPublicationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {}

  get publicationTitle() {
    return this.publicationForm.get('publicationTitle');
  }

  get url() {
    return this.publicationForm.get('url');
  }

  get doi() {
    return this.publicationForm.get('doi');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.publicationForm = new FormGroup({
      publicationTitle: new FormControl(this.data.publicationTitle, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.maxLength(255),
      ]),
    });

    this.publicationForm = this.formBuilder.group({
      authors: this.formBuilder.array([this.initAuthors()]),
    });

    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.publicationTitle = this.publicationTitle.value;
      this.data.url = this.url.value;
      this.data.doi = this.doi.value;
    });
  }

  isRequiredDataMissing(): boolean {
    return this.publicationTitle.errors?.required;
  }

  initAuthors() {
    return this.formBuilder.group({
      name: [''],
    });
  }

  addAuthor() {
    const control = <FormArray>this.publicationForm.controls['authors'];
    control.push(this.initAuthors());
  }
}

export interface DialogData {
  title: string;
  publicationTitle: string;
  doi: string;
  url: string;
  authors: string;
}
