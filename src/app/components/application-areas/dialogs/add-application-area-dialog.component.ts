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
import { ApplicationAreasService } from 'api-atlas/services/application-areas.service';
import { EntityModelApplicationAreaDto } from 'generated/api-atlas/models';

@Component({
  selector: 'app-add-application-area-dialog',
  templateUrl: './add-application-area-dialog.component.html',
  styleUrls: ['./add-application-area-dialog.component.scss'],
})
export class AddApplicationAreaDialogComponent implements OnInit {
  applicationAreaControl: FormControl = new FormControl();
  applicationAreaForm: FormGroup;

  existingApplicationAreas: EntityModelApplicationAreaDto[];
  filteredApplicationAreas: EntityModelApplicationAreaDto[];

  constructor(
    private applicationAreaService: ApplicationAreasService,
    public dialogRef: MatDialogRef<AddApplicationAreaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog
  ) {}

  get name(): AbstractControl | null {
    return this.applicationAreaForm.get('name');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.applicationAreaControl = new FormControl(this.data.name, [
      // eslint-disable-next-line @typescript-eslint/unbound-method
      Validators.required,
      Validators.maxLength(255),
    ]);
    this.applicationAreaForm = new FormGroup({
      name: this.applicationAreaControl,
    });
    this.applicationAreaService.getApplicationAreas().subscribe((types) => {
      if (types._embedded) {
        this.existingApplicationAreas = types._embedded.applicationAreas;
      } else {
        this.existingApplicationAreas = [];
      }
    });

    this.applicationAreaControl.valueChanges.subscribe((value) => {
      this.filteredApplicationAreas = this.filterApplicationAreas(value);
    });

    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.name = this.name.value;
    });
  }

  isRequiredDataMissing(): boolean {
    return this.name.errors?.required;
  }

  onApplicationAreaSelect(type: EntityModelApplicationAreaDto): void {
    this.data.selectedApplicationArea = type;
  }

  filterApplicationAreas(value: string): EntityModelApplicationAreaDto[] {
    if (value == null) {
      return this.existingApplicationAreas;
    }
    return this.existingApplicationAreas.filter((type) =>
      type.name.toLowerCase().includes(value.toLowerCase())
    );
  }

  compareFn(
    c1: EntityModelApplicationAreaDto,
    c2: EntityModelApplicationAreaDto
  ): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
}

export interface DialogData {
  title: string;
  name: string;
  selectedApplicationArea: EntityModelApplicationAreaDto;
}
