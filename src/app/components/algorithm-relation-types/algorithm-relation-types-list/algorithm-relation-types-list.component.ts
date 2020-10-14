import { Component, OnInit } from '@angular/core';
import { AlgorithmRelationTypeService } from 'api-atlas/services/algorithm-relation-type.service';
import { EntityModelAlgorithmRelationTypeDto } from 'api-atlas/models/entity-model-algorithm-relation-type-dto';
import { forkJoin } from 'rxjs';
import { GenericDataService } from '../../../util/generic-data.service';
import { UtilService } from '../../../util/util.service';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../generics/dialogs/confirm-dialog.component';
// eslint-disable-next-line max-len
import { AddOrEditAlgorithmRelationTypeDialogComponent } from '../dialogs/add-or-edit-algorithm-relation-type-dialog/add-or-edit-algorithm-relation-type-dialog.component';

@Component({
  selector: 'app-algorithm-relation-types',
  templateUrl: './algorithm-relation-types-list.component.html',
  styleUrls: ['./algorithm-relation-types-list.component.scss'],
})
export class AlgorithmRelationTypesListComponent implements OnInit {
  algorithmRelationTypes: any[] = [];
  tableColumns = ['Name'];
  variableNames = ['name'];
  pagingInfo: any = {};
  paginatorConfig: any = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };

  constructor(
    private algorithmRelationTypeService: AlgorithmRelationTypeService,
    private genericDataService: GenericDataService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {}

  getAlgorithmRelationTypes(params: any): void {
    this.algorithmRelationTypeService
      .getAlgorithmRelationTypes(params)
      .subscribe((data) => {
        this.prepareAlgorithmRelationTypeData(data);
      });
  }

  getAlgorithmRelationTypesHateoas(url: string): void {
    this.genericDataService.getData(url).subscribe((data) => {
      this.prepareAlgorithmRelationTypeData(data);
    });
  }

  prepareAlgorithmRelationTypeData(data): void {
    // Read all incoming data
    if (data._embedded) {
      this.algorithmRelationTypes = data._embedded.algoRelationTypes;
    } else {
      this.algorithmRelationTypes = [];
    }
    this.pagingInfo.page = data.page;
    this.pagingInfo._links = data._links;
  }

  onAddElement(): void {
    const params: any = {};
    const dialogRef = this.utilService.createDialog(
      AddOrEditAlgorithmRelationTypeDialogComponent,
      {
        title: 'Create new algorithm relation type',
      }
    );

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        const algorithmRelationType: EntityModelAlgorithmRelationTypeDto = {
          id: undefined,
          name: dialogResult.name,
        };

        params.body = algorithmRelationType;
        this.algorithmRelationTypeService
          .createAlgorithmRelationType(params)
          .subscribe((data) => {
            this.getAlgorithmRelationTypesHateoas(
              this.utilService.getLastPageAfterCreation(
                this.pagingInfo._links.self.href,
                this.pagingInfo,
                1
              )
            );
            this.utilService.callSnackBar(
              'Successfully added algorithm relation type'
            );
          });
      }
    });
  }

  onDeleteElements(event): void {
    const dialogData: ConfirmDialogData = {
      title: 'Confirm Deletion',
      message:
        'Are you sure you want to delete the following algorithm relation type(s):',
      data: event.elements,
      variableName: 'name',
      yesButtonText: 'yes',
      noButtonText: 'no',
    };
    this.utilService
      .createDialog(ConfirmDialogComponent, dialogData)
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          const deletionTasks = [];
          const snackbarMessages = [];
          let successfulDeletions = 0;
          for (const algorithmRelationType of event.elements) {
            deletionTasks.push(
              this.algorithmRelationTypeService
                .deleteAlgorithmRelationType({
                  algorithmRelationTypeId: algorithmRelationType.id,
                })
                .toPromise()
                .then(() => successfulDeletions++)
                .catch((errorResponse) =>
                  snackbarMessages.push(JSON.parse(errorResponse.error).message)
                )
            );
          }
          forkJoin(deletionTasks).subscribe(() => {
            if (
              this.utilService.isLastPageEmptyAfterDeletion(
                successfulDeletions,
                this.algorithmRelationTypes.length,
                this.pagingInfo
              )
            ) {
              this.getAlgorithmRelationTypesHateoas(
                this.pagingInfo._links.prev.href
              );
            } else {
              this.getAlgorithmRelationTypesHateoas(
                this.pagingInfo._links.self.href
              );
            }
            snackbarMessages.push(
              this.utilService.generateFinalDeletionMessage(
                successfulDeletions,
                dialogResult.data.length,
                'algorithm relation types'
              )
            );
            this.utilService.callSnackBarSequence(snackbarMessages);
          });
        }
      });
  }

  onEditElement(event: any): void {
    const dialogRef = this.utilService.createDialog(
      AddOrEditAlgorithmRelationTypeDialogComponent,
      {
        title: 'Edit algorithm relation type',
        id: event.id,
        name: event.name,
      }
    );

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        const updatedAlgorithmRelationType: EntityModelAlgorithmRelationTypeDto = {
          id: dialogResult.id,
          name: dialogResult.name,
        };

        const params: any = {
          algorithmRelationTypeId: updatedAlgorithmRelationType.id,
          body: updatedAlgorithmRelationType,
        };
        this.algorithmRelationTypeService
          .updateAlgorithmRelationType(params)
          .subscribe((data) => {
            this.getAlgorithmRelationTypesHateoas(
              this.pagingInfo._links.self.href
            );
            this.utilService.callSnackBar(
              'Successfully edited algorithm relation type'
            );
          });
      }
    });
  }
}
