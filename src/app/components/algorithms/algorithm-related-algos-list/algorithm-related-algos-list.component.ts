import { Component, Input, OnInit } from '@angular/core';
import { EntityModelAlgorithmDto } from 'api-atlas/models/entity-model-algorithm-dto';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import { EntityModelAlgorithmRelationDto } from 'api-atlas/models/entity-model-algorithm-relation-dto';
import { MatDialog } from '@angular/material/dialog';
import { AlgorithmRelationDto } from 'api-atlas/models/algorithm-relation-dto';
import { AlgorithmDto } from 'api-atlas/models/algorithm-dto';
import { AlgorithmRelationTypeService } from 'api-atlas/services/algorithm-relation-type.service';
import { Router } from '@angular/router';
import { AlgorithmRelationTypeDto } from 'api-atlas/models';
import { forkJoin } from 'rxjs';
import { UtilService } from '../../../util/util.service';
import { AddAlgorithmRelationDialogComponent } from '../dialogs/add-algorithm-relation-dialog.component';
import { ConfirmDialogComponent } from '../../generics/dialogs/confirm-dialog.component';
import { GenericDataService } from '../../../util/generic-data.service';

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
    private router: Router,
    private genericDataService: GenericDataService
  ) {}

  ngOnInit(): void {}

  getAlgorithmRelations(params: {
    algorithmId: string;
    search?: string;
    page?: number;
    size?: number;
    sort?: string[];
  }): void {
    this.algorithmService.getAlgorithmRelationsOfAlgorithm(params).subscribe(
      (relations) => {
        this.prepareRelations(relations);
      },
      () => {
        this.utilService.callSnackBar(
          'Error! Algorithm relations could not be retrieved.'
        );
      }
    );
  }

  getAlgorithmRelationsHateoas(url: string): void {
    this.genericDataService.getData(url).subscribe((relations) => {
      this.prepareRelations(relations);
    });
  }

  prepareRelations(relations): void {
    if (relations._embedded) {
      this.algorithmRelations = relations._embedded.algorithmRelations;
      this.generateTableObjects();
    } else {
      this.algorithmRelations = [];
      this.tableObjects = [];
    }
    this.pagingInfo.page = relations.page;
    this.pagingInfo._links = relations._links;
  }

  createAlgorithmRelation(algorithmRelationDto: AlgorithmRelationDto): void {
    this.algorithmService
      .createAlgorithmRelation({
        algorithmId: this.algorithm.id,
        body: algorithmRelationDto,
      })
      .subscribe(
        () => {
          this.getAlgorithmRelationsHateoas(
            this.utilService.getLastPageAfterCreation(
              this.pagingInfo._links.self.href,
              this.pagingInfo,
              1
            )
          );
          this.utilService.callSnackBar(
            'Algorithm Relation was successfully created.'
          );
        },
        () => {
          this.utilService.callSnackBar(
            'Error! Algorithm Relation could not be created.'
          );
        }
      );
  }

  updateAlgorithmRelation(
    relationId: string,
    algorithmRelationDto: AlgorithmRelationDto
  ): void {
    this.algorithmService
      .updateAlgorithmRelation({
        algorithmId: this.algorithm.id,
        algorithmRelationId: relationId,
        body: algorithmRelationDto,
      })
      .subscribe(
        () => {
          this.getAlgorithmRelationsHateoas(this.pagingInfo._links.self.href);
          this.utilService.callSnackBar(
            'Algorithm Relation was successfully updated.'
          );
        },
        () => {
          this.utilService.callSnackBar(
            'Error! Algorithm Relation could not be updated.'
          );
        }
      );
  }

  onAddElement(): void {
    this.utilService
      .createDialog(AddAlgorithmRelationDialogComponent, {
        title: 'Add new algorithm relation',
        algoId: this.algorithm.id,
        existingRelations: this.algorithmRelations,
        disableAlg: false,
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          if (!dialogResult.relationType.id) {
            this.algorithmRelationTypeService
              .createAlgorithmRelationType({ body: dialogResult.relationType })
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
    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'Confirm Deletion',
          message:
            'Are you sure you want to delete the following algorithm relation(s):',
          data: event.elements,
          variableName: 'targetAlgName',
          yesButtonText: 'yes',
          noButtonText: 'no',
        },
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          const unlinkTasks = [];
          const snackbarMessages = [];
          let successfulUnlinks = 0;
          for (const relation of event.elements) {
            unlinkTasks.push(
              this.algorithmService
                .deleteAlgorithmRelation({
                  algorithmId: this.algorithm.id,
                  algorithmRelationId: relation.id,
                })
                .toPromise()
                .then(() => {
                  successfulUnlinks++;
                  snackbarMessages.push(
                    'Successfully unlinked algorithm "' +
                      relation.targetAlgName +
                      '".'
                  );
                })
                .catch(() => {
                  snackbarMessages.push(
                    'Error! Could not unlink algorithm "' +
                      relation.targetAlgName +
                      '".'
                  );
                })
            );
          }
          forkJoin(unlinkTasks).subscribe(() => {
            if (
              this.utilService.isLastPageEmptyAfterDeletion(
                successfulUnlinks,
                this.tableObjects.length,
                this.pagingInfo
              )
            ) {
              this.getAlgorithmRelationsHateoas(
                this.pagingInfo._links.prev.href
              );
            } else {
              this.getAlgorithmRelationsHateoas(
                this.pagingInfo._links.self.href
              );
            }
            snackbarMessages.push(
              this.utilService.generateFinishingSnackbarMessage(
                successfulUnlinks,
                dialogResult.data.length,
                'algorithms',
                'unlinked'
              )
            );
            this.utilService.callSnackBarSequence(snackbarMessages);
          });
        }
      });
  }

  onDatalistConfigChanged(event): void {
    event.algorithmId = this.algorithm.id;
    this.getAlgorithmRelations(event);
  }

  onUpdateClicked(event): void {
    this.utilService
      .createDialog(AddAlgorithmRelationDialogComponent, {
        title: 'Update algorithm relation',
        algoId: this.algorithm.id,
        algoRelationId: event.id,
        existingRelations: this.algorithmRelations,
        relationType: event.relationTypeObject,
        targetAlg: event.targetAlgObject,
        description: event.description,
        disableAlg: true,
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          if (!dialogResult.relationType.id) {
            this.algorithmRelationTypeService
              .createAlgorithmRelationType({ body: dialogResult.relationType })
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

  onElementClicked(event): void {
    // Open view related algorithm (only url-field)
    this.router
      .navigateByUrl('/', {
        skipLocationChange: true,
      })
      .then(() =>
        this.router.navigate(['algorithms', event.targetAlgObject.id])
      );
  }

  generateTableObjects(): void {
    this.tableObjects = [];
    for (const relation of this.algorithmRelations) {
      let targetAlgId: string;
      if (this.algorithm.id !== relation.targetAlgorithmId) {
        targetAlgId = relation.targetAlgorithmId;
      } else {
        targetAlgId = relation.sourceAlgorithmId;
      }
      this.algorithmService
        .getAlgorithm({ algorithmId: targetAlgId })
        .subscribe((algorithm) => {
          this.tableObjects.push({
            id: relation.id,
            description: relation.description,
            targetAlgName: algorithm.name,
            targetAlgObject: algorithm,
            relationTypeName: relation.algoRelationType.name,
            relationTypeObject: relation.algoRelationType,
          });
        });
    }
  }

  generateRelationDto(
    id: string,
    sourceAlgorithm: AlgorithmDto,
    targetAlgorithm: AlgorithmDto,
    algoRelationType: AlgorithmRelationTypeDto,
    description: string
  ): AlgorithmRelationDto {
    return {
      id,
      sourceAlgorithmId: sourceAlgorithm.id,
      targetAlgorithmId: targetAlgorithm.id,
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
  relationTypeObject: AlgorithmRelationTypeDto;
}
