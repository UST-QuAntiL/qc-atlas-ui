import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProblemTypeService } from 'api-atlas/services/problem-type.service';
import { EntityModelProblemTypeDto } from 'api-atlas/models';

@Component({
  selector: 'app-edit-problem-type-dialog',
  templateUrl: './add-or-edit-problem-type-dialog.component.html',
  styleUrls: ['./add-or-edit-problem-type-dialog.component.scss'],
})
export class AddOrEditProblemTypeDialogComponent implements OnInit {
  problemTypeFormGroup: FormGroup;
  existingProblemTypes: EntityModelProblemTypeDto[] = [];

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
    this.problemTypeFormGroup = new FormGroup({
      problemTypeName: new FormControl(this.data.name, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.maxLength(255),
      ]),
      parentProblemType: new FormControl(this.data.parentProblemType),
    });

    this.problemTypeService.getProblemTypes().subscribe((types) => {
      if (types._embedded) {
        for (const problemType of types._embedded.problemTypes) {
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

  compareFn(
    c1: EntityModelProblemTypeDto,
    c2: EntityModelProblemTypeDto
  ): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  generateEmptyProblemType(): EntityModelProblemTypeDto {
    return { id: undefined, name: '--NONE--' };
  }
}

export interface DialogData {
  title: string;
  id: string;
  name: string;
  parentProblemType?: EntityModelProblemTypeDto;
}
