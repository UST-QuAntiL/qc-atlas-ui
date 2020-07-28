import { Component, Input, OnInit } from '@angular/core';
import { AlgorithmDto } from 'api/models/algorithm-dto';
import { EntityModelPatternRelationDto } from 'api/models/entity-model-pattern-relation-dto';
import { MatDialog } from '@angular/material/dialog';
import { PatternRelationTypeService } from 'api/services/pattern-relation-type.service';
import { AlgorithmService } from 'api/services/algorithm.service';
import { PatternRelationTypeDto } from 'api/models/pattern-relation-type-dto';
import { PatternRelationDto } from 'api/models';
import { AddPatternRelationDialogComponent } from '../dialogs/add-pattern-relation-dialog.component';

@Component({
  selector: 'app-algorithm-related-patterns',
  templateUrl: './algorithm-related-patterns.component.html',
  styleUrls: ['./algorithm-related-patterns.component.scss'],
})
export class AlgorithmRelatedPatternsComponent implements OnInit {
  @Input() algorithm: AlgorithmDto;

  patternRelations: EntityModelPatternRelationDto[];
  tableObjects: PatternRelationTableObject[] = [];
  variableNames: string[] = ['description', 'pattern', 'patternType'];
  tableColumns: string[] = ['Description', 'Link', 'Pattern']; // 'Name', 'Type', 'Relation'
  externalLinkVariables: string[] = ['pattern'];

  constructor(
    private dialog: MatDialog,
    private patternRelationTypeService: PatternRelationTypeService,
    private algorithmService: AlgorithmService
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
      .createPatternRelation({ algoId: this.algorithm.id, body })
      .subscribe((data) => {
        this.getPatternRelations({ algoId: this.algorithm.id });
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
      });
  }

  onAddElement(): void {
    const dialogRef = this.dialog.open(AddPatternRelationDialogComponent, {
      width: '400px',
      data: { title: 'Add new pattern relation', algoId: this.algorithm.id },
    });

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
                  dialogResult.pattern
                )
              );
            });
        } else {
          this.createPatternRelation(
            this.generatePatternRelationDto(
              dialogResult.patternRelationType,
              dialogResult.description,
              dialogResult.pattern
            )
          );
        }
      }
    });
  }

  onDeleteElements(event): void {
    for (const relation of event.elements) {
      this.algorithmService
        .deletePatternRelation({
          algoId: this.algorithm.id,
          relationId: relation.id,
        })
        .subscribe((data) => {
          this.getPatternRelations({ algoId: this.algorithm.id });
        });
    }
  }

  onDatalistConfigChanged(event): void {
    this.getPatternRelations({ algoId: this.algorithm.id });
  }

  onElementClicked(event): void {
    const dialogRef = this.dialog.open(AddPatternRelationDialogComponent, {
      width: '400px',
      data: {
        title: 'Edit pattern relation',
        algoId: this.algorithm.id,
        pattern: event.pattern,
        description: event.description,
        patternRelationType: event.patternTypeObject,
      },
    });

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
                  dialogResult.pattern
                )
              );
            });
        } else {
          this.updatePatternRelation(
            event.id,
            this.generatePatternRelationDto(
              dialogResult.patternRelationType,
              dialogResult.description,
              dialogResult.pattern
            )
          );
        }
      }
    });
  }

  generateTableObjects(): void {
    this.tableObjects = [];
    for (const relation of this.patternRelations) {
      this.tableObjects.push({
        id: relation.id,
        description: relation.description,
        patternType: relation.patternRelationType.name,
        pattern: relation.pattern,
        patternTypeObject: relation.patternRelationType,
      });
    }
  }

  generatePatternRelationDto(
    patternRelationType: PatternRelationTypeDto,
    description: string,
    pattern: string
  ): PatternRelationDto {
    return {
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
}
