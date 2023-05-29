import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-or-edit-algorithm-relation-type-dialog',
  templateUrl: './add-or-edit-algorithm-relation-type-dialog.component.html',
  styleUrls: ['./add-or-edit-algorithm-relation-type-dialog.component.scss'],
})
export class AddOrEditAlgorithmRelationTypeDialogComponent implements OnInit {
  algorithmRelationTypeFormGroup: UntypedFormGroup;

  constructor(
    public dialogRef: MatDialogRef<
      AddOrEditAlgorithmRelationTypeDialogComponent
    >,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  get algorithmRelationTypeName(): AbstractControl | null {
    return this.algorithmRelationTypeFormGroup.get('algorithmRelationTypeName');
  }

  get inverseAlgorithmRelationTypeName(): AbstractControl | null {
    return this.algorithmRelationTypeFormGroup.get(
      'inverseAlgorithmRelationTypeName'
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.algorithmRelationTypeFormGroup = new UntypedFormGroup({
      algorithmRelationTypeName: new UntypedFormControl(this.data.name, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.maxLength(255),
      ]),
      inverseAlgorithmRelationTypeName: new UntypedFormControl(
        this.data.inverseTypeName,
        [
          // eslint-disable-next-line @typescript-eslint/unbound-method
          Validators.maxLength(255),
        ]
      ),
    });

    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.name = this.algorithmRelationTypeName.value;
      this.data.inverseTypeName = this.inverseAlgorithmRelationTypeName.value;
    });
  }

  isRequiredDataMissing(): boolean {
    return this.algorithmRelationTypeName.errors?.required;
  }
}

export interface DialogData {
  title: string;
  id: string;
  name: string;
  inverseTypeName: string;
}
