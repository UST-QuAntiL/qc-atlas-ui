import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { XmcdaCriteriaService } from 'api-nisq/services/xmcda-criteria.service';

@Component({
  selector:
    'app-implementation-nisq-analyzer-qpu-selection-prioritization-dialog',
  templateUrl:
    './implementation-nisq-analyzer-qpu-selection-prioritization-dialog.component.html',
  styleUrls: [
    './implementation-nisq-analyzer-qpu-selection-prioritization-dialog.component.css',
  ],
})
export class ImplementationNisqAnalyzerQpuSelectionPrioritizationDialogComponent
  implements OnInit {
  prioritizationFrom: FormGroup;
  criteriaNamesAndValues: Criterion[] = [];
  inputChanged = false;
  shortWaitingTimeEnabled = false;
  stableExecutionResultsEnabled = false;
  advancedSettingsOpen: boolean;
  mcdaMethodPredefinedPreferences: string;
  weightLearningMethodPredefinedPreferences: string;

  constructor(
    public dialogRef: MatDialogRef<
      ImplementationNisqAnalyzerQpuSelectionPrioritizationDialogComponent
    >,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private mcdaService: XmcdaCriteriaService
  ) {}

  get mcdaMethod(): AbstractControl | null {
    return this.prioritizationFrom.get('mcdaMethod');
  }

  get weightLearningMethod(): AbstractControl | null {
    return this.prioritizationFrom.get('weightLearningMethod');
  }

  get bordaCount(): AbstractControl | null {
    return this.prioritizationFrom.get('bordaCount');
  }

  get criteriaAndValues(): AbstractControl | null {
    return this.prioritizationFrom.get('criteriaAndValues');
  }

  ngOnInit(): void {
    this.setMcdaMethodPredefinedPreferences('topsis');
    this.setWeightLearningMethodPredefinedPreferences('cobyla');
    this.onMcdaMethodChanged('topsis');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setWaitingTimeEnabled(enabled: boolean): void {
    this.shortWaitingTimeEnabled = enabled;
    // this.simulatorAllowed.setValue(this.shortWaitingTimeEnabled);
  }

  setStableExecutionResultsEnabled(enabled: boolean): void {
    this.stableExecutionResultsEnabled = enabled;
    // this.simulatorAllowed.setValue(this.stableExecutionResultsEnabled);
  }

  setMcdaMethodPredefinedPreferences(selectedMcdaMethod: string): void {
    this.mcdaMethodPredefinedPreferences = selectedMcdaMethod;
  }

  setWeightLearningMethodPredefinedPreferences(
    selectedWeightLearningMethod: string
  ): void {
    this.weightLearningMethodPredefinedPreferences = selectedWeightLearningMethod;
  }

  onMcdaMethodChanged(mcdaMethod: string): void {
    this.criteriaNamesAndValues = [];
    this.mcdaService
      .getCriterionForMethod({ methodName: mcdaMethod })
      .subscribe((criteriaList) => {
        // then get for each criterion the name and value and store both in the map as value
        criteriaList.mcdaCriterionList.forEach((criterion) => {
          this.mcdaService
            .getCriterionValue({
              methodName: mcdaMethod,
              criterionId: criterion.id,
            })
            .subscribe((criterionValueModel) => {
              const value = criterionValueModel.valueOrValues.pop();
              if (value) {
                const realValue = value['real'];
                this.criteriaNamesAndValues.push({
                  id: criterion.id,
                  name: criterion.name,
                  weight: realValue,
                  points: Math.round(
                    Number(criterionValueModel.description.subTitle)
                  ),
                });
              }
              this.prioritizationFrom = this.formBuilder.group({
                mcdaMethod: new FormControl(this.data.mcdaMethod, [
                  // eslint-disable-next-line @typescript-eslint/unbound-method
                  Validators.required,
                ]),
                criteriaAndValues: this.formBuilder.array(
                  this.criteriaNamesAndValues.map((c) =>
                    this.formBuilder.group({
                      [c.name]: [c.points],
                    })
                  )
                ),
              });
              this.mcdaMethod.setValue(mcdaMethod);
              this.dialogRef.beforeClosed().subscribe(() => {
                this.data.mcdaMethod = this.mcdaMethod.value;
                this.criteriaNamesAndValues.forEach((criterionVal) => {
                  for (const val of this.criteriaAndValues.value) {
                    if (criterionVal.name === Object.keys(val)[0]) {
                      criterionVal.points = Number(Object.values(val)[0]);
                      break;
                    }
                  }
                  this.data.criteriaAndValues = this.criteriaNamesAndValues;
                });
              });
            });
        });
      });
  }

  onChangeEvent(): void {
    this.inputChanged = true;
  }
}

export interface DialogData {
  title: string;
  mcdaMethod: string;
  weightLearingMethod: string;
  criteriaAndValues: Criterion[];
  bordaCount: boolean;
}

export interface Criterion {
  id: string;
  name: string;
  weight: number;
  points: number;
}
