import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TagDto } from 'api/models';
import { UtilService } from '../../../util/util.service';

@Component({
  selector: 'app-add-implementation-dialog-component',
  templateUrl: 'add-implementation-dialog.html',
})
export class AddImplementationDialogComponent implements OnInit {
  @ViewChild('inputTable') tableIn: MatTable<any>;
  @ViewChild('outputTable') tableOut: MatTable<any>;

  implementationForm: FormGroup;

  displayedParametersColumns: string[] = [
    'name',
    'type',
    'description',
    'restriction',
  ];

  constructor(
    public dialogRef: MatDialogRef<AddImplementationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private utilService: UtilService
  ) {}

  get name() {
    return this.implementationForm.get('name');
  }

  get fileLocation() {
    return this.implementationForm.get('fileLocation');
  }

  get selectionRule() {
    return this.implementationForm.get('selectionRule');
  }

  get programmingLanguage() {
    return this.implementationForm.get('programmingLanguage');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  isRequiredDataMissing(): boolean {
    return (
      this.name.errors?.required ||
      this.programmingLanguage.errors?.required ||
      this.selectionRule.errors?.required ||
      this.fileLocation.errors?.required ||
      this.fileLocation.errors?.pattern
    );
  }

  ngOnInit(): void {
    this.implementationForm = new FormGroup({
      name: new FormControl(this.data.name, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.maxLength(255),
      ]),
      fileLocation: new FormControl(this.data.fileLocation, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.maxLength(255),
        Validators.pattern(
          // prettier-ignore
          // eslint-disable-next-line @typescript-eslint/quotes
          '^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&\'\\(\\)\\*\\+,;=.]+$'
        ),
      ]),
      selectionRule: new FormControl(this.data.selectionRule, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.maxLength(255),
      ]),
      programmingLanguage: new FormControl(this.data.programmingLanguage, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.maxLength(255),
      ]),
    });

    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.name = this.implementationForm.get('name').value;
      this.data.fileLocation = this.implementationForm.get(
        'fileLocation'
      ).value;
      this.data.selectionRule = this.implementationForm.get(
        'selectionRule'
      ).value;
      this.data.programmingLanguage = this.implementationForm.get(
        'programmingLanguage'
      ).value;
    });
  }
}

export interface DialogData {
  title: string;
  name: string;
  description: string;
  fileLocation: string;
  programmingLanguage: string;
  selectionRule: string;
  tag: TagDto;
  tags: TagDto[];
}
