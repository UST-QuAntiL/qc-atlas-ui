import { Component, OnInit } from '@angular/core';
import { PatternRelationTypeService } from 'api-atlas/services/pattern-relation-type.service';
import { PatternRelationTypeDto } from 'api-atlas/models/pattern-relation-type-dto';
import { PagePatternRelationTypeDto } from 'api-atlas/models/page-pattern-relation-type-dto';
import { forkJoin } from 'rxjs';
import { UtilService } from '../../../util/util.service';
// eslint-disable-next-line max-len
import { AddOrEditPatternRelationTypeDialogComponent } from '../dialogs/add-or-edit-pattern-relation-type-dialog/add-or-edit-pattern-relation-type-dialog.component';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../generics/dialogs/confirm-dialog.component';
import { PaginatorConfig } from '../../../util/paginatorConfig';
import { PagingInfo } from '../../../util/PagingInfo';
import { QueryParams } from '../../generics/data-list/data-list.component';

@Component({
  selector: 'app-pattern-relation-types-list',
  templateUrl: './pattern-relation-types-list.component.html',
  styleUrls: ['./pattern-relation-types-list.component.scss'],
})
export class PatternRelationTypesListComponent implements OnInit {
  patternRelationTypes: PatternRelationTypeDto[] = [];
  tableColumns = ['Name'];
  variableNames = ['name'];
  pagingInfo: PagingInfo = {};
  paginatorConfig: PaginatorConfig = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };

  constructor(
    private patternRelationTypeService: PatternRelationTypeService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {}

  getPatternRelationTypes(params: QueryParams): void {
    this.patternRelationTypeService.getPatternRelationTypes(params).subscribe(
      (data) => {
        this.preparePatternRelationTypeData(data);
      },
      () => {
        this.utilService.callSnackBar(
          'Error! Pattern relation types could not be retrieved.'
        );
      }
    );
  }

  preparePatternRelationTypeData(data): void {
    // Read all incoming data
    if (data.content) {
      this.patternRelationTypes = data.content;
    } else {
      this.patternRelationTypes = [];
    }
    this.pagingInfo.totalPages = data.totalPages;
    this.pagingInfo.totalElements = data.totalElements;
    this.pagingInfo.number = data.number;
    this.pagingInfo.size = data.size;
    this.pagingInfo.sort = data.sort;
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
        const algorithmRelationType: PatternRelationTypeDto = {
          id: undefined,
          name: dialogResult.name,
        };

        params.body = algorithmRelationType;
        this.patternRelationTypeService
          .createPatternRelationType(params)
          .subscribe(
            () => {
              const correctPage = this.utilService.getLastPageAfterCreation(
                this.pagingInfo,
                1
              );
              this.getPatternRelationTypes({
                size: this.pagingInfo.size,
                page: correctPage,
                sort: this.pagingInfo.sort,
              });
              this.utilService.callSnackBar(
                'Successfully created pattern relation type.'
              );
            },
            () => {
              this.utilService.callSnackBar(
                'Error! Pattern relation type could not be created.'
              );
            }
          );
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
                .then(() => {
                  successfulDeletions++;
                  snackbarMessages.push(
                    'Successfully deleted pattern relation type "' +
                      patternRelationType.name +
                      '".'
                  );
                })
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
              event.queryParams.page--;
            }
            this.getPatternRelationTypes(event.queryParams);
            snackbarMessages.push(
              this.utilService.generateFinishingSnackbarMessage(
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

  onEditElement(event: PatternRelationTypeDto): void {
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
        const updatedPatternRelationType: PatternRelationTypeDto = {
          id: dialogResult.id,
          name: dialogResult.name,
        };

        const params: any = {
          patternRelationTypeId: updatedPatternRelationType.id,
          body: updatedPatternRelationType,
        };
        this.patternRelationTypeService
          .updatePatternRelationType(params)
          .subscribe(
            () => {
              this.getPatternRelationTypes({
                size: this.pagingInfo.size,
                page: this.pagingInfo.number,
                sort: this.pagingInfo.sort,
              });
              this.utilService.callSnackBar(
                'Successfully updated pattern relation type.'
              );
            },
            () => {
              this.utilService.callSnackBar(
                'Error! Pattern relation type could not be updated.'
              );
            }
          );
      }
    });
  }
}
