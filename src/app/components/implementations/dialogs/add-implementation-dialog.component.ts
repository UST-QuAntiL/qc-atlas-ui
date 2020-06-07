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

  get link() {
    return this.implementationForm.get('link');
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
      this.link.errors?.required ||
      this.link.errors?.pattern
    );
  }

  ngOnInit(): void {
    this.implementationForm = new FormGroup({
      name: new FormControl(this.data.name, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.maxLength(255),
      ]),
      link: new FormControl(this.data.link, [
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
      this.data.link = this.implementationForm.get('link').value;
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
  link: string;
  programmingLanguage: string;
  selectionRule: string;
  tag: TagDto;
  tags: TagDto[];
}
