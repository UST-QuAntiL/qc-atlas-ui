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
  comparisons: ComparedData[];
  constructor(
    public dialogRef: MatDialogRef<CompareVersionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.compareVersions(this.data.currentVersion, this.data.compareVersion);
  }

  compareVersions(
    currentVersion: AlgorithmDto,
    compareVersion: AlgorithmDto
  ): void {
    this.comparisons = new Array<ComparedData>();
    this.compareStrings('Name', currentVersion.name, compareVersion.name);
    this.compareStrings(
      'acronym',
      currentVersion.acronym,
      compareVersion.acronym
    );
    this.compareStrings('Intent', currentVersion.intent, compareVersion.intent);
    this.compareStrings(
      'problem',
      currentVersion.problem,
      compareVersion.problem
    );
    this.compareStrings(
      'InputFormat',
      currentVersion.inputFormat,
      compareVersion.inputFormat
    );
    this.compareStrings(
      'Algo Parameter',
      currentVersion.algoParameter,
      compareVersion.algoParameter
    );
    this.compareStrings(
      'Output Format',
      currentVersion.outputFormat,
      compareVersion.outputFormat
    );
    this.compareStrings(
      'Solution',
      currentVersion.solution,
      compareVersion.solution
    );
    this.compareStrings(
      'Assumptions',
      currentVersion.assumptions,
      compareVersion.assumptions
    );
    if (
      currentVersion.computationModel === 'QUANTUM' &&
      compareVersion.computationModel === 'QUANTUM'
    ) {
      if (currentVersion.nisqReady !== compareVersion.nisqReady) {
        this.comparisons.push({
          property: 'Nisq ready',
          currentVersionValue: currentVersion.nisqReady,
          compareVersionValue: compareVersion.nisqReady,
        });
        this.compareStrings(
          'Quantum Computation Model',
          currentVersion.quantumComputationModel,
          compareVersion.quantumComputationModel
        );
        this.compareStrings(
          'Speed Up',
          currentVersion.speedUp,
          compareVersion.speedUp
        );
      }
    }
  }

  compareStrings(
    propertyName: string,
    firstValue: string,
    secondValue: string
  ): void {
    if (firstValue !== secondValue) {
      this.comparisons.push({
        property: propertyName,
        currentVersionValue: firstValue,
        compareVersionValue: secondValue,
      });
    }
  }
}

export interface DialogData {
  title: string;
  currentVersion: AlgorithmDto;
  compareVersion: AlgorithmDto;
}
export interface ComparedData {
  property: string;
  currentVersionValue: string | boolean;
  compareVersionValue: string | boolean;
}
