import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-or-edit-algorithm-relation-type-dialog',
  templateUrl: './add-or-edit-algorithm-relation-type-dialog.component.html',
  styleUrls: ['./add-or-edit-algorithm-relation-type-dialog.component.scss'],
})
export class AddOrEditAlgorithmRelationTypeDialogComponent implements OnInit {
  algorithmRelationTypeFormGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<
      AddOrEditAlgorithmRelationTypeDialogComponent
    >,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  get algorithmRelationTypeName(): AbstractControl | null {
    return this.algorithmRelationTypeFormGroup.get('algorithmRelationTypeName');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.algorithmRelationTypeFormGroup = new FormGroup({
      algorithmRelationTypeName: new FormControl(this.data.name, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.maxLength(255),
      ]),
    });

    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.name = this.algorithmRelationTypeName.value;
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
}
