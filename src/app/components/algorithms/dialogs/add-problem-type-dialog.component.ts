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
  filteredProblemTyped: EntityModelProblemTypeDto[];
  filteredParentProblemTypes: EntityModelProblemTypeDto[];
  parentName: string;

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
    this.parentProblemTypeControl = new FormControl(this.parentName);
    this.problemTypeForm = new FormGroup({ name: this.problemTypeControl });
    this.problemTypeService.getProblemTypes1().subscribe((types) => {
      if (types._embedded) {
        this.existingProblemTypes = types._embedded.problemTypes;
      } else {
        this.existingProblemTypes = [];
      }
    });

    this.problemTypeControl.valueChanges.subscribe((value) => {
      this.filteredProblemTyped = this.filterProblemTypes(value);
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

  onParentTypeSelect(type: EntityModelProblemTypeDto): void {
    this.data.parentProblemType = type;
  }

  onProblemTypeSelect(type: EntityModelProblemTypeDto): void {
    this.problemTypeForm.setValue({ name: type.name });
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

  filterParents(value: string): EntityModelProblemTypeDto[] {
    if (value == null) {
      return this.existingProblemTypes;
    }
    return this.existingProblemTypes.filter(
      (type) =>
        type.name.toLowerCase().includes(value.toLowerCase()) &&
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
  usedProblemTypes: EntityModelProblemTypeDto[];
  parentProblemType: EntityModelProblemTypeDto;
}
