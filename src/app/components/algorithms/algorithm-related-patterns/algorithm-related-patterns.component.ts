import { Component, Input, OnInit } from '@angular/core';
import { AlgorithmDto } from 'api-atlas/models/algorithm-dto';
import { EntityModelPatternRelationDto } from 'api-atlas/models/entity-model-pattern-relation-dto';
import { PatternRelationTypeService } from 'api-atlas/services/pattern-relation-type.service';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import { PatternRelationTypeDto } from 'api-atlas/models/pattern-relation-type-dto';
import { PatternRelationDto } from 'api-atlas/models';
import { PatternControllerService } from 'api-patternpedia/services/pattern-controller.service';
import { EntityModelPattern } from 'api-patternpedia/models/entity-model-pattern';
import { EntityModelPatternLanguage } from 'api-patternpedia/models';
import { AddPatternRelationDialogComponent } from '../dialogs/add-pattern-relation-dialog.component';
import { UtilService } from '../../../util/util.service';
import { ConfirmDialogComponent } from '../../generics/dialogs/confirm-dialog.component';
import { UrlData } from '../../generics/data-list/data-list.component';
import { environment as Env } from '../../../../environments/environment';
import { GenericDataService } from '../../../util/generic-data.service';

@Component({
  selector: 'app-algorithm-related-patterns',
  templateUrl: './algorithm-related-patterns.component.html',
  styleUrls: ['./algorithm-related-patterns.component.scss'],
})
export class AlgorithmRelatedPatternsComponent implements OnInit {
  @Input() algorithm: AlgorithmDto;

  patternRelations: EntityModelPatternRelationDto[];
  tableObjects: PatternRelationTableObject[] = [];
  variableNames: string[] = ['patternName', 'patternType', 'description'];
  tableColumns: string[] = ['Pattern', 'Relation Type', 'Description'];
  externalLinkVariables: string[] = ['pattern'];

  constructor(
    private patternRelationTypeService: PatternRelationTypeService,
    private algorithmService: AlgorithmService,
    private patternService: PatternControllerService,
    private utilService: UtilService,
    private dataService: GenericDataService
  ) {}

  ngOnInit(): void {}

  getPatternRelations(params: {
    algorithmId: string;
    search?: string;
    page?: number;
    size?: number;
    sort?: string[];
  }): void {
    this.algorithmService
      .getPatternRelationsOfAlgorithm(params)
      .subscribe((relations) => {
        if (relations._embedded) {
          this.patternRelations = relations._embedded.patternRelations;
          this.generateTableObjects();
        } else {
          this.patternRelations = [];
          this.tableObjects = [];
        }
      });
  }

  createPatternRelation(patternRelationDto: PatternRelationDto): void {
    this.algorithmService
      .createPatternRelationForAlgorithm({
        algorithmId: this.algorithm.id,
        body: patternRelationDto,
      })
      .subscribe(() => {
        this.getPatternRelations({ algorithmId: this.algorithm.id });
        this.utilService.callSnackBar('Successfully created pattern relation');
      });
  }

  updatePatternRelation(
    relationId: string,
    patternRelationDto: PatternRelationDto
  ): void {
    this.algorithmService
      .updatePatternRelationOfAlgorithm({
        algorithmId: this.algorithm.id,
        patternRelationId: relationId,
        body: patternRelationDto,
      })
      .subscribe(() => {
        this.getPatternRelations({ algorithmId: this.algorithm.id });
        this.utilService.callSnackBar('Successfully updated pattern relation');
      });
  }

  onAddElement(): void {
    const dialogRef = this.utilService.createDialog(
      AddPatternRelationDialogComponent,
      {
        title: 'Add new pattern relation',
        algoId: this.algorithm.id,
      },
      '1000px'
    );

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        if (!dialogResult.patternRelationType.id) {
          this.patternRelationTypeService
            .createPatternRelationType({
              body: dialogResult.patternRelationType,
            })
            .subscribe((createdType) => {
              this.createPatternRelation(
                this.generatePatternRelationDto(
                  createdType,
                  dialogResult.description,
                  dialogResult.pattern,
                  undefined
                )
              );
            });
        } else {
          this.createPatternRelation(
            this.generatePatternRelationDto(
              dialogResult.patternRelationType,
              dialogResult.description,
              dialogResult.pattern,
              undefined
            )
          );
        }
      }
    });
  }

  onUpdateClicked(event: any): void {
    this.utilService
      .createDialog(
        AddPatternRelationDialogComponent,
        {
          title: 'Edit pattern relation',
          algoId: this.algorithm.id,
          pattern: event.pattern,
          patternObject: event.patternObject,
          description: event.description,
          patternRelationType: event.patternTypeObject,
        },
        '1000px'
      )
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          if (!dialogResult.patternRelationType.id) {
            this.patternRelationTypeService
              .createPatternRelationType({
                body: dialogResult.patternRelationType,
              })
              .subscribe((createdType) => {
                this.updatePatternRelation(
                  event.id,
                  this.generatePatternRelationDto(
                    createdType,
                    dialogResult.description,
                    dialogResult.pattern,
                    event.id
                  )
                );
              });
          } else {
            this.updatePatternRelation(
              event.id,
              this.generatePatternRelationDto(
                dialogResult.patternRelationType,
                dialogResult.description,
                dialogResult.pattern,
                event.id
              )
            );
          }
        }
      });
  }

  onDeleteElements(event): void {
    const dialogRef = this.utilService.createDialog(ConfirmDialogComponent, {
      title: 'Confirm Deletion',
      message:
        'Are you sure you want to delete the relations to the following pattern(s):',
      data: event.elements,
      variableName: 'patternName',
      yesButtonText: 'yes',
      noButtonText: 'no',
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        for (const relation of event.elements) {
          this.algorithmService
            .deletePatternRelationOfAlgorithm({
              algorithmId: this.algorithm.id,
              patternRelationId: relation.id,
            })
            .subscribe(() => {
              this.getPatternRelations({ algorithmId: this.algorithm.id });
              this.utilService.callSnackBar(
                'Successfully removed pattern relation'
              );
            });
        }
      }
    });
  }

  onDatalistConfigChanged(event): void {
    this.getPatternRelations({ algorithmId: this.algorithm.id });
  }

  onElementClicked(event): void {
    const encodedUri = encodeURI(
      Env.PATTERN_ATLAS_UI_URL +
        '/pattern-languages/' +
        encodeURIComponent(event.languageObject.uri) +
        '/' +
        encodeURIComponent(event.pattern)
    );
    window.open(encodedUri, '_blank');
  }

  onUrlClicked(urlData: UrlData): void {
    // No check needed since pattern-relations have only one url-field called 'pattern'
    window.open(urlData.element['pattern'], '_blank');
  }

  generateTableObjects(): void {
    this.tableObjects = [];
    for (const relation of this.patternRelations) {
      this.getPattern(relation);
    }
  }

  getPattern(relation: PatternRelationDto): void {
    this.patternService
      .getPatternByUri({ encodedUri: relation.pattern })
      .subscribe((pattern) => {
        this.getPatternLanguage(relation, pattern);
      });
  }

  getPatternLanguage(
    relation: PatternRelationDto,
    pattern: EntityModelPattern
  ): void {
    const languageUrl = JSON.parse(JSON.stringify(pattern._links))
      .patternLanguage.href;
    this.dataService.getData(languageUrl).subscribe((language) => {
      this.tableObjects.push({
        id: relation.id,
        description: relation.description,
        patternType: relation.patternRelationType.name,
        pattern: relation.pattern,
        patternTypeObject: relation.patternRelationType,
        patternObject: pattern,
        languageObject: language,
        patternName: pattern.name,
      });
    });
  }

  generatePatternRelationDto(
    patternRelationType: PatternRelationTypeDto,
    description: string,
    pattern: string,
    id: string
  ): PatternRelationDto {
    return {
      id,
      algorithmId: this.algorithm.id,
      pattern,
      patternRelationType,
      description,
    };
  }
}

export interface PatternRelationTableObject {
  id: string;
  patternType: string;
  description: string;
  pattern: string;
  patternTypeObject: PatternRelationTypeDto;
  patternObject: EntityModelPattern;
  languageObject: EntityModelPatternLanguage;
  patternName: string;
}
