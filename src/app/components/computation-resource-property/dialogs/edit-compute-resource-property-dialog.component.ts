import { Component, Inject, OnInit } from '@angular/core';
import { EntityModelComputingResourcePropertyDto } from 'api/models/entity-model-computing-resource-property-dto';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ComputingResourcePropertiesTypesService } from 'api/services/computing-resource-properties-types.service';
import { EntityModelComputingResourcePropertyTypeDto } from 'api/models/entity-model-computing-resource-property-type-dto';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Option } from '../../generics/property-input/select-input.component';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-edit-compute-resource-property-dialog',
  templateUrl: './edit-compute-resource-property-dialog.component.html',
  styleUrls: ['./edit-compute-resource-property-dialog.component.scss'],
})
export class EditComputeResourcePropertyDialogComponent implements OnInit {
  types: EntityModelComputingResourcePropertyTypeDto[] = [];
  typeNameControl = new FormControl();
  valueValidationControl = new FormControl();
  matcher = new ShowOnDirtyErrorStateMatcher();
  filteredTypes: Observable<EntityModelComputingResourcePropertyTypeDto[]>;

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

  typeName = '';
  typeDescription = '';
  typeDatatype: 'INTEGER' | 'STRING' | 'FLOAT' = 'FLOAT';

  propertyValue = '';
  valueInputInvalid = true;

  availableTypes: ValidatingOption[] = [
    {
      label: 'Float',
      value: 'FLOAT',
      validationFunc: (e): boolean =>
        // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
        e.length > 0 && e.match(/-?\d+\.\d+/) && !isNaN(parseFloat(e)),
    },
    {
      label: 'Integer',
      value: 'INTEGER',
      validationFunc: (e): boolean =>
        // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
        e.length > 0 && e.match(/^\d+$/) && !isNaN(parseInt(e, 10)),
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
    if (this.data.entity != null) {
      this.baseElement = this.data.entity;

      this.propertyValue = this.data.entity.value;
      this.typeName = this.data.entity.type.name;
      this.onTypeSelect(this.data.entity.type);
    }
    this.propertyTypeService
      // TODO find better solution to fetch all types available
      .getResourcePropertyTypes({ page: 0, size: 1000 })
      .subscribe((e) => {
        if (e._embedded != null) {
          this.types = e._embedded.computingResourcePropertyTypes;
        }
        this.filteredTypes = this.typeNameControl.valueChanges.pipe(
          startWith(''),
          map((value) => this._filter(value.toString().toLowerCase()))
        );
      });
  }

  onTypeSelect(type: EntityModelComputingResourcePropertyTypeDto): void {
    this.selectedType = type;
    this.typeDatatype = type.datatype;
    this.typeDescription = type.description;
    this.validateValueInput();
  }

  resetSelectedType(): void {
    if (this.selectedType != null) {
      this.selectedType = null;
      this.typeDescription = '';
      this.typeDatatype = 'FLOAT';
      this.valueInputInvalid = true;
    }
  }

  validateValueInput(): void {
    const validator = this.availableTypes.find(
      (e) => e.value === this.typeDatatype
    ).validationFunc;
    this.valueInputInvalid = !validator(this.propertyValue);
    if (this.valueInputInvalid) {
      this.valueValidationControl.markAsDirty();
    } else {
      this.valueValidationControl.markAsPristine();
    }
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

  private _filter(
    value: string
  ): EntityModelComputingResourcePropertyTypeDto[] {
    return this.types.filter(
      (type) =>
        type.name.includes(value) ||
        type.description.toLowerCase().includes(value)
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
