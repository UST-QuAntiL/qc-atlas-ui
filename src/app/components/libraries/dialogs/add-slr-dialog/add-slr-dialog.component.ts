import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { StudyDto } from 'api-library/models/study-dto';
import { Study } from 'api-library/models/study';

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
      researchQuestions: this.formBuilder.array([]),
      queries: this.formBuilder.array([]),
      databases: this.formBuilder.array([]),
    });
    this.addAuthor();
    this.addQuery();
    this.addResearchQuestion();
    this.addDatabase();

    this.dialogRef.beforeClosed().subscribe(() => {
      const newStudy: Study = {};
      newStudy.title = this.studyForm.get('title').value;
      newStudy.authors = [];
      this.authors().controls.forEach((item, index) => {
        const value = item.value['name'];
        if (value !== '') {
          newStudy.authors.push(value);
        }
      });
      newStudy['research-questions'] = [];
      this.researchQuestions().controls.forEach((item, index) => {
        const value = item.value['question'];
        if (value !== '') {
          newStudy['research-questions'].push(value);
        }
      });
      newStudy.queries = [];
      this.queries().controls.forEach((item, index) => {
        const value = item.value['query'];
        if (value !== '') {
          newStudy.queries.push(item.value);
        }
      });
      newStudy.databases = [];
      this.databases().controls.forEach((item, index) => {
        const value = item.value['name'];
        if (value !== '') {
          newStudy.databases.push(item.value);
        }
      });
      this.data.study = { studyDefinition: newStudy };
    });
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

  researchQuestions(): FormArray {
    return this.studyForm.get('researchQuestions') as FormArray;
  }

  removeResearchQuestion(rqIndex: number): void {
    this.researchQuestions().removeAt(rqIndex);
  }

  newResearchQuestion(): FormGroup {
    return this.formBuilder.group({
      question: '',
    });
  }

  addResearchQuestion(): void {
    this.researchQuestions().push(this.newResearchQuestion());
  }

  queries(): FormArray {
    return this.studyForm.get('queries') as FormArray;
  }

  removeQuery(queryIndex: number): void {
    this.queries().removeAt(queryIndex);
  }

  newQuery(): FormGroup {
    return this.formBuilder.group({
      query: '',
    });
  }

  addQuery(): void {
    this.queries().push(this.newQuery());
  }

  databases(): FormArray {
    return this.studyForm.get('databases') as FormArray;
  }

  removeDatabase(dbIndex: number): void {
    this.databases().removeAt(dbIndex);
  }

  newDatabase(): FormGroup {
    return this.formBuilder.group({
      name: '',
      enabled: true,
    });
  }

  addDatabase(): void {
    this.databases().push(this.newDatabase());
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface SLRDialogData {
  title: string;
  study: StudyDto;
}
