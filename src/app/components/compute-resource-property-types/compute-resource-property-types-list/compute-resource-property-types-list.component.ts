import { Component, OnInit } from '@angular/core';
import { ComputeResourcePropertyTypesService } from 'api-atlas/services/compute-resource-property-types.service';
import { EntityModelComputeResourcePropertyTypeDto } from 'api-atlas/models/entity-model-compute-resource-property-type-dto';
import { forkJoin } from 'rxjs';
import { GenericDataService } from '../../../util/generic-data.service';
import { UtilService } from '../../../util/util.service';
// eslint-disable-next-line max-len
import { AddOrEditComputeResourcePropertyTypeDialogComponent } from '../dialogs/add-or-edit-compute-resource-property-type-dialog/add-or-edit-compute-resource-property-type-dialog.component';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../generics/dialogs/confirm-dialog.component';

@Component({
  selector: 'app-compute-resource-property-types-list',
  templateUrl: './compute-resource-property-types-list.component.html',
  styleUrls: ['./compute-resource-property-types-list.component.scss'],
})
export class ComputeResourcePropertyTypesListComponent implements OnInit {
  computeResourcePropertyTypes: any[] = [];
  tableColumns = ['Name', 'Datatype', 'Description'];
  variableNames = ['name', 'datatype', 'description'];
  pagingInfo: any = {};
  paginatorConfig: any = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };

  constructor(
    private computeResourcePropertyTypeService: ComputeResourcePropertyTypesService,
    private genericDataService: GenericDataService,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {}

  getComputeResourcePropertyTypes(params: any): void {
    this.computeResourcePropertyTypeService
      .getResourcePropertyTypes(params)
      .subscribe((data) => {
        this.prepareComputeResourcePropertyTypeData(data);
      });
  }

  getComputeResourcePropertyTypesHateoas(url: string): void {
    this.genericDataService.getData(url).subscribe((data) => {
      this.prepareComputeResourcePropertyTypeData(data);
    });
  }

  prepareComputeResourcePropertyTypeData(data): void {
    // Read all incoming data
    if (data._embedded) {
      this.computeResourcePropertyTypes =
        data._embedded.computeResourcePropertyTypes;
    } else {
      this.computeResourcePropertyTypes = [];
    }
    this.pagingInfo.page = data.page;
    this.pagingInfo._links = data._links;
  }

  onAddElement(): void {
    const params: any = {};
    const dialogRef = this.utilService.createDialog(
      AddOrEditComputeResourcePropertyTypeDialogComponent,
      {
        title: 'Create new compute resource property type',
      }
    );

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        const computeResourcePropertyType: EntityModelComputeResourcePropertyTypeDto = {
          id: undefined,
          name: dialogResult.name,
          datatype: dialogResult.datatype,
          description: dialogResult.description,
        };

        params.body = computeResourcePropertyType;
        this.computeResourcePropertyTypeService
          .createComputingResourcePropertyType(params)
          .subscribe((data) => {
            this.getComputeResourcePropertyTypesHateoas(
              this.utilService.getLastPageAfterCreation(
                this.pagingInfo._links.self.href,
                this.pagingInfo
              )
            );
            this.utilService.callSnackBar(
              'Successfully added compute resource property type'
            );
          });
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
          let successfulDeletions = 0;
          for (const computeResourcePropertyType of event.elements) {
            deletionTasks.push(
              this.computeResourcePropertyTypeService
                .deleteComputingResourcePropertyType({
                  computeResourcePropertyTypeId: computeResourcePropertyType.id,
                })
                .toPromise()
                .then(() => successfulDeletions++)
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
              this.getComputeResourcePropertyTypesHateoas(
                this.pagingInfo._links.prev.href
              );
            } else {
              this.getComputeResourcePropertyTypesHateoas(
                this.pagingInfo._links.self.href
              );
            }
            this.utilService.callSnackBar(
              'Successfully deleted ' +
                successfulDeletions +
                '/' +
                dialogResult.data.length +
                ' compute resource property types.'
            );
          });
        }
      });
  }

  onEditElement(event: any): void {
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
        const updatedComputeResourcePropertyType: EntityModelComputeResourcePropertyTypeDto = {
          id: dialogResult.id,
          name: dialogResult.name,
          datatype: dialogResult.datatype,
          description: dialogResult.description,
        };

        const params: any = {
          computeResourcePropertyTypeId: updatedComputeResourcePropertyType.id,
          body: updatedComputeResourcePropertyType,
        };
        this.computeResourcePropertyTypeService
          .updateComputingResourcePropertyType(params)
          .subscribe((data) => {
            this.getComputeResourcePropertyTypesHateoas(
              this.pagingInfo._links.self.href
            );
            this.utilService.callSnackBar(
              'Successfully edited compute resource property type'
            );
          });
      }
    });
  }
}
