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
  selector: 'app-add-problem-type-dialog',
  templateUrl: './add-problem-type-dialog.component.html',
  styleUrls: ['./add-problem-type-dialog.component.scss'],
})
export class AddProblemTypeDialogComponent implements OnInit {
  problemTypeFormGroup: FormGroup;
  existingProblemTypes: EntityModelProblemTypeDto[];
  selectedParentProblemType: EntityModelProblemTypeDto;

  constructor(
    private problemTypeService: ProblemTypeService,
    public dialogRef: MatDialogRef<AddProblemTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  get problemTypeName(): AbstractControl | null {
    return this.problemTypeFormGroup.get('problemTypeName');
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
        this.existingProblemTypes = types._embedded.problemTypes;
      } else {
        this.existingProblemTypes = [];
      }
    });

    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.name = this.problemTypeName.value;
      this.data.parentProblemType = this.selectedParentProblemType;
    });
  }

  isRequiredDataMissing(): boolean {
    return this.problemTypeName.errors?.required;
  }

  onParentTypeSelect(type: EntityModelProblemTypeDto): void {
    this.selectedParentProblemType = type;
  }

  compareFn(
    c1: EntityModelProblemTypeDto,
    c2: EntityModelProblemTypeDto
  ): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}

export interface DialogData {
  title: string;
  name: string;
  parentProblemType: EntityModelProblemTypeDto;
}
