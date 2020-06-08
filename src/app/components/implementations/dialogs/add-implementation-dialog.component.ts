import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ImplementationDto, TagDto } from 'api/models';

interface DialogData {
  title: string;
  tag?: TagDto;
  tags: TagDto[];
}

@Component({
  selector: 'app-add-implementation-dialog-component',
  templateUrl: 'add-implementation-dialog.html',
})
export class AddImplementationDialogComponent implements OnInit {
  @ViewChild('inputTable') tableIn: MatTable<any>;
  @ViewChild('outputTable') tableOut: MatTable<any>;

  form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<
      AddImplementationDialogComponent,
      ImplementationDto
    >,
    @Inject(MAT_DIALOG_DATA) public data: ImplementationDto & DialogData
  ) {}

  onSave() {
    this.dialogRef.close(Object.assign({}, this.data, this.form.value));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  isRequiredDataMissing(): boolean {
    return (
      this.form.get('name').errors?.required ||
      this.form.get('link').errors?.required ||
      this.form.get('link').errors?.pattern
    );
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(this.data.name, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.maxLength(255),
      ]),
      link: new FormControl(this.data.link || '', [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.maxLength(255),
        Validators.pattern(
          // prettier-ignore
          // eslint-disable-next-line @typescript-eslint/quotes
          '^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&\'\\(\\)\\*\\+,;=.]+$'
        ),
      ]),
      description: new FormControl(this.data.description || ''),
      contributors: new FormControl(this.data.contributors || ''),
      assumptions: new FormControl(this.data.assumptions || ''),
      tag: new FormControl(this.data.tag),
    });
  }
}
