import { Component, Input, OnInit } from '@angular/core';
import { AlgorithmDto } from 'api-atlas/models/algorithm-dto';
import { EntityModelPatternRelationDto } from 'api-atlas/models/entity-model-pattern-relation-dto';
import { PatternRelationTypeService } from 'api-atlas/services/pattern-relation-type.service';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import { PatternRelationTypeDto } from 'api-atlas/models/pattern-relation-type-dto';
import { PatternRelationDto } from 'api-atlas/models';
import { PatternControllerService } from 'api-patternpedia/services/pattern-controller.service';
import { Pattern } from 'api-patternpedia/models/pattern';
import { EntityModelPattern } from 'api-patternpedia/models/entity-model-pattern';
import { EntityModelPatternLanguage } from 'api-patternpedia/models/entity-model-pattern-language';
import { AddPatternRelationDialogComponent } from '../dialogs/add-pattern-relation-dialog.component';
import { UtilService } from '../../../util/util.service';
import { ConfirmDialogComponent } from '../../generics/dialogs/confirm-dialog.component';
import { UrlData } from '../../generics/data-list/data-list.component';

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
    private utilService: UtilService
  ) {}

  ngOnInit(): void {}

  getPatternRelations(params): void {
    this.algorithmService.getPatternRelations(params).subscribe((relations) => {
      if (relations._embedded) {
        this.patternRelations = relations._embedded.patternRelations;
        this.generateTableObjects();
      } else {
        this.patternRelations = [];
        this.tableObjects = [];
      }
    });
  }

  createPatternRelation(body: PatternRelationDto): void {
    this.algorithmService
      .createPatternRelationByAlgorithm({ algoId: this.algorithm.id, body })
      .subscribe((data) => {
        this.getPatternRelations({ algoId: this.algorithm.id });
        this.utilService.callSnackBar('Successfully created pattern relation');
      });
  }

  updatePatternRelation(relationId: string, body: PatternRelationDto): void {
    this.algorithmService
      .updatePatternRelations({
        algoId: this.algorithm.id,
        relationId,
        body,
      })
      .subscribe((data) => {
        this.getPatternRelations({ algoId: this.algorithm.id });
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
            .deletePatternRelationByAlgorithm({
              algoId: this.algorithm.id,
              relationId: relation.id,
            })
            .subscribe((data) => {
              this.getPatternRelations({ algoId: this.algorithm.id });
              this.utilService.callSnackBar(
                'Successfully removed pattern relation'
              );
            });
        }
      }
    });
  }

  onDatalistConfigChanged(event): void {
    this.getPatternRelations({ algoId: this.algorithm.id });
  }

  onElementClicked(event): void {
    const dialogRef = this.utilService.createDialog(
      AddPatternRelationDialogComponent,
      {
        title: 'Edit pattern relation',
        algoId: this.algorithm.id,
        pattern: event.pattern,
        description: event.description,
        patternRelationType: event.patternTypeObject,
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
        console.log(pattern);
        this.tableObjects.push({
          id: relation.id,
          description: relation.description,
          patternType: relation.patternRelationType.name,
          pattern: relation.pattern,
          patternTypeObject: relation.patternRelationType,
          patternObject: pattern,
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
      algorithm: this.algorithm,
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
  patternName: string;
}
