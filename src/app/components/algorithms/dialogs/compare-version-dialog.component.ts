import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlgorithmDto } from 'api-atlas/models/algorithm-dto';

@Component({
  selector: 'app-compare-version-dialog-component',
  templateUrl: './compare-version-dialog.component.html',
  styleUrls: ['./compare-version-dialog.component.scss'],
})
export class CompareVersionDialogComponent implements OnInit {
  variableNames: string[] = [
    'property',
    'currentVersionValue',
    'compareVersionValue',
  ];
  tableColumns: string[] = [
    'Properties',
    'Current Version',
    'Compared Version',
  ];
  differences: ComparedData[];
  constructor(
    public dialogRef: MatDialogRef<CompareVersionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.differences = new Array<ComparedData>();
    this.data.versionComparision.forEach((res) => {
      if (res != null) {
        this.differences.push(res);
      }
    });
  }
}

export interface DialogData {
  title: string;
  versionComparision: ComparedData[];
}
export interface ComparedData {
  property: string;
  currentVersionValue: string | boolean;
  compareVersionValue: string | boolean;
}
