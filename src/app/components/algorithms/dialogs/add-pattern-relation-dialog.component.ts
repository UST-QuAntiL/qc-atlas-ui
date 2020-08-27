import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import { PatternRelationTypeService } from 'api-atlas/services/pattern-relation-type.service';
import { PatternRelationTypeDto } from 'api-atlas/models/pattern-relation-type-dto';
import { PatternLanguage } from 'api-patternpedia/models/pattern-language';
import { Pattern } from 'api-patternpedia/models/pattern';
import { PatternLanguageControllerService } from 'api-patternpedia/services/pattern-language-controller.service';
import { PatternControllerService } from 'api-patternpedia/services/pattern-controller.service';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { EntityModelPatternModel } from 'api-patternpedia/models/entity-model-pattern-model';

@Component({
  selector: 'app-add-pattern-relation-dialog',
  templateUrl: './add-pattern-relation-dialog.component.html',
  styleUrls: ['./add-pattern-relation-dialog.component.scss'],
})
export class AddPatternRelationDialogComponent implements OnInit {
  // Pattern Language fields
  patternLanguages: PatternLanguage[] = [];
  filteredPatternLanguages: PatternLanguage[] = [];
  selectedPatternLanguage: PatternLanguage = undefined;
  patternLanguageSearch = '';

  // Pattern fields
  patterns: EntityModelPatternModel[] = [];
  filteredPatterns: EntityModelPatternModel[] = [];
  selectedPattern: Pattern = undefined;
  patternSearch = '';

  // Description fields
  relationDescription = '';

  // Relation Type fields
  relationTypeGroups: StateGroup[] = [];
  relationTypes: PatternRelationTypeDto[] = [];
  selectedRelationType: PatternRelationTypeDto = undefined;
  relationTypeForm: FormGroup;

  // Loading fields
  arePatternLanguagesLoaded = false;
  arePatternsLoaded = false;
  areRelationTypesLoaded = false;

  isUpdateModal = false;

  constructor(
    private algorithmService: AlgorithmService,
    private patternRelationTypeService: PatternRelationTypeService,
    private patternLanguageService: PatternLanguageControllerService,
    private patternService: PatternControllerService,
    public dialogRef: MatDialogRef<AddPatternRelationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.relationTypeForm = new FormGroup({
      relationType: new FormControl(this.data.patternRelationType),
    });

    // Pre-Select values for update
    if (this.isAllDataAvailable()) {
      this.isUpdateModal = true;
      this.getRelationTypes();
      this.setRelationType(this.data.patternRelationType);
      this.relationDescription = this.data.description;
      this.selectedPattern = this.data.patternObject;
      // Define some PatternLanguage since it is not used during update
      this.selectedPatternLanguage = {};
    } else {
      this.getPatternLanguages();
    }

    this.dialogRef.beforeClosed().subscribe(() => {
      if (this.selectedPattern) {
        this.data.pattern = this.selectedPattern.uri;
      }
      this.data.patternRelationType = this.selectedRelationType;
      this.data.description = this.relationDescription;
    });
  }

  setRelationType(value): void {
    this.relationTypeForm.get('relationType').setValue(value);
    this.selectedRelationType = value;
  }

  get relationType(): AbstractControl | null {
    return this.relationTypeForm.get('relationType');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  isAllDataAvailable(): boolean {
    return !!(
      this.data.description &&
      this.data.patternRelationType &&
      this.data.pattern
    );
  }

  getPatternLanguages(): void {
    this.arePatternLanguagesLoaded = false;
    this.patternLanguageService
      .getAllPatternLanguageModels()
      .subscribe((languages) => {
        this.patternLanguages = languages._embedded.patternLanguageModels;
        this.filteredPatternLanguages = this.patternLanguages;
        this.arePatternLanguagesLoaded = true;
      });
  }

  getPatterns(patternLanguageId: string): void {
    this.arePatternsLoaded = false;
    this.patternService
      .getPatternsOfPatternLanguage({ patternLanguageId })
      .subscribe((patterns) => {
        this.patterns = patterns._embedded.patternModels;
        this.filteredPatterns = this.patterns;
        this.arePatternsLoaded = true;
      });
  }

  getRelationTypes(): void {
    this.areRelationTypesLoaded = false;
    this.patternRelationTypeService
      .getPatternRelationTypes({})
      .subscribe((relationTypes) => {
        if (relationTypes._embedded) {
          this.relationTypes = relationTypes._embedded.patternRelationTypes;
        }
        this.pushExistingRelationTypesToGroup();
        this.areRelationTypesLoaded = true;
      });
  }

  pushExistingRelationTypesToGroup(): void {
    const index = this.relationTypeGroups.findIndex(
      (group) => group.optionName === 'Existing Relation-Types'
    );

    if (index === -1) {
      this.relationTypeGroups.push({
        optionName: 'Existing Relation-Types',
        relationTypes: this.relationTypes,
      });
    } else {
      this.relationTypeGroups[index].relationTypes = this.relationTypes;
    }
  }

  displayRelation(type: PatternRelationTypeDto): string {
    return type && type.name ? type.name : '';
  }

  onLanguageClick(language: PatternLanguage): void {
    if (
      !this.selectedPatternLanguage ||
      language.id !== this.selectedPatternLanguage.id
    ) {
      this.selectedPatternLanguage = language;
    } else {
      this.selectedPatternLanguage = undefined;
    }
  }

  onLanguageSearch(): void {
    this.filteredPatternLanguages = [];
    if (!this.patternLanguageSearch) {
      this.filteredPatternLanguages = this.patternLanguages;
      return;
    }
    for (const language of this.patternLanguages) {
      if (
        language.name
          .toLowerCase()
          .includes(this.patternLanguageSearch.toLowerCase())
      ) {
        this.filteredPatternLanguages.push(language);
      }
    }
  }

  onPatternClick(pattern: Pattern): void {
    if (!this.selectedPattern || pattern.id !== this.selectedPattern.id) {
      this.selectedPattern = pattern;
    } else {
      this.selectedPattern = undefined;
    }
  }

  onPatternSearch(): void {
    this.filteredPatterns = [];
    if (!this.patternSearch) {
      this.filteredPatterns = this.patterns;
      return;
    }
    for (const pattern of this.patterns) {
      if (
        pattern.name.toLowerCase().includes(this.patternSearch.toLowerCase())
      ) {
        this.filteredPatterns.push(pattern);
      }
    }
  }

  onRelationTypeSearch(): void {
    const searchType = this.relationType.value.name
      ? this.relationType.value
      : { name: this.relationType.value };
    this.filterExistingRelationTypes(searchType.name);
    // Return Type from Input if it exists
    const existingRelationType = this.relationTypes.find(
      (x) => x.name === searchType.name
    );
    // If searched type does not exist
    this.selectedRelationType = existingRelationType
      ? existingRelationType
      : undefined;
    if (!existingRelationType && searchType.name) {
      // If pattern type does not exist and first element is existing type
      if (this.typesNotEmpty() || this.isFirstElementNew()) {
        this.pushNewRelationType(searchType);
      } else if (!this.isFirstElementNew()) {
        this.relationTypeGroups[0].relationTypes[0] = searchType;
      }
    } else {
      if (!this.isFirstElementNew()) {
        this.relationTypeGroups.shift();
      }
    }
  }

  filterExistingRelationTypes(searchType: string): void {
    const stateGroupLength = this.relationTypeGroups.length;
    this.relationTypeGroups[stateGroupLength - 1].relationTypes = [];
    if (!searchType) {
      this.relationTypeGroups[
        stateGroupLength - 1
      ].relationTypes = this.relationTypes;
    } else {
      for (const relationType of this.relationTypes) {
        if (
          relationType.name.toLowerCase().includes(searchType.toLowerCase())
        ) {
          this.relationTypeGroups[stateGroupLength - 1].relationTypes.push(
            relationType
          );
        }
      }
    }
  }

  typesNotEmpty(): boolean {
    return !this.relationTypeGroups[0];
  }

  isFirstElementNew(): boolean {
    return this.relationTypeGroups[0].optionName !== 'New Relation-Type';
  }

  pushNewRelationType(type: PatternRelationTypeDto): void {
    this.relationTypeGroups.unshift({
      optionName: 'New Relation-Type',
      relationTypes: [type],
    });
  }

  onRelationTypeFocusOut(): void {
    this.setRelationType('');
    this.selectedRelationType = undefined;
    if (this.relationTypeGroups.length === 2) {
      this.filterExistingRelationTypes('');
      this.relationTypeGroups.shift();
    }
  }

  stepperSelectionChanged(event: StepperSelectionEvent): void {
    if (!this.isUpdateModal && event.selectedIndex === 1) {
      this.getPatterns(this.selectedPatternLanguage.id);
    }
    if (
      (!this.isUpdateModal && event.selectedIndex === 2) ||
      (this.isUpdateModal && event.selectedIndex === 0)
    ) {
      this.getRelationTypes();
    }
  }
}

export interface DialogData {
  title: string;
  algoId: string;
  pattern?: string;
  patternObject?: Pattern;
  patternRelationType?: PatternRelationTypeDto;
  description?: string;
}

export interface StateGroup {
  optionName: string;
  relationTypes: PatternRelationTypeDto[];
}
