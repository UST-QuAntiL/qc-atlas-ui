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
    this.compareVersions(this.data.currentVersion, this.data.compareVersion);
  }

  compareVersions(
    currentVersion: AlgorithmDto,
    compareVersion: AlgorithmDto
  ): void {
    this.differences = new Array<ComparedData>();
    this.caluclateAndAddDifference('Name', currentVersion.name, compareVersion.name);
    this.caluclateAndAddDifference(
      'acronym',
      currentVersion.acronym,
      compareVersion.acronym
    );
    this.caluclateAndAddDifference('Intent', currentVersion.intent, compareVersion.intent);
    this.caluclateAndAddDifference(
      'problem',
      currentVersion.problem,
      compareVersion.problem
    );
    this.caluclateAndAddDifference(
      'InputFormat',
      currentVersion.inputFormat,
      compareVersion.inputFormat
    );
    this.caluclateAndAddDifference(
      'Algo Parameter',
      currentVersion.algoParameter,
      compareVersion.algoParameter
    );
    this.caluclateAndAddDifference(
      'Output Format',
      currentVersion.outputFormat,
      compareVersion.outputFormat
    );
    this.caluclateAndAddDifference(
      'Solution',
      currentVersion.solution,
      compareVersion.solution
    );
    this.caluclateAndAddDifference(
      'Assumptions',
      currentVersion.assumptions,
      compareVersion.assumptions
    );
    if (
      currentVersion.computationModel === 'QUANTUM' &&
      compareVersion.computationModel === 'QUANTUM'
    ) {
      if (currentVersion.nisqReady !== compareVersion.nisqReady) {
        this.differences.push({
          property: 'Nisq ready',
          currentVersionValue: currentVersion.nisqReady,
          compareVersionValue: compareVersion.nisqReady,
        });
        this.caluclateAndAddDifference(
          'Quantum Computation Model',
          currentVersion.quantumComputationModel,
          compareVersion.quantumComputationModel
        );
        this.caluclateAndAddDifference(
          'Speed Up',
          currentVersion.speedUp,
          compareVersion.speedUp
        );
      }
    }
  }

  caluclateAndAddDifference(
    propertyName: string,
    firstValue: string,
    secondValue: string
  ): void {
    if (firstValue !== secondValue) {
      this.differences.push({
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
