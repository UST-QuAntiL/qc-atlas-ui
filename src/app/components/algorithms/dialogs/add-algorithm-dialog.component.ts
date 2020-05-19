import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TagDto } from 'api/models';

@Component({
  selector: 'app-add-algorithm-dialog-component',
  templateUrl: 'add-algorithm-dialog.html',
})
export class AddAlgorithmDialogComponent implements OnInit {
  @ViewChild('inputTable') tableIn: MatTable<any>;
  @ViewChild('outputTable') tableOut: MatTable<any>;

  algorithmForm: FormGroup;

  displayedParametersColumns: string[] = [
    'name',
    'type',
    'description',
    'restriction',
  ];

  constructor(
    public dialogRef: MatDialogRef<AddAlgorithmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog
  ) {}

  get name() {
    return this.algorithmForm.get('name');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.algorithmForm = new FormGroup({
      name: new FormControl(this.data.name, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.maxLength(255),
      ]),
    });

    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.name = this.algorithmForm.get('name').value;
    });
  }

  isRequiredDataMissing(): boolean {
    return this.name.errors?.required || !this.data.tag;
  }
}

export interface DialogData {
  title: string;
  name: string;
  tag: TagDto;
  tags: TagDto[];
}
