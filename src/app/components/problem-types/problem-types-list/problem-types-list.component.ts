import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProblemTypeService } from 'api-atlas/services/problem-type.service';
import { EntityModelProblemTypeDto } from 'api-atlas/models/entity-model-problem-type-dto';
import { AlgorithmDto } from 'api-atlas/models/algorithm-dto';
import { ProblemTypeDto } from 'api-atlas/models/problem-type-dto';
import { forkJoin } from 'rxjs';
import { GenericDataService } from '../../../util/generic-data.service';
import { AddProblemTypeDialogComponent } from '../dialogs/add-problem-type/add-problem-type-dialog.component';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../generics/dialogs/confirm-dialog.component';
import { UtilService } from '../../../util/util.service';
import { AddAlgorithmDialogComponent } from '../../algorithms/dialogs/add-algorithm-dialog.component';
import { EditProblemTypeDialogComponent } from '../dialogs/edit-problem-type/edit-problem-type-dialog.component';

@Component({
  selector: 'app-problem-types-list',
  templateUrl: './problem-types-list.component.html',
  styleUrls: ['./problem-types-list.component.scss'],
})
export class ProblemTypesListComponent implements OnInit {
  problemTypes: any[] = [];
  tableColumns = ['Name', 'Parent'];
  variableNames = ['name', 'parentProblemTypeName'];
  pagingInfo: any = {};
  paginatorConfig: any = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };

  constructor(
    private problemTypeService: ProblemTypeService,
    private genericDataService: GenericDataService,
    private dialog: MatDialog,
    private router: Router,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {}

  getProblemTypes(params: any): void {
    this.problemTypeService.getProblemTypes(params).subscribe((data) => {
      this.prepareProblemTypeData(data);
    });
  }

  getProblemTypesHateoas(url: string): void {
    this.genericDataService.getData(url).subscribe((data) => {
      this.prepareProblemTypeData(data);
    });
  }

  prepareProblemTypeData(data): void {
    // Read all incoming data
    if (data._embedded) {
      this.problemTypes = data._embedded.problemTypes;
      this.assignParentProblemTypeNames();
    } else {
      this.problemTypes = [];
    }
    this.pagingInfo.page = data.page;
    this.pagingInfo._links = data._links;
  }

  assignParentProblemTypeNames(): void {
    for (const problemType of this.problemTypes) {
      if (problemType.parentProblemType != null) {
        for (const parentProblemType of this.problemTypes) {
          if (problemType.parentProblemType === parentProblemType.id) {
            problemType.parentProblemTypeName = parentProblemType.name;
          }
        }
      }
    }
  }

  onAddElement(): void {
    const params: any = {};
    const dialogRef = this.dialog.open(AddProblemTypeDialogComponent, {
      data: { title: 'Add new problem type' },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        const problemTypeDto: EntityModelProblemTypeDto = {
          id: dialogResult.id,
          name: dialogResult.name,
        };
        if (dialogResult.parentProblemType) {
          problemTypeDto.parentProblemType = dialogResult.parentProblemType.id;
        }

        params.body = problemTypeDto;
        this.problemTypeService.createProblemType(params).subscribe((data) => {
          this.getProblemTypesHateoas(
            this.utilService.getLastPageAfterCreation(
              this.pagingInfo._links.self.href,
              this.pagingInfo
            )
          );
          this.utilService.callSnackBar('Successfully added problem type');
        });
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
          let successfulDeletions = 0;
          for (const problemType of event.elements) {
            deletionTasks.push(
              this.problemTypeService.deleteProblemType({
                problemTypeId: problemType.id,
              })
            );
          }
          forkJoin(deletionTasks).subscribe(
            (successfulTasks) => {
              successfulDeletions = successfulTasks.length;
            },
            () => {
              this.utilService.callSnackBar(
                'Delete rejected! Problem type is used in other places.'
              );
            },
            () => {
              if (this.problemTypes.length === successfulDeletions) {
                this.getProblemTypesHateoas(this.pagingInfo._links.prev.href);
              } else {
                this.getProblemTypesHateoas(this.pagingInfo._links.self.href);
              }
            }
          );
        }
      });
  }

  onEditElement(event: any): void {
    let parentProblemTypeDto: EntityModelProblemTypeDto;
    for (const problemType of this.problemTypes) {
      if (problemType.id === event.parentProblemType) {
        parentProblemTypeDto = problemType;
      }
    }
    const dialogRef = this.dialog.open(EditProblemTypeDialogComponent, {
      data: {
        title: 'Edit problem type',
        name: event.name,
        parentProblemType: parentProblemTypeDto,
      },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        if (
          dialogResult.newName !== event.name ||
          !dialogResult.newParentProblemType ||
          (dialogResult.newParentProblemType &&
            dialogResult.newParentProblemType.id !==
              (event.parentProblemType as string))
        ) {
          const newProblemTypeDto: EntityModelProblemTypeDto = {
            id: event.id,
            name: dialogResult.newName,
          };
          if (dialogResult.newParentProblemType) {
            newProblemTypeDto.parentProblemType =
              dialogResult.newParentProblemType.id;
          }

          if (newProblemTypeDto.id !== newProblemTypeDto.parentProblemType) {
            const params: any = {
              problemTypeId: newProblemTypeDto.id,
              body: newProblemTypeDto,
            };
            this.problemTypeService
              .updateProblemType(params)
              .subscribe((data) => {
                this.getProblemTypesHateoas(this.pagingInfo._links.self.href);
                this.utilService.callSnackBar(
                  'Successfully edited problem type'
                );
              });
          } else {
            this.utilService.callSnackBar(
              'Edit aborted! Parent problem type must differ from problem type.'
            );
          }
        }
      }
    });
  }
}
