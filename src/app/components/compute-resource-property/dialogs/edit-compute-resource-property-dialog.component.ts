import { Component, Inject, OnInit } from '@angular/core';
import { ComputeResourcePropertyDto } from 'api-atlas/models/compute-resource-property-dto';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ComputeResourcePropertyTypeDto } from 'api-atlas/models/compute-resource-property-type-dto';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ComputeResourcePropertyTypesService } from 'api-atlas/services/compute-resource-property-types.service';
import { Option } from '../../generics/property-input/select-input.component';
import { CustomErrorStateMatcher } from '../../generics/property-input/default.error-matcher';

@Component({
  selector: 'app-edit-compute-resource-property-dialog',
  templateUrl: './edit-compute-resource-property-dialog.component.html',
  styleUrls: ['./edit-compute-resource-property-dialog.component.scss'],
})
export class EditComputeResourcePropertyDialogComponent implements OnInit {
  types: ComputeResourcePropertyTypeDto[] = [];
  matcher = new CustomErrorStateMatcher();
  filteredTypes: ComputeResourcePropertyTypeDto[];
  formGroup: UntypedFormGroup = new UntypedFormGroup({
    typeName: new UntypedFormControl('', Validators.minLength(1)),
    typeDesc: new UntypedFormControl(),
    typeDatatype: new UntypedFormControl('FLOAT'),
    value: new UntypedFormControl(''),
  });

  baseElement: ComputeResourcePropertyDto = {
    id: null,
    value: '',
    type: {
      datatype: 'STRING',
      description: '',
      id: null,
      name: '',
    },
  };

  selectedType: ComputeResourcePropertyTypeDto = null;

  get typeName(): string {
    return (this.formGroup.controls.typeName as UntypedFormControl).value.toString();
  }

  set typeName(name: string) {
    (this.formGroup.controls.typeName as UntypedFormControl).setValue(name);
  }

  get typeDescription(): string {
    return (this.formGroup.controls.typeDesc as UntypedFormControl).value.toString();
  }

  set typeDescription(desc: string) {
    (this.formGroup.controls.typeDesc as UntypedFormControl).setValue(desc);
  }

  get typeDatatype(): 'INTEGER' | 'STRING' | 'FLOAT' {
    return (this.formGroup.controls
      .typeDatatype as UntypedFormControl).value.toString();
  }

  set typeDatatype(type: 'INTEGER' | 'STRING' | 'FLOAT') {
    const datatypeControl = this.formGroup.controls.typeDatatype as UntypedFormControl;
    datatypeControl.setValue(type);
    datatypeControl.setValidators(null);
  }

  get propertyValue(): string {
    return (this.formGroup.controls.value as UntypedFormControl).value.toString();
  }

  set propertyValue(value: string) {
    (this.formGroup.controls.value as UntypedFormControl).setValue(value);
  }

  valueInputInvalid = true;

  availableTypes: ValidatingOption[] = [
    {
      label: 'Float',
      value: 'FLOAT',
      validationFunc: (e): boolean =>
        // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
        e.length > 0 && e.match(/^[+-]?\d+(\.\d+)?$/) && !isNaN(parseFloat(e)),
    },
    {
      label: 'Integer',
      value: 'INTEGER',
      validationFunc: (e): boolean =>
        // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
        e.length > 0 && e.match(/^(-)?\d+$/) && !isNaN(parseInt(e, 10)),
    },
    {
      label: 'String',
      value: 'STRING',
      validationFunc: (e): boolean => e != null,
    },
  ];

  constructor(
    public dialogRef: MatDialogRef<EditComputeResourcePropertyDialogData>,
    @Inject(MAT_DIALOG_DATA) public data: EditComputeResourcePropertyDialogData,
    public dialog: MatDialog,
    public propertyTypeService: ComputeResourcePropertyTypesService
  ) {}

  ngOnInit(): void {
    this.formGroup.controls.value.setValidators([
      Validators.minLength(1),
      this.typeValidator(),
    ]);
    if (this.data.entity != null) {
      this.baseElement = this.data.entity;

      this.propertyValue = this.data.entity.value;
      this.typeName = this.data.entity.type.name;
      this.onTypeSelect(this.data.entity.type);
    } else {
      this.propertyValue = '';
      this.typeDescription = '';
      this.typeName = '';
    }

    this.propertyTypeService
      .getResourcePropertyTypes({
        page: -1,
      })
      .subscribe((e) => {
        if (e.content != null) {
          this.types = e.content;
        }
      });
    this.formGroup.controls.value.setValue('');
    this.validateValueInput();
  }

  onTypeSelect(type: ComputeResourcePropertyTypeDto): void {
    this.selectedType = type;
    this.typeDatatype = type.datatype;
    this.typeDescription = type.description;
    this.formGroup.controls.typeDesc.disable();
    this.formGroup.controls.typeDatatype.disable();
    this.validateValueInput();
  }

  resetSelectedType(): void {
    this.filteredTypes = this._filter(this.typeName);
    if (this.selectedType != null) {
      this.selectedType = null;
      this.typeDescription = '';
      this.typeDatatype = 'FLOAT';
      this.formGroup.controls.typeDesc.enable();
      this.formGroup.controls.typeDatatype.enable();
      this.valueInputInvalid = true;
    }
  }

  validateValueInput(): void {
    this.valueInputInvalid = (this.formGroup.controls
      .value as UntypedFormControl).invalid;
  }

  onSubmit(): void {
    if (this.selectedType != null) {
      this.baseElement.type = this.selectedType;
      this.baseElement.value = this.propertyValue;
      this.dialogRef.close(this.baseElement);
    } else {
      this.propertyTypeService
        .createComputingResourcePropertyType({
          body: {
            id: null,
            name: this.typeName,
            description: this.typeDescription,
            datatype: this.typeDatatype,
          },
        })
        .subscribe((e) => {
          this.baseElement.type = e;
          this.baseElement.value = this.propertyValue;
          this.dialogRef.close(this.baseElement);
        });
    }
  }

  private typeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const currType = this.typeDatatype;
      const validationFunc = this.availableTypes.find(
        (e: ValidatingOption) => e.value === currType
      ).validationFunc;
      if (!validationFunc(control.value)) {
        console.log(control.value + ' is invalid');
        return {
          invalidInput: true,
        };
      }
      return null;
    };
  }

  private _filter(value: string): ComputeResourcePropertyTypeDto[] {
    const val = value.toLowerCase();
    if (val.length > 0) {
      return this.types.filter(
        (type) =>
          type.name.toLowerCase().includes(val) ||
          type.description.toLowerCase().includes(val)
      );
    } else {
      return new Array<ComputeResourcePropertyTypeDto>();
    }
  }
}

export interface ValidatingOption extends Option {
  validationFunc: (value: string) => boolean;
}

export interface EditComputeResourcePropertyDialogData {
  entity: ComputeResourcePropertyDto;
  title: string;
}
