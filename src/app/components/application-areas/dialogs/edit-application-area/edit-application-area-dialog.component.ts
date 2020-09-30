import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApplicationAreasService } from 'api-atlas/services/application-areas.service';
import { EntityModelApplicationAreaDto } from 'api-atlas/models/entity-model-application-area-dto';

@Component({
  selector: 'app-edit-application-area-dialog',
  templateUrl: './edit-application-area-dialog.component.html',
  styleUrls: ['./edit-application-area-dialog.component.scss'],
})
export class EditApplicationAreaDialogComponent implements OnInit {
  applicationAreaFormGroup: FormGroup;
  existingApplicationAreas: EntityModelApplicationAreaDto[];

  constructor(
    private applicationAreaService: ApplicationAreasService,
    public dialogRef: MatDialogRef<EditApplicationAreaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  get applicationAreaName(): AbstractControl | null {
    return this.applicationAreaFormGroup.get('applicationAreaName');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.applicationAreaFormGroup = new FormGroup({
      oldApplicationAreaName: new FormControl(this.data.name),
      applicationAreaName: new FormControl(this.data.newName, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.maxLength(255),
      ]),
    });

    this.applicationAreaService.getApplicationAreas().subscribe((types) => {
      if (types._embedded) {
        this.existingApplicationAreas = types._embedded.applicationAreas;
      } else {
        this.existingApplicationAreas = [];
      }
    });

    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.newName = this.applicationAreaName.value;
    });
  }

  isRequiredDataMissing(): boolean {
    return this.applicationAreaName.errors?.required;
  }
}

export interface DialogData {
  title: string;
  name: string;
  newName?: string;
}
