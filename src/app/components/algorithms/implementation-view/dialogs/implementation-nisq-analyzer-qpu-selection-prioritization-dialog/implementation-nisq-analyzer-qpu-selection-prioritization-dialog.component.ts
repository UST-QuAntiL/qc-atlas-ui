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
    './implementation-nisq-analyzer-qpu-selection-prioritization-dialog.component.scss',
  ],
})
export class ImplementationNisqAnalyzerQpuSelectionPrioritizationDialogComponent
  implements OnInit {
  prioritizationFrom: FormGroup;
  criteriaNamesAndValues: Criterion[] = [];

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

  get criteriaAndValues(): AbstractControl | null {
    return this.prioritizationFrom.get('criteriaAndValues');
  }

  ngOnInit(): void {
    this.onMcdaMethodChanged('topsis');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onMcdaMethodChanged(mcdaMethod: string): void {
    this.criteriaNamesAndValues = [];
    // get all criteria and save them as key in map
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
                  value: realValue,
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
                      [c.name]: [''],
                    })
                  )
                ),
              });
              this.mcdaMethod.setValue(mcdaMethod);
              this.dialogRef.beforeClosed().subscribe(() => {
                this.data.mcdaMethod = this.mcdaMethod.value;
                this.data.criteriaAndValues = this.criteriaAndValues.value;
              });
            });
        });
      });
    // set the value in the dialog view
    // SMART method calculation
  }
}

interface DialogData {
  title: string;
  mcdaMethod: string;
  criteriaAndValues: Criterion[];
}

export interface Criterion {
  id: string;
  name: string;
  value: number;
}
