import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ProblemTypeService } from 'api/services/problem-type.service';
import { EntityModelProblemTypeDto } from 'generated/api/models';

@Component({
  selector: 'app-add-problem-type-dialog',
  templateUrl: './add-problem-type-dialog.component.html',
  styleUrls: ['./add-problem-type-dialog.component.scss'],
})
export class AddProblemTypeDialogComponent implements OnInit {
  problemTypeForm: FormGroup;
  parentProblemTypeControl: FormControl = new FormControl();
  problemTypeControl: FormControl = new FormControl();
  existingProblemTypes: EntityModelProblemTypeDto[];
  filteredProblemTypes: EntityModelProblemTypeDto[];
  filteredParentProblemTypes: EntityModelProblemTypeDto[];

  constructor(
    private problemTypeService: ProblemTypeService,
    public dialogRef: MatDialogRef<AddProblemTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog
  ) {}

  get name(): AbstractControl | null {
    return this.problemTypeForm.get('name');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.problemTypeControl = new FormControl(this.data.name, [
      // eslint-disable-next-line @typescript-eslint/unbound-method
      Validators.required,
      Validators.maxLength(255),
    ]);
    this.parentProblemTypeControl = new FormControl(
      this.data.parentProblemType
    );
    this.problemTypeForm = new FormGroup({
      name: this.problemTypeControl,
      parentProblem: this.parentProblemTypeControl,
    });
    this.problemTypeService
      .getProblemTypes1({ page: 0, size: 1000 })
      .subscribe((types) => {
        if (types._embedded) {
          this.existingProblemTypes = types._embedded.problemTypes;
        } else {
          this.existingProblemTypes = [];
        }
      });

    this.problemTypeControl.valueChanges.subscribe((value) => {
      this.filteredProblemTypes = this.filterProblemTypes(value);
    });
    this.parentProblemTypeControl.valueChanges.subscribe((value) => {
      this.filteredParentProblemTypes = this.filterParents(value);
    });

    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.name = this.name.value;
    });
  }

  isRequiredDataMissing(): boolean {
    return this.name.errors?.required;
  }

  onProblemTypeSelect(type: EntityModelProblemTypeDto): void {
    this.data.existingProblemType = type;
    this.problemTypeService
      .getProblemTypeById({ id: type.parentProblemType })
      .subscribe(
        (parentType) => {
          if (parentType) {
            this.data.parentProblemType = parentType;
            this.problemTypeForm.setValue({
              name: type.name,
              parentProblem: this.data.parentProblemType,
            });
          }
        },
        (error) => {}
      );
  }

  onParentTypeSelect(type: EntityModelProblemTypeDto): void {
    this.data.parentProblemType = type;
  }

  filterProblemTypes(value: string): EntityModelProblemTypeDto[] {
    if (value == null) {
      return this.existingProblemTypes.filter(
        (type) =>
          !this.data.usedProblemTypes.some(
            (usedType) => usedType.id === type.id
          )
      );
    }
    return this.existingProblemTypes.filter(
      (type) =>
        type.name.toLowerCase().includes(value.toLowerCase()) &&
        !this.data.usedProblemTypes.some((usedType) => usedType.id === type.id)
    );
  }

  filterParents(value: EntityModelProblemTypeDto): EntityModelProblemTypeDto[] {
    if (value.name == null) {
      return this.existingProblemTypes;
    }
    return this.existingProblemTypes.filter(
      (type) =>
        type.name.toLowerCase().includes(value.name.toLowerCase()) &&
        !(
          this.name.value != null &&
          type.name.toLowerCase() === this.name.value.toLowerCase()
        )
    );
  }
}

export interface DialogData {
  title: string;
  name: string;
  parentProblemType: EntityModelProblemTypeDto;
  existingProblemType: EntityModelProblemTypeDto;
  usedProblemTypes: EntityModelProblemTypeDto[];
}
