import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProblemTypeService } from 'api-atlas/services/problem-type.service';
import { ProblemTypeDto } from 'api-atlas/models/problem-type-dto';
import { forkJoin } from 'rxjs';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../generics/dialogs/confirm-dialog.component';
import { UtilService } from '../../../util/util.service';
import { AddOrEditProblemTypeDialogComponent } from '../dialogs/add-or-edit-problem-type/add-or-edit-problem-type-dialog.component';
import { PaginatorConfig } from '../../../util/paginatorConfig';
import { PagingInfo } from '../../../util/PagingInfo';
import { QueryParams } from '../../generics/data-list/data-list.component';

@Component({
  selector: 'app-problem-types-list',
  templateUrl: './problem-types-list.component.html',
  styleUrls: ['./problem-types-list.component.scss'],
})
export class ProblemTypesListComponent implements OnInit {
  problemTypes: any[] = [];
  tableColumns = ['Name', 'Parent'];
  variableNames = ['name', 'parentProblemTypeName'];
  pagingInfo: PagingInfo<ProblemTypeDto> = {};
  paginatorConfig: PaginatorConfig = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };

  constructor(
    private problemTypeService: ProblemTypeService,
    private router: Router,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {}

  getProblemTypes(params: QueryParams): void {
    this.problemTypeService.getProblemTypes(params).subscribe(
      (data) => {
        this.prepareProblemTypeData(data);
      },
      () => {
        this.utilService.callSnackBar(
          'Error! Problem types could not be retrieved.'
        );
      }
    );
  }

  prepareProblemTypeData(data): void {
    // Read all incoming data
    if (data.content) {
      this.problemTypes = data.content;
      this.assignParentProblemTypeNames();
    } else {
      this.problemTypes = [];
    }
    this.pagingInfo.totalPages = data.totalPages;
    this.pagingInfo.totalElements = data.totalElements;
    this.pagingInfo.number = data.number;
    this.pagingInfo.size = data.size;
    this.pagingInfo.sort = data.sort;
  }

  assignParentProblemTypeNames(): void {
    for (const problemType of this.problemTypes) {
      if (problemType.parentProblemType != null) {
        this.problemTypeService
          .getProblemType({
            problemTypeId: problemType.parentProblemType,
          })
          .subscribe(
            (parent) => {
              problemType.parentProblemTypeName = parent.name;
            },
            () => {
              this.utilService.callSnackBar(
                'Error! Could not receive parent problem type.'
              );
            }
          );
      }
    }
  }

  onAddElement(): void {
    const dialogRef = this.utilService.createDialog(
      AddOrEditProblemTypeDialogComponent,
      {
        title: 'Create new problem type',
      }
    );

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        const problemTypeDto: ProblemTypeDto = {
          id: undefined,
          name: dialogResult.name,
        };
        if (dialogResult.parentProblemType) {
          problemTypeDto.parentProblemType = dialogResult.parentProblemType.id;
        }

        // params.body = problemTypeDto;
        this.problemTypeService
          .createProblemType({ body: problemTypeDto })
          .subscribe(
            () => {
              const correctPage = this.utilService.getLastPageAfterCreation(
                this.pagingInfo,
                1
              );
              this.getProblemTypes({
                size: this.pagingInfo.size,
                page: correctPage,
                sort: this.pagingInfo.sort,
              });
              this.utilService.callSnackBar(
                'Successfully created problem type.'
              );
            },
            () => {
              this.utilService.callSnackBar(
                'Error! Problem type could not be created.'
              );
            }
          );
      }
    });
  }

  onDeleteElements(event): void {
    const dialogData: ConfirmDialogData = {
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete the following problem type(s):',
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
          for (const problemType of event.elements) {
            deletionTasks.push(
              this.problemTypeService
                .deleteProblemType({
                  problemTypeId: problemType.id,
                })
                .toPromise()
                .then(() => {
                  successfulDeletions++;
                  snackbarMessages.push(
                    'Successfully deleted problem type "' +
                      problemType.name +
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
                this.problemTypes.length,
                this.pagingInfo
              )
            ) {
              event.queryParams.page--;
            }
            this.getProblemTypes(event.queryParams);
            snackbarMessages.push(
              this.utilService.generateFinishingSnackbarMessage(
                successfulDeletions,
                dialogResult.data.length,
                'problem types'
              )
            );
            this.utilService.callSnackBarSequence(snackbarMessages);
          });
        }
      });
  }

  onEditElement(event: ProblemTypeDto): void {
    let parentProblemTypeDto: ProblemTypeDto;
    for (const problemType of this.problemTypes) {
      if (problemType.id === event.parentProblemType) {
        parentProblemTypeDto = problemType;
      }
    }
    const dialogRef = this.utilService.createDialog(
      AddOrEditProblemTypeDialogComponent,
      {
        title: 'Edit problem type',
        id: event.id,
        name: event.name,
        parentProblemType: parentProblemTypeDto,
      }
    );

    dialogRef.afterClosed().subscribe(
      (dialogResult) => {
        if (dialogResult) {
          const updatedProblemType: ProblemTypeDto = {
            id: dialogResult.id,
            name: dialogResult.name,
            parentProblemType: dialogResult.parentProblemType
              ? dialogResult.parentProblemType.id
              : null,
          };
          this.problemTypeService
            .updateProblemType({
              problemTypeId: updatedProblemType.id,
              body: updatedProblemType,
            })
            .subscribe(() => {
              this.getProblemTypes({
                size: this.pagingInfo.size,
                page: this.pagingInfo.number,
                sort: this.pagingInfo.sort,
              });
              this.utilService.callSnackBar(
                'Successfully updated problem type.'
              );
            });
        }
      },
      () => {
        this.utilService.callSnackBar(
          'Error! Problem Type could not be updated.'
        );
      }
    );
  }
}
