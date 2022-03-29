import { Component, Inject, OnInit, ViewChild } from '@angular/core';
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
import { MatStepper } from '@angular/material/stepper';

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
  @ViewChild('matHorizontalStepper') matHorizontalStepper: MatStepper;
  prioritizationFrom: FormGroup;
  preferenceForm: FormGroup;
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

  get preferenceMcdaMethod(): AbstractControl | null {
    return this.preferenceForm.get('preferenceMcdaMethod');
  }

  get weightLearningMethod(): AbstractControl | null {
    return this.preferenceForm.get('weightLearningMethod');
  }

  get shortWaitingTime(): AbstractControl | null {
    return this.preferenceForm.get('shortWaitingTime');
  }

  get stableExecutionResults(): AbstractControl | null {
    return this.preferenceForm.get('stableExecutionResults');
  }

  get mcdaMethod(): AbstractControl | null {
    return this.prioritizationFrom.get('mcdaMethod');
  }

  get criteriaAndValues(): AbstractControl | null {
    return this.prioritizationFrom.get('criteriaAndValues');
  }

  ngOnInit(): void {
    this.preferenceForm = new FormGroup({
      preferenceMcdaMethod: new FormControl(this.data.preferenceMcdaMethod, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
      ]),
      weightLearningMethod: new FormControl(this.data.weightLearningMethod, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
      ]),
      shortWaitingTime: new FormControl(this.data.shortWaitingTime, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
      ]),
      stableExecutionResults: new FormControl(
        this.data.stableExecutionResults,
        [
          // eslint-disable-next-line @typescript-eslint/unbound-method
          Validators.required,
        ]
      ),
    });
    this.preferenceMcdaMethod.setValue('topsis');
    this.weightLearningMethod.setValue('cobyla');
    this.stableExecutionResults.setValue(false);
    this.shortWaitingTime.setValue(false);

    this.onMcdaMethodChanged('topsis');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  setWaitingTimeEnabled(enabled: boolean): void {
    this.shortWaitingTimeEnabled = enabled;
    this.shortWaitingTime.setValue(this.shortWaitingTimeEnabled);
  }

  setStableExecutionResultsEnabled(enabled: boolean): void {
    this.stableExecutionResultsEnabled = enabled;
    this.stableExecutionResults.setValue(this.stableExecutionResultsEnabled);
  }

  setMcdaMethodPredefinedPreferences(selectedMcdaMethod: string): void {
    this.mcdaMethodPredefinedPreferences = selectedMcdaMethod;
  }

  setWeightLearningMethodPredefinedPreferences(
    selectedWeightLearningMethod: string
  ): void {
    this.weightLearningMethodPredefinedPreferences = selectedWeightLearningMethod;
  }

  resetPredefinedPreferences(): boolean {
    this.setWaitingTimeEnabled(false);
    this.setStableExecutionResultsEnabled(false);
    return true;
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
                this.data.preferenceMcdaMethod = this.preferenceMcdaMethod.value;
                this.data.weightLearningMethod = this.weightLearningMethod.value;
                this.data.shortWaitingTime = this.shortWaitingTime.value;
                this.data.stableExecutionResults = this.stableExecutionResults.value;
                this.criteriaNamesAndValues.forEach((criterionVal) => {
                  if (
                    this.shortWaitingTime.value &&
                    criterionVal.name === 'queue-size'
                  ) {
                    criterionVal.points = 100;
                  } else if (
                    this.shortWaitingTime.value &&
                    criterionVal.name !== 'queue-size'
                  ) {
                    criterionVal.points = 0;
                  } else {
                    for (const val of this.criteriaAndValues.value) {
                      if (criterionVal.name === Object.keys(val)[0]) {
                        criterionVal.points = Number(Object.values(val)[0]);
                        break;
                      }
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

  move(index: number): void {
    this.matHorizontalStepper.selectedIndex = index;
  }
}

export interface DialogData {
  title: string;
  mcdaMethod: string;
  preferenceMcdaMethod: string;
  weightLearningMethod: string;
  shortWaitingTime: boolean;
  stableExecutionResults: boolean;
  criteriaAndValues: Criterion[];
}

export interface Criterion {
  id: string;
  name: string;
  weight: number;
  points: number;
}
