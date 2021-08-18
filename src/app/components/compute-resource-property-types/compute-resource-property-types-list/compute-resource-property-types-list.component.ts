import { Component, OnInit } from '@angular/core';
import { ComputeResourcePropertyTypesService } from 'api-atlas/services/compute-resource-property-types.service';
import { ComputeResourcePropertyTypeDto } from 'api-atlas/models/compute-resource-property-type-dto';
import { PageComputeResourcePropertyTypeDto } from 'api-atlas/models/page-compute-resource-property-type-dto';
import { forkJoin } from 'rxjs';
import { UtilService } from '../../../util/util.service';
// eslint-disable-next-line max-len
import { AddOrEditComputeResourcePropertyTypeDialogComponent } from '../dialogs/add-or-edit-compute-resource-property-type-dialog/add-or-edit-compute-resource-property-type-dialog.component';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../generics/dialogs/confirm-dialog.component';
import { PaginatorConfig } from '../../../util/paginatorConfig';
import { QueryParams } from '../../generics/data-list/data-list.component';
import { PagingInfo } from '../../../util/PagingInfo';

@Component({
  selector: 'app-compute-resource-property-types-list',
  templateUrl: './compute-resource-property-types-list.component.html',
  styleUrls: ['./compute-resource-property-types-list.component.scss'],
})
export class ComputeResourcePropertyTypesListComponent implements OnInit {
  computeResourcePropertyTypes: ComputeResourcePropertyTypeDto[] = [];
  tableColumns = ['Name', 'Datatype', 'Description'];
  variableNames = ['name', 'datatype', 'description'];
  pagingInfo: PagingInfo<ComputeResourcePropertyTypeDto> = {};
  paginatorConfig: PaginatorConfig = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };

  constructor(
    private computeResourcePropertyTypeService: ComputeResourcePropertyTypesService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {}

  getComputeResourcePropertyTypes(params: QueryParams): void {
    this.computeResourcePropertyTypeService
      .getResourcePropertyTypes(params)
      .subscribe((data) => {
        this.prepareComputeResourcePropertyTypeData(data);
      });
  }

  prepareComputeResourcePropertyTypeData(data): void {
    // Read all incoming data
    if (data.content) {
      this.computeResourcePropertyTypes = data.content;
    } else {
      this.computeResourcePropertyTypes = [];
    }
    this.pagingInfo.totalPages = data.totalPages;
    this.pagingInfo.totalElements = data.totalElements;
    this.pagingInfo.number = data.number;
    this.pagingInfo.size = data.size;
    this.pagingInfo.sort = data.sort;
  }

  onAddElement(): void {
    const dialogRef = this.utilService.createDialog(
      AddOrEditComputeResourcePropertyTypeDialogComponent,
      {
        title: 'Create new compute resource property type',
      }
    );

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        const computeResourcePropertyType: ComputeResourcePropertyTypeDto = {
          id: undefined,
          name: dialogResult.name,
          datatype: dialogResult.datatype,
          description: dialogResult.description,
        };

        this.computeResourcePropertyTypeService
          .createComputingResourcePropertyType({
            body: computeResourcePropertyType,
          })
          .subscribe(
            () => {
              const correctPage = this.utilService.getLastPageAfterCreation(
                this.pagingInfo,
                1
              );
              this.getComputeResourcePropertyTypes({
                size: this.pagingInfo.size,
                page: correctPage,
                sort: this.pagingInfo.sort,
              });
              this.utilService.callSnackBar(
                'Compute resource property type was successfully created.'
              );
            },
            () => {
              this.utilService.callSnackBar(
                'Error! Could not create compute resource property type.'
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
        'Are you sure you want to delete the following compute resource property types(s):',
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
          for (const computeResourcePropertyType of event.elements) {
            deletionTasks.push(
              this.computeResourcePropertyTypeService
                .deleteComputingResourcePropertyType({
                  computeResourcePropertyTypeId: computeResourcePropertyType.id,
                })
                .toPromise()
                .then(() => {
                  successfulDeletions++;
                  snackbarMessages.push(
                    'Successfully deleted compute resource property type "' +
                      computeResourcePropertyType.name +
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
                this.computeResourcePropertyTypes.length,
                this.pagingInfo
              )
            ) {
              event.queryParams.page--;
            }
            this.getComputeResourcePropertyTypes(event.queryParams);
            snackbarMessages.push(
              this.utilService.generateFinishingSnackbarMessage(
                successfulDeletions,
                dialogResult.data.length,
                'compute resource property types'
              )
            );
            this.utilService.callSnackBarSequence(snackbarMessages);
          });
        }
      });
  }

  onEditElement(event: ComputeResourcePropertyTypeDto): void {
    const dialogRef = this.utilService.createDialog(
      AddOrEditComputeResourcePropertyTypeDialogComponent,
      {
        title: 'Edit compute resource property type',
        id: event.id,
        name: event.name,
        datatype: event.datatype,
        description: event.description,
      }
    );

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        const updatedComputeResourcePropertyType: ComputeResourcePropertyTypeDto = {
          id: dialogResult.id,
          name: dialogResult.name,
          datatype: dialogResult.datatype,
          description: dialogResult.description,
        };
        this.computeResourcePropertyTypeService
          .updateComputingResourcePropertyType({
            computeResourcePropertyTypeId:
              updatedComputeResourcePropertyType.id,
            body: updatedComputeResourcePropertyType,
          })
          .subscribe(
            () => {
              this.getComputeResourcePropertyTypes({
                size: this.pagingInfo.size,
                page: this.pagingInfo.number,
                sort: this.pagingInfo.sort,
              });
              this.utilService.callSnackBar(
                'Compute resource property type was successfully updated.'
              );
            },
            () => {
              this.utilService.callSnackBar(
                'Error! Could not update compute resource property type.'
              );
            }
          );
      }
    });
  }
}
