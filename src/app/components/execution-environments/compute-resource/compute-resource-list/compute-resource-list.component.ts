import { Component, Input, OnInit } from '@angular/core';
import { ExecutionEnvironmentsService } from 'api-atlas/services/execution-environments.service';
import { Router } from '@angular/router';
import { ComputeResourceDto } from 'api-atlas/models/compute-resource-dto';
import { forkJoin } from 'rxjs';
import {
  SelectParams,
  QueryParams,
} from '../../../generics/data-list/data-list.component';
import { UtilService } from '../../../../util/util.service';
import { CreateComputeResourceDialogComponent } from '../dialogs/create-compute-resource-dialog.component';
import { ConfirmDialogComponent } from '../../../generics/dialogs/confirm-dialog.component';
import { PaginatorConfig } from '../../../../util/paginatorConfig';
import { PagingInfo } from '../../../../util/PagingInfo';
import { AtlasQpuUpdateService } from 'src/app/util/AtlasQpuUpdate.service';

@Component({
  selector: 'app-compute-resource-list',
  templateUrl: './compute-resource-list.component.html',
  styleUrls: ['./compute-resource-list.component.scss'],
})
export class ComputeResourceListComponent implements OnInit {
  @Input() computeResources: ComputeResourceDto[];

  tableColumns = ['Name', 'Vendor', 'Technology', 'Quantum Computation Model'];
  variableNames = ['name', 'vendor', 'technology', 'quantumComputationModel'];
  pagingInfo: PagingInfo<ComputeResourceDto> = {};
  paginatorConfig: PaginatorConfig = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };

  constructor(
    private utilService: UtilService,
    private executionEnvironmentsService: ExecutionEnvironmentsService,
    private router: Router,
    private atlasQpuUpdateService: AtlasQpuUpdateService
  ) {}

  ngOnInit(): void {
    this.atlasQpuUpdateService.runQpuUpdate();
  }

  getComputeResources(params: QueryParams): void {
    this.executionEnvironmentsService
      .getComputeResources(params)
      .subscribe((data) => {
        this.prepareComputeResourceData(data);
      });
  }

  prepareComputeResourceData(data): void {
    if (data.content) {
      this.computeResources = data.content;
    } else {
      this.computeResources = [];
    }
    this.pagingInfo.totalPages = data.totalPages;
    this.pagingInfo.number = data.number;
    this.pagingInfo.sort = data.sort;
  }

  onComputeResourceClicked(computeResource: ComputeResourceDto): void {
    this.router.navigate([
      'execution-environments',
      'compute-resources',
      computeResource.id,
    ]);
  }

  onCreateComputeResource(): void {
    this.utilService
      .createDialog(CreateComputeResourceDialogComponent, {
        title: 'Create a new compute resource',
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          const computeResourceDto: ComputeResourceDto = {
            id: null,
            name: dialogResult.name,
          };
          this.executionEnvironmentsService
            .createComputeResource({ body: computeResourceDto })
            .subscribe(
              (computeResource: ComputeResourceDto) => {
                this.router.navigate([
                  'execution-environments',
                  'compute-resources',
                  computeResource.id,
                ]);
                this.utilService.callSnackBar(
                  'Successfully created compute resource "' +
                    computeResource.name +
                    '".'
                );
              },
              () => {
                this.utilService.callSnackBar(
                  'Error! Could not create compute resource.'
                );
              }
            );
        }
      });
  }

  onDeleteComputeResources(deleteParams: SelectParams): void {
    const deleteAllowed = [];
    const deleteNotAllowed = [];
    deleteParams.elements.forEach((element) => {
      if (element.qprovOrigin === false) {
        deleteAllowed.push(element);
      } else {
        deleteNotAllowed.push(
          element.name + 'is from qprov, so cannot be deleted'
        );
      }
    });
    deleteParams.elements = deleteAllowed;
    if (deleteNotAllowed.length > 0) {
      this.utilService.callSnackBarSequence(deleteNotAllowed);
    }
    if (deleteAllowed.length > 0) {
      this.utilService
        .createDialog(ConfirmDialogComponent, {
          title: 'Confirm Deletion',
          message:
            'Are you sure you want to delete the following compute resource(s): ',
          data: deleteParams.elements,
          variableName: 'name',
          yesButtonText: 'yes',
          noButtonText: 'no',
        })
        .afterClosed()
        .subscribe((dialogResult) => {
          if (dialogResult) {
            const deletionTasks = [];
            const snackbarMessages = [];
            let successfulDeletions = 0;
            for (const computeResource of deleteParams.elements) {
              deletionTasks.push(
                this.executionEnvironmentsService
                  .deleteComputeResource({
                    computeResourceId: computeResource.id,
                  })
                  .toPromise()
                  .then(() => {
                    successfulDeletions++;
                    snackbarMessages.push(
                      'Successfully deleted compute resource "' +
                        computeResource.name +
                        '".'
                    );
                  })
                  .catch((errorResponse) =>
                    snackbarMessages.push(
                      JSON.parse(errorResponse.error).message
                    )
                  )
              );
            }
            forkJoin(deletionTasks).subscribe(() => {
              if (
                this.utilService.isLastPageEmptyAfterDeletion(
                  successfulDeletions,
                  this.computeResources.length,
                  this.pagingInfo
                )
              ) {
                deleteParams.queryParams.page--;
              }
              this.getComputeResources(deleteParams.queryParams);
              snackbarMessages.push(
                this.utilService.generateFinishingSnackbarMessage(
                  successfulDeletions,
                  dialogResult.data.length,
                  'compute resources'
                )
              );
              this.utilService.callSnackBarSequence(snackbarMessages);
            });
          }
        });
    }
  }
}
