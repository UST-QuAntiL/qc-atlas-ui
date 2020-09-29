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
  templateUrl: './edit-problem-type-dialog.component.html',
  styleUrls: ['./edit-problem-type-dialog.component.scss'],
})
export class EditProblemTypeDialogComponent implements OnInit {
  problemTypeFormGroup: FormGroup;
  existingProblemTypes: EntityModelProblemTypeDto[];
  selectedParentProblemType: EntityModelProblemTypeDto;

  constructor(
    private problemTypeService: ProblemTypeService,
    public dialogRef: MatDialogRef<EditProblemTypeDialogComponent>,
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
      oldProblemTypeName: new FormControl(this.data.name),
      problemTypeName: new FormControl(this.data.newName, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.maxLength(255),
      ]),
      oldParentProblemTypeName: new FormControl(
        this.data.parentProblemType
          ? this.data.parentProblemType.name
          : 'No parent assigned yet'
      ),
      parentProblemType: new FormControl(
        this.data.newParentProblemType,
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required
      ),
    });

    this.problemTypeService.getProblemTypes().subscribe((types) => {
      if (types._embedded) {
        this.existingProblemTypes = types._embedded.problemTypes;
      } else {
        this.existingProblemTypes = [];
      }
    });

    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.newName = this.problemTypeName.value;
      this.data.newParentProblemType = this.selectedParentProblemType;
    });
  }

  isRequiredDataMissing(): boolean {
    return (
      this.problemTypeName.errors?.required ||
      this.parentProblemType.errors?.required
    );
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

  onRemoveParentProblemType(): void {
    this.selectedParentProblemType = null;
  }
}

export interface DialogData {
  title: string;
  name: string;
  newName?: string;
  parentProblemType?: EntityModelProblemTypeDto;
  newParentProblemType?: EntityModelProblemTypeDto;
}
