import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProblemTypeService } from 'api-atlas/services/problem-type.service';
import { ProblemTypeDto } from 'api-atlas/models';

@Component({
  selector: 'app-edit-problem-type-dialog',
  templateUrl: './add-or-edit-problem-type-dialog.component.html',
  styleUrls: ['./add-or-edit-problem-type-dialog.component.scss'],
})
export class AddOrEditProblemTypeDialogComponent implements OnInit {
  problemTypeFormGroup: UntypedFormGroup;
  existingProblemTypes: ProblemTypeDto[] = [];

  constructor(
    private problemTypeService: ProblemTypeService,
    public dialogRef: MatDialogRef<AddOrEditProblemTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  get problemTypeName(): AbstractControl | null {
    return this.problemTypeFormGroup.get('problemTypeName');
  }

  get parentProblemType(): AbstractControl | null {
    return this.problemTypeFormGroup.get('parentProblemType');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.problemTypeFormGroup = new UntypedFormGroup({
      problemTypeName: new UntypedFormControl(this.data.name, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.maxLength(255),
      ]),
      parentProblemType: new UntypedFormControl(this.data.parentProblemType),
    });

    this.problemTypeService.getProblemTypes().subscribe((types) => {
      if (types.content) {
        for (const problemType of types.content) {
          // Don't allow to type to become it's own parent
          if (problemType.id !== this.data.id) {
            this.existingProblemTypes.push(problemType);
          }
        }
      } else {
        this.existingProblemTypes = [];
      }
      this.existingProblemTypes.unshift(this.generateEmptyProblemType());
    });

    if (!this.data.parentProblemType) {
      this.parentProblemType.setValue(this.generateEmptyProblemType());
    }

    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.name = this.problemTypeName.value;
      this.data.parentProblemType = this.parentProblemType.value.id
        ? this.parentProblemType.value
        : undefined;
    });
  }

  isRequiredDataMissing(): boolean {
    return this.problemTypeName.errors?.required;
  }

  compareFn(c1: ProblemTypeDto, c2: ProblemTypeDto): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  generateEmptyProblemType(): ProblemTypeDto {
    return { id: undefined, name: '--NONE--' };
  }
}

export interface DialogData {
  title: string;
  id: string;
  name: string;
  parentProblemType?: ProblemTypeDto;
}
