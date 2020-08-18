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
import { ProblemTypeService } from 'generated/api/services/problem-type.service';
import { EntityModelProblemTypeDto } from 'generated/api/models';

@Component({
  selector: 'app-add-problem-type-dialog',
  templateUrl: './add-problem-type-dialog.component.html',
  styleUrls: ['./add-problem-type-dialog.component.scss'],
})
export class AddProblemTypeDialogComponent implements OnInit {
  problemTypeControl: FormControl = new FormControl();
  problemTypeForm: FormGroup;
  parentProblemTypeControl: FormControl = new FormControl();
  parentProblemTypeForm: FormGroup;
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
    });
    this.parentProblemTypeForm = new FormGroup({
      parentProblemType: this.parentProblemTypeControl,
    });
    this.problemTypeService.getProblemTypes().subscribe((types) => {
      if (types._embedded) {
        this.existingProblemTypes = types._embedded.problemTypes;
      } else {
        this.existingProblemTypes = [];
      }
    });

    this.problemTypeControl.valueChanges.subscribe((value) => {
      this.filteredProblemTypes = this.filterProblemTypes(value);
      this.filteredParentProblemTypes = this.filterParents(null);
    });

    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.name = this.name.value;
    });
  }

  isRequiredDataMissing(): boolean {
    return this.name.errors?.required;
  }

  onProblemTypeSelect(type: EntityModelProblemTypeDto): void {
    this.data.selectedProblemType = type;
    this.filteredParentProblemTypes = this.filterParents(type);
    this.problemTypeService
      .getProblemTypeById({ id: type.parentProblemType })
      .subscribe(
        (parentType) => {
          if (parentType) {
            this.parentProblemTypeControl.patchValue(parentType);
            this.data.parentProblemType = parentType;
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
      return this.existingProblemTypes;
    }
    return this.existingProblemTypes.filter((type) =>
      type.name.toLowerCase().includes(value.toLowerCase())
    );
  }

  filterParents(value: EntityModelProblemTypeDto): EntityModelProblemTypeDto[] {
    if (value == null) {
      return this.existingProblemTypes;
    }
    return this.existingProblemTypes.filter((type) => !(type.id === value.id));
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
  selectedProblemType: EntityModelProblemTypeDto;
  parentProblemType: EntityModelProblemTypeDto;
}
