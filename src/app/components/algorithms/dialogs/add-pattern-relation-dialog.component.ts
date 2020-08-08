import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlgorithmService } from 'api/services/algorithm.service';
import { EntityModelPatternRelationTypeDto } from 'api/models/entity-model-pattern-relation-type-dto';
import { PatternRelationTypeService } from 'api/services/pattern-relation-type.service';

@Component({
  selector: 'app-add-pattern-relation-dialog',
  templateUrl: './add-pattern-relation-dialog.component.html',
  styleUrls: ['./add-pattern-relation-dialog.component.scss'],
})
export class AddPatternRelationDialogComponent implements OnInit {
  patternRelationForm: FormGroup;
  patternRelationTypes: EntityModelPatternRelationTypeDto[] = [];
  stateGroups: StateGroup[] = [];
  typeInput = '';

  constructor(
    private algorithmService: AlgorithmService,
    private patternRelationTypeService: PatternRelationTypeService,
    public dialogRef: MatDialogRef<AddPatternRelationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.patternRelationForm = new FormGroup({
      description: new FormControl(this.data.description),
      // eslint-disable-next-line @typescript-eslint/unbound-method
      pattern: new FormControl(this.data.pattern, [Validators.required]),
      patternRelationType: new FormControl(this.data.patternRelationType, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
      ]),
      patternRelationInput: new FormControl(this.typeInput),
    });

    // Fill PatternRelationType if dialog is used for editing
    if (this.data.patternRelationType) {
      this.setPatternRelationInput(this.data.patternRelationType.name);
      this.setPatternRelationType(this.data.patternRelationType);
    }

    this.patternRelationTypeService
      .getPatternRelationTypes({})
      .subscribe((relationTypes) => {
        if (relationTypes._embedded) {
          this.patternRelationTypes =
            relationTypes._embedded.patternRelationTypes;
          this.stateGroups.push({
            optionName: 'Existing Pattern-Relations',
            patternRelationTypes: this.patternRelationTypes,
          });
        }
      });

    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.pattern = this.pattern.value;
      this.data.description = this.description.value;
      this.data.patternRelationType = this.patternRelationType.value;
    });
  }

  get pattern(): AbstractControl | null {
    return this.patternRelationForm.get('pattern');
  }

  setPatternRelationType(value): void {
    this.patternRelationForm.get('patternRelationType').setValue(value);
  }

  get patternRelationType(): AbstractControl | null {
    return this.patternRelationForm.get('patternRelationType');
  }

  get description(): AbstractControl | null {
    return this.patternRelationForm.get('description');
  }

  get patternRelationInput(): AbstractControl | null {
    return this.patternRelationForm.get('patternRelationInput');
  }

  setPatternRelationInput(value: string): void {
    this.patternRelationForm.get('patternRelationInput').setValue(value);
  }

  displayRelation(type): string {
    if (type && !type.name) {
      return type;
    } else if (type && type.name) {
      return type.name;
    } else {
      return '';
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onPatternRelationInputChanged(): void {
    // Don't do anything if option selected
    if (typeof this.patternRelationInput.value !== 'string') {
      return;
    }
    // Return Type from Input if it exists
    const existingRelationType = this.patternRelationTypes.find(
      (x) => x.name === this.patternRelationInput.value
    );
    // If Input-Field not empty and input type does not exist
    if (!existingRelationType && this.patternRelationInput.value) {
      // If pattern type does not exist and first element is existing type
      if (
        !this.stateGroups[0] ||
        this.stateGroups[0].optionName !== 'New Pattern-Relation'
      ) {
        this.stateGroups.unshift({
          optionName: 'New Pattern-Relation',
          patternRelationTypes: [
            {
              name: this.patternRelationInput.value,
            },
          ],
        });
        this.setPatternRelationType(
          this.stateGroups[0].patternRelationTypes[0]
        );
      } else if (this.stateGroups[0].optionName === 'New Pattern-Relation') {
        this.stateGroups[0].patternRelationTypes[0].name = this.patternRelationInput.value;
        this.setPatternRelationType(
          this.stateGroups[0].patternRelationTypes[0]
        );
      } else {
      }
    } else {
      if (this.stateGroups[0].optionName === 'New Pattern-Relation') {
        this.stateGroups.shift();
        this.setPatternRelationType(existingRelationType);
      }
    }
  }

  isRequiredDataMissing(): boolean {
    return (
      this.pattern.errors?.required ||
      this.patternRelationType.errors?.required ||
      this.description.errors?.required
    );
  }
}

export interface DialogData {
  title: string;
  algoId: string;
  pattern: string;
  patternRelationType: EntityModelPatternRelationTypeDto;
  description: string;
}

export interface StateGroup {
  optionName: string;
  patternRelationTypes: EntityModelPatternRelationTypeDto[];
}
