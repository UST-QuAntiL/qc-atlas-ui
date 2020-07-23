import { Component, Inject, OnInit } from '@angular/core';
import { EntityModelComputingResourcePropertyDto } from 'api/models/entity-model-computing-resource-property-dto';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ComputingResourcePropertiesTypesService } from 'api/services/computing-resource-properties-types.service';
import { EntityModelComputingResourcePropertyTypeDto } from 'api/models/entity-model-computing-resource-property-type-dto';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Option } from '../../generics/property-input/select-input.component';
import { CustomErrorStateMatcher } from '../../generics/property-input/default.error-matcher';

@Component({
  selector: 'app-edit-compute-resource-property-dialog',
  templateUrl: './edit-compute-resource-property-dialog.component.html',
  styleUrls: ['./edit-compute-resource-property-dialog.component.scss'],
})
export class EditComputeResourcePropertyDialogComponent implements OnInit {
  types: EntityModelComputingResourcePropertyTypeDto[] = [];
  matcher = new CustomErrorStateMatcher();
  filteredTypes: EntityModelComputingResourcePropertyTypeDto[];
  formGroup: FormGroup = new FormGroup({
    typeName: new FormControl('', Validators.minLength(1)),
    typeDesc: new FormControl(),
    typeDatatype: new FormControl('FLOAT'),
    value: new FormControl(''),
  });

  baseElement: EntityModelComputingResourcePropertyDto = {
    value: '',
    type: {
      datatype: 'STRING',
      description: '',
      id: null,
      name: '',
    },
  };

  selectedType: EntityModelComputingResourcePropertyTypeDto = null;

  get typeName(): string {
    return (this.formGroup.controls.typeName as FormControl).value.toString();
  }
  set typeName(name: string) {
    (this.formGroup.controls.typeName as FormControl).setValue(name);
  }

  get typeDescription(): string {
    return (this.formGroup.controls.typeDesc as FormControl).value.toString();
  }
  set typeDescription(desc: string) {
    (this.formGroup.controls.typeDesc as FormControl).setValue(desc);
  }

  get typeDatatype(): 'INTEGER' | 'STRING' | 'FLOAT' {
    return (this.formGroup.controls
      .typeDatatype as FormControl).value.toString();
  }
  set typeDatatype(type: 'INTEGER' | 'STRING' | 'FLOAT') {
    const datatypeControl = this.formGroup.controls.typeDatatype as FormControl;
    datatypeControl.setValue(type);
    datatypeControl.setValidators(null);
  }

  get propertyValue(): string {
    return (this.formGroup.controls.value as FormControl).value.toString();
  }
  set propertyValue(value: string) {
    (this.formGroup.controls.value as FormControl).setValue(value);
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
    public propertyTypeService: ComputingResourcePropertiesTypesService
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
    this.propertyTypeService.getResourcePropertyTypes().subscribe((e) => {
      if (e._embedded != null) {
        this.types = e._embedded.computingResourcePropertyTypes;
      }
    });
    this.formGroup.controls.value.setValue('');
    this.validateValueInput();
  }

  onTypeSelect(type: EntityModelComputingResourcePropertyTypeDto): void {
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
      .value as FormControl).invalid;
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

  private _filter(
    value: string
  ): EntityModelComputingResourcePropertyTypeDto[] {
    const val = value.toLowerCase();
    return this.types.filter(
      (type) =>
        type.name.includes(val) || type.description.toLowerCase().includes(val)
    );
  }
}

export interface ValidatingOption extends Option {
  validationFunc: (value: string) => boolean;
}

export interface EditComputeResourcePropertyDialogData {
  entity: EntityModelComputingResourcePropertyDto;
  title: string;
}
