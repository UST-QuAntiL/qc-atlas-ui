import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// eslint-disable-next-line max-len
import { DialogData } from '../../../algorithm-relation-types/dialogs/add-or-edit-algorithm-relation-type-dialog/add-or-edit-algorithm-relation-type-dialog.component';

@Component({
  selector: 'app-add-or-edit-pattern-relation-type-dialog',
  templateUrl: './add-or-edit-pattern-relation-type-dialog.component.html',
  styleUrls: ['./add-or-edit-pattern-relation-type-dialog.component.scss'],
})
export class AddOrEditPatternRelationTypeDialogComponent implements OnInit {
  patternRelationTypeFormGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddOrEditPatternRelationTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  get patternRelationTypeName(): AbstractControl | null {
    return this.patternRelationTypeFormGroup.get('patternRelationTypeName');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.patternRelationTypeFormGroup = new FormGroup({
      patternRelationTypeName: new FormControl(this.data.name, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.maxLength(255),
      ]),
    });

    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.name = this.patternRelationTypeName.value;
    });
  }

  isRequiredDataMissing(): boolean {
    return this.patternRelationTypeName.errors?.required;
  }
}
