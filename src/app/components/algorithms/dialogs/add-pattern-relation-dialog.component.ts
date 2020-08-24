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
  patterns: Pattern[] = [];
  filteredPatterns: Pattern[] = [];
  selectedPattern: Pattern = undefined;
  patternSearch = '';

  // Description fields
  relationDescription = '';

  // Relation Type fields
  relationTypeGroups: StateGroup[] = [];
  relationTypes: PatternRelationTypeDto[] = [];
  selectedRelationType: PatternRelationTypeDto = undefined;
  relationTypeSearch: any = '';

  // Loading fields
  arePatternLanguagesLoaded = false;
  arePatternsLoaded = false;
  areRelationTypesLoaded = false;

  constructor(
    private algorithmService: AlgorithmService,
    private patternRelationTypeService: PatternRelationTypeService,
    private patternLanguageService: PatternLanguageControllerService,
    private patternService: PatternControllerService,
    public dialogRef: MatDialogRef<AddPatternRelationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.getPatternLanguages();

    // TODO: Check if endpoint can be added to get pattern + pattern via pattern-uri
    /* if (this.isAllDataAvailable()) {
      this.relationDescription = this.data.description;
      this.selectedRelationType = this.data.patternRelationType;
      this.relationTypeSearch = this.data.patternRelationType.name;
    } */

    this.dialogRef.beforeClosed().subscribe(() => {
      if (this.selectedPattern) {
        this.data.pattern = this.selectedPattern.uri;
      }
      this.data.patternRelationType = this.selectedRelationType;
      this.data.description = this.relationDescription;
    });
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
      .getAllPatternLanguages()
      .subscribe((languages) => {
        // TODO: Check if this can be avoided
        const lng = JSON.parse(JSON.stringify(languages));
        this.patternLanguages = lng._embedded.patternLanguageModels;
        this.filteredPatternLanguages = this.patternLanguages;
        this.arePatternLanguagesLoaded = true;
      });
  }

  getPatterns(patternLanguageId: string): void {
    this.arePatternsLoaded = false;
    this.patternService
      .getPatternsOfPatternLanguage({ patternLanguageId })
      .subscribe((patterns) => {
        // TODO: Check if this can be avoided
        const pat = JSON.parse(JSON.stringify(patterns));
        this.patterns = pat._embedded.patternModels;
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

    console.log(index);

    if (index === -1) {
      this.relationTypeGroups.push({
        optionName: 'Existing Relation-Types',
        relationTypes: this.relationTypes,
      });
      console.log(this.relationTypeGroups.length);
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
    const searchType = this.relationTypeSearch.name
      ? this.relationTypeSearch
      : { name: this.relationTypeSearch };
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

  setRelationType(type: PatternRelationTypeDto): void {
    this.selectedRelationType = type;
  }

  onRelationTypeFocusOut(): void {
    this.relationTypeSearch = '';
    if (this.relationTypeGroups.length === 2) {
      this.filterExistingRelationTypes('');
      this.relationTypeGroups.shift();
    }
  }

  stepperSelectionChanged(event: StepperSelectionEvent): void {
    if (event.selectedIndex === 1) {
      this.getPatterns(this.selectedPatternLanguage.id);
    }
    if (event.selectedIndex === 2) {
      this.getRelationTypes();
    }
  }
}

export interface DialogData {
  title: string;
  algoId: string;
  pattern: string;
  patternRelationType: PatternRelationTypeDto;
  description: string;
}

export interface StateGroup {
  optionName: string;
  relationTypes: PatternRelationTypeDto[];
}
