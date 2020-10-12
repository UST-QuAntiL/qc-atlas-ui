import { Component, OnInit } from '@angular/core';
import { PatternRelationTypeService } from 'api-atlas/services/pattern-relation-type.service';
import { EntityModelPatternRelationTypeDto } from 'api-atlas/models/entity-model-pattern-relation-type-dto';
import { forkJoin } from 'rxjs';
import { GenericDataService } from '../../../util/generic-data.service';
import { UtilService } from '../../../util/util.service';
// eslint-disable-next-line max-len
import { AddOrEditPatternRelationTypeDialogComponent } from '../dialogs/add-or-edit-pattern-relation-type-dialog/add-or-edit-pattern-relation-type-dialog.component';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../generics/dialogs/confirm-dialog.component';

@Component({
  selector: 'app-pattern-relation-types-list',
  templateUrl: './pattern-relation-types-list.component.html',
  styleUrls: ['./pattern-relation-types-list.component.scss'],
})
export class PatternRelationTypesListComponent implements OnInit {
  patternRelationTypes: any[] = [];
  tableColumns = ['Name'];
  variableNames = ['name'];
  pagingInfo: any = {};
  paginatorConfig: any = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };

  constructor(
    private patternRelationTypeService: PatternRelationTypeService,
    private genericDataService: GenericDataService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {}

  getPatternRelationTypes(params: any): void {
    this.patternRelationTypeService
      .getPatternRelationTypes(params)
      .subscribe((data) => {
        this.preparePatternRelationTypeData(data);
      });
  }

  getPatternRelationTypesHateoas(url: string): void {
    this.genericDataService.getData(url).subscribe((data) => {
      this.preparePatternRelationTypeData(data);
    });
  }

  preparePatternRelationTypeData(data): void {
    // Read all incoming data
    if (data._embedded) {
      this.patternRelationTypes = data._embedded.patternRelationTypes;
    } else {
      this.patternRelationTypes = [];
    }
    this.pagingInfo.page = data.page;
    this.pagingInfo._links = data._links;
  }

  onAddElement(): void {
    const params: any = {};
    const dialogRef = this.utilService.createDialog(
      AddOrEditPatternRelationTypeDialogComponent,
      {
        title: 'Create new pattern relation type',
      }
    );

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        const algorithmRelationType: EntityModelPatternRelationTypeDto = {
          id: undefined,
          name: dialogResult.name,
        };

        params.body = algorithmRelationType;
        this.patternRelationTypeService
          .createPatternRelationType(params)
          .subscribe((data) => {
            this.getPatternRelationTypesHateoas(
              this.utilService.getLastPageAfterCreation(
                this.pagingInfo._links.self.href,
                this.pagingInfo
              )
            );
            this.utilService.callSnackBar(
              'Successfully added pattern relation type'
            );
          });
      }
    });
  }

  onDeleteElements(event): void {
    const dialogData: ConfirmDialogData = {
      title: 'Confirm Deletion',
      message:
        'Are you sure you want to delete the following pattern relation(s):',
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
          for (const patternRelationType of event.elements) {
            deletionTasks.push(
              this.patternRelationTypeService
                .deletePatternRelationType({
                  patternRelationTypeId: patternRelationType.id,
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
                this.patternRelationTypes.length,
                this.pagingInfo
              )
            ) {
              this.getPatternRelationTypesHateoas(
                this.pagingInfo._links.prev.href
              );
            } else {
              this.getPatternRelationTypesHateoas(
                this.pagingInfo._links.self.href
              );
            }
            snackbarMessages.push(
              this.utilService.generateFinalDeletionMessage(
                successfulDeletions,
                dialogResult.data.length,
                'pattern relation types'
              )
            );
            this.utilService.callSnackBarSequence(snackbarMessages);
          });
        }
      });
  }

  onEditElement(event: any): void {
    const dialogRef = this.utilService.createDialog(
      AddOrEditPatternRelationTypeDialogComponent,
      {
        title: 'Edit pattern relation type',
        id: event.id,
        name: event.name,
      }
    );

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        const updatedPatternRelationType: EntityModelPatternRelationTypeDto = {
          id: dialogResult.id,
          name: dialogResult.name,
        };

        const params: any = {
          patternRelationTypeId: updatedPatternRelationType.id,
          body: updatedPatternRelationType,
        };
        this.patternRelationTypeService
          .updatePatternRelationType(params)
          .subscribe((data) => {
            this.getPatternRelationTypesHateoas(
              this.pagingInfo._links.self.href
            );
            this.utilService.callSnackBar(
              'Successfully edited pattern relation type'
            );
          });
      }
    });
  }
}
