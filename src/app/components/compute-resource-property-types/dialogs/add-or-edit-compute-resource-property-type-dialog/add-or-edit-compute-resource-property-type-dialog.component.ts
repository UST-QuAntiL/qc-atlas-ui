import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-or-edit-compute-resource-property-type-dialog',
  templateUrl:
    './add-or-edit-compute-resource-property-type-dialog.component.html',
  styleUrls: [
    './add-or-edit-compute-resource-property-type-dialog.component.scss',
  ],
})
export class AddOrEditComputeResourcePropertyTypeDialogComponent
  implements OnInit {
  computeResourcePropertyTypeFormGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<
      AddOrEditComputeResourcePropertyTypeDialogComponent
    >,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  get computeResourcePropertyTypeName(): AbstractControl | null {
    return this.computeResourcePropertyTypeFormGroup.get(
      'computeResourcePropertyTypeName'
    );
  }

  get computeResourcePropertyTypeDataType(): AbstractControl | null {
    return this.computeResourcePropertyTypeFormGroup.get(
      'computeResourcePropertyTypeDataType'
    );
  }

  get computeResourcePropertyTypeDescription(): AbstractControl | null {
    return this.computeResourcePropertyTypeFormGroup.get(
      'computeResourcePropertyTypeDescription'
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.computeResourcePropertyTypeFormGroup = new FormGroup({
      computeResourcePropertyTypeName: new FormControl(this.data.name, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.maxLength(255),
      ]),
      computeResourcePropertyTypeDataType: new FormControl(this.data.datatype, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
      ]),
      computeResourcePropertyTypeDescription: new FormControl(
        this.data.description
      ),
    });

    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.name = this.computeResourcePropertyTypeName.value;
      this.data.datatype = this.computeResourcePropertyTypeDataType.value;
      this.data.description = this.computeResourcePropertyTypeDescription.value;
    });
  }

  isRequiredDataMissing(): boolean {
    return (
      this.computeResourcePropertyTypeName.errors?.required ||
      this.computeResourcePropertyTypeDataType.errors?.required
    );
  }
}

export interface DialogData {
  title: string;
  id?: string;
  name?: string;
  datatype?: any;
  description?: string;
}
