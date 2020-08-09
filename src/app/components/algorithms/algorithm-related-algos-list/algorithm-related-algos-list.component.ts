import { Component, Input, OnInit } from '@angular/core';
import { EntityModelAlgorithmDto } from 'api/models/entity-model-algorithm-dto';
import { AlgorithmService } from 'api/services/algorithm.service';
import { EntityModelAlgorithmRelationDto } from 'api/models/entity-model-algorithm-relation-dto';
import { MatDialog } from '@angular/material/dialog';
import { AlgorithmRelationDto } from 'api/models/algorithm-relation-dto';
import { AlgorithmDto } from 'api/models/algorithm-dto';
import { AlgoRelationTypeDto } from 'api/models/algo-relation-type-dto';
import { AlgorithmRelationTypeService } from 'api/services/algorithm-relation-type.service';
import { Router } from '@angular/router';
import { UtilService } from '../../../util/util.service';
import { AddAlgorithmRelationDialogComponent } from '../dialogs/add-algorithm-relation-dialog.component';
import { ConfirmDialogComponent } from '../../generics/dialogs/confirm-dialog.component';

@Component({
  selector: 'app-algorithm-related-algos-list',
  templateUrl: './algorithm-related-algos-list.component.html',
  styleUrls: ['./algorithm-related-algos-list.component.scss'],
})
export class AlgorithmRelatedAlgosListComponent implements OnInit {
  @Input() algorithm: EntityModelAlgorithmDto;

  tableObjects: AlgorithmRelationTableObject[];
  algorithmRelations: EntityModelAlgorithmRelationDto[];
  variableNames: string[] = [
    'targetAlgName',
    'relationTypeName',
    'description',
  ];
  tableColumns: string[] = ['Related Algorithm', 'Relation', 'Description'];
  pagingInfo: any = {};
  paginatorConfig: any = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };

  constructor(
    private dialog: MatDialog,
    private algorithmService: AlgorithmService,
    private algorithmRelationTypeService: AlgorithmRelationTypeService,
    private utilService: UtilService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  getAlgorithmRelations(params): void {
    this.algorithmService.getAlgorithmRelations(params).subscribe(
      (relations) => {
        if (relations._embedded) {
          this.algorithmRelations = relations._embedded.algorithmRelations;
          this.generateTableObjects();
        } else {
          this.algorithmRelations = [];
          this.tableObjects = [];
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  createAlgorithmRelation(body: AlgorithmRelationDto): void {
    this.algorithmService
      .addAlgorithmRelation({ algoId: this.algorithm.id, body })
      .subscribe((data) => {
        this.getAlgorithmRelations({ algoId: this.algorithm.id });
        this.utilService.callSnackBar(
          'Successfully created algorithm relation'
        );
      });
  }

  updateAlgorithmRelation(
    relationId: string,
    body: AlgorithmRelationDto
  ): void {
    this.algorithmService
      .updateAlgorithmRelation({
        algoId: this.algorithm.id,
        relationId,
        body,
      })
      .subscribe((data) => {
        this.getAlgorithmRelations({ algoId: this.algorithm.id });
        this.utilService.callSnackBar(
          'Successfully updated algorithm relation'
        );
      });
  }

  onAddElement(): void {
    const dialogRef = this.dialog.open(AddAlgorithmRelationDialogComponent, {
      width: '400px',
      data: {
        title: 'Add new algorithm relation',
        algoId: this.algorithm.id,
        existingRelations: this.algorithmRelations,
        disableAlg: false,
      },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        if (!dialogResult.relationType.id) {
          this.algorithmRelationTypeService
            .createAlgoRelationType({ body: dialogResult.relationType })
            .subscribe((createdType) => {
              this.createAlgorithmRelation(
                this.generateRelationDto(
                  null,
                  this.algorithm,
                  dialogResult.targetAlg,
                  createdType,
                  dialogResult.description
                )
              );
            });
        } else {
          this.createAlgorithmRelation(
            this.generateRelationDto(
              null,
              this.algorithm,
              dialogResult.targetAlg,
              dialogResult.relationType,
              dialogResult.description
            )
          );
        }
      }
    });
  }

  onDeleteElements(event): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Deletion',
        message:
          'Are you sure you want to delete ' +
          event.elements.length +
          ' algorithm relation(s)',
        yesButtonText: 'yes',
        noButtonText: 'no',
      },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        for (const relation of event.elements) {
          this.algorithmService
            .deleteAlgorithmRelation({
              algoId: this.algorithm.id,
              relationId: relation.id,
            })
            .subscribe((data) => {
              this.getAlgorithmRelations({ algoId: this.algorithm.id });
              this.utilService.callSnackBar(
                'Successfully removed algorithm relation(s)'
              );
            });
        }
      }
    });
  }

  onDatalistConfigChanged(event): void {
    this.getAlgorithmRelations({ algoId: this.algorithm.id });
  }

  onElementClicked(event): void {
    const dialogRef = this.dialog.open(AddAlgorithmRelationDialogComponent, {
      width: '400px',
      data: {
        title: 'Update algorithm relation',
        algoId: this.algorithm.id,
        algoRelationId: event.id,
        existingRelations: this.algorithmRelations,
        relationType: event.relationTypeObject,
        targetAlg: event.targetAlgObject,
        description: event.description,
        disableAlg: true,
      },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        if (!dialogResult.relationType.id) {
          this.algorithmRelationTypeService
            .createAlgoRelationType({ body: dialogResult.relationType })
            .subscribe((createdType) => {
              this.updateAlgorithmRelation(
                dialogResult.algoRelationId,
                this.generateRelationDto(
                  dialogResult.algoRelationId,
                  this.algorithm,
                  dialogResult.targetAlg,
                  createdType,
                  dialogResult.description
                )
              );
            });
        } else {
          this.updateAlgorithmRelation(
            dialogResult.algoRelationId,
            this.generateRelationDto(
              dialogResult.algoRelationId,
              this.algorithm,
              dialogResult.targetAlg,
              dialogResult.relationType,
              dialogResult.description
            )
          );
        }
      }
    });
  }

  //  TODO: Make onUrlClicked using other branch
  /* onElementClicked(event): void {
    // this.router.navigate(['algorithms', event.targetAlgObject.id]);
    this.router
      .navigateByUrl('/' + event.targetAlgObject.id, {
        skipLocationChange: true,
      })
      .then(() =>
        this.router.navigate(['algorithms/' + event.targetAlgObject.id])
      );
  } */

  generateTableObjects(): void {
    this.tableObjects = [];
    for (const relation of this.algorithmRelations) {
      let targetAlg: AlgorithmDto;
      if (this.algorithm.id !== relation.targetAlgorithm.id) {
        targetAlg = relation.targetAlgorithm;
      } else {
        targetAlg = relation.sourceAlgorithm;
      }
      this.tableObjects.push({
        id: relation.id,
        description: relation.description,
        targetAlgName: targetAlg.name,
        targetAlgObject: targetAlg,
        relationTypeName: relation.algoRelationType.name,
        relationTypeObject: relation.algoRelationType,
      });
    }
  }

  generateRelationDto(
    id: string,
    sourceAlgorithm: AlgorithmDto,
    targetAlgorithm: AlgorithmDto,
    algoRelationType: AlgoRelationTypeDto,
    description: string
  ): AlgorithmRelationDto {
    return {
      id,
      sourceAlgorithm,
      targetAlgorithm,
      algoRelationType,
      description,
    };
  }
}

export interface AlgorithmRelationTableObject {
  id: string;
  description: string;
  targetAlgName: string;
  targetAlgObject: AlgorithmDto;
  relationTypeName: string;
  relationTypeObject: AlgoRelationTypeDto;
}
