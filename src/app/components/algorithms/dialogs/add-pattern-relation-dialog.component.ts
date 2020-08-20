import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import { EntityModelPatternRelationTypeDto } from 'api-atlas/models/entity-model-pattern-relation-type-dto';
import { PatternRelationTypeService } from 'api-atlas/services/pattern-relation-type.service';
import { PatternRelationTypeDto } from 'api-atlas/models/pattern-relation-type-dto';
import { PatternLanguage } from 'api-patternpedia/models/pattern-language';
import { Pattern } from 'api-patternpedia/models/pattern';
import { PatternLanguageControllerService } from 'api-patternpedia/services/pattern-language-controller.service';

@Component({
  selector: 'app-add-pattern-relation-dialog',
  templateUrl: './add-pattern-relation-dialog.component.html',
  styleUrls: ['./add-pattern-relation-dialog.component.scss'],
})
export class AddPatternRelationDialogComponent implements OnInit {
  patternLanguageForm: FormGroup;
  patternForm: FormGroup;
  patternRelationForm: FormGroup;
  patternRelationTypes: EntityModelPatternRelationTypeDto[] = [];
  stateGroups: StateGroup[] = [];

  // Pattern Language fields
  patternLanguages: PatternLanguage[];
  selectedPatternLanguage: PatternLanguage = {};
  patternLanguageSearch = '';

  somePattern: Pattern;

  constructor(
    private algorithmService: AlgorithmService,
    private patternRelationTypeService: PatternRelationTypeService,
    private patternLanguageService: PatternLanguageControllerService,
    public dialogRef: MatDialogRef<AddPatternRelationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.patternLanguageForm = new FormGroup({
      patternLanguage: new FormControl(this.selectedPatternLanguage, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
      ]),
    });
    this.patternForm = new FormGroup({
      pattern: new FormControl(this.somePattern, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
      ]),
    });
    this.patternRelationForm = new FormGroup({
      relationType: new FormControl(this.data.patternRelationType, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
      ]),
      description: new FormControl(this.data.description, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
      ]),
    });

    this.getPatternLanguages();

    /* this.patternRelationForm = new FormGroup({
      description: new FormControl(this.data.description),
      // eslint-disable-next-line @typescript-eslint/unbound-method
      pattern: new FormControl(this.data.pattern, [Validators.required]),
      patternRelationType: new FormControl(this.data.patternRelationType, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
      ]),
    }); */

    // Fill PatternRelationType if dialog is used for editing
    if (this.data.patternRelationType) {
      this.setPatternRelationType(this.data.patternRelationType);
    }

    this.patternRelationTypeService
      .getPatternRelationTypes({})
      .subscribe((relationTypes) => {
        if (relationTypes._embedded) {
          this.patternRelationTypes =
            relationTypes._embedded.patternRelationTypes;
          this.stateGroups.push({
            optionName: 'Existing Relation-Types',
            patternRelationTypes: this.patternRelationTypes,
          });
          // Set filtered Types if update-dialog
          if (this.patternRelationType.value) {
            this.filterTypes(this.patternRelationType.value.name);
          }
        }
      });

    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.pattern = this.pattern.value;
      this.data.description = this.description.value;
      this.data.patternRelationType = this.generateRelationType(
        this.patternRelationType.value
      );
    });
  }

  getPatternLanguages(): void {
    this.patternLanguageService
      .getAllPatternLanguages()
      .subscribe((languages) => {
        // TODO: Check if this can be avoided
        const lng = JSON.parse(JSON.stringify(languages));

        this.patternLanguages = lng._embedded.patternLanguageModels;
        this.patternLanguages.push(this.patternLanguages[0]);
        this.patternLanguages.push(this.patternLanguages[0]);
        this.patternLanguages.push(this.patternLanguages[0]);
        this.patternLanguages.push(this.patternLanguages[0]);
        this.patternLanguages.push(this.patternLanguages[0]);
        console.log(this.patternLanguages);
      });
  }

  filterTypes(type: string): void {
    this.stateGroups[
      this.stateGroups.length - 1
    ].patternRelationTypes = this.patternRelationTypes.filter(
      (filterType) =>
        filterType.name.toLowerCase().indexOf(type.toLowerCase()) === 0
    );
  }

  generateRelationType(type): PatternRelationTypeDto {
    if (type && type.id) {
      return type;
    } else {
      return type && type.name
        ? this.findRelationTypeByName(type.name)
        : this.findRelationTypeByName(type);
    }
  }

  findRelationTypeByName(name): PatternRelationTypeDto {
    const foundType = this.patternRelationTypes.find((x) => x.name === name);
    return foundType ? foundType : { name };
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

  displayRelation(type: PatternRelationTypeDto): string {
    return type && type.name ? type.name : '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onPatternRelationInputChanged(): void {
    // Don't do anything if option selected
    const searchType = this.patternRelationType.value.name
      ? this.patternRelationType.value
      : { name: this.patternRelationType.value };
    // Filter existing types
    this.filterTypes(searchType.name);
    // Return Type from Input if it exists
    const existingRelationType = this.patternRelationTypes.find(
      (x) => x.name === searchType.name
    );
    // If searched type does not exist
    if (!existingRelationType && searchType.name) {
      // If pattern type does not exist and first element is existing type
      if (this.typesNotEmpty() || this.isFirstElementNew()) {
        this.pushNewRelationType(searchType);
      } else if (!this.isFirstElementNew()) {
        this.stateGroups[0].patternRelationTypes[0] = searchType;
      }
    } else {
      if (!this.isFirstElementNew()) {
        this.stateGroups.shift();
      }
    }
  }

  typesNotEmpty(): boolean {
    return !this.stateGroups[0];
  }

  isFirstElementNew(): boolean {
    return this.stateGroups[0].optionName !== 'New Relation-Type';
  }

  pushNewRelationType(type): void {
    this.stateGroups.unshift({
      optionName: 'New Relation-Type',
      patternRelationTypes: [type],
    });
  }

  isRequiredDataMissing(): boolean {
    return (
      this.pattern.errors?.required ||
      this.patternRelationType.errors?.required ||
      this.description.errors?.required
    );
  }

  onLanguageClick(language: PatternLanguage): void {
    if (language.id === this.selectedPatternLanguage.id) {
      this.selectedPatternLanguage = {};
    } else {
      this.selectedPatternLanguage = language;
    }
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
