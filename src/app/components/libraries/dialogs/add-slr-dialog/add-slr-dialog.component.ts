import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { StudyDto } from 'api-library/models/study-dto';

@Component({
  selector: 'app-add-slr-dialog',
  templateUrl: './add-slr-dialog.component.html',
  styleUrls: ['./add-slr-dialog.component.scss']
})
export class AddSlrDialogComponent implements OnInit {
  studyForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddSlrDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SLRDialogData,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.studyForm = this.formBuilder.group({
      title: '',
      authors: this.formBuilder.array([]),
    });
    this.addAuthor();
  }

  authors(): FormArray {
    return this.studyForm.get('authors') as FormArray;
  }

  removeAuthor(authorIndex: number): void {
    this.authors().removeAt(authorIndex);
  }

  newAuthor(): FormGroup {
    return this.formBuilder.group({
      name: '',
    });
  }

  addAuthor(): void {
    this.authors().push(this.newAuthor());
  }



  onNoClick() {

  }
}

export interface SLRDialogData {
  title: string;
  study: StudyDto;
}
