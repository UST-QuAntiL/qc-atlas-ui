import { Component, Input, OnInit } from '@angular/core';
import { EntityModelComputeResourceDto } from 'api-atlas/models/entity-model-compute-resource-dto';
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
import { GenericDataService } from '../../../../util/generic-data.service';
import { ConfirmDialogComponent } from '../../../generics/dialogs/confirm-dialog.component';

@Component({
  selector: 'app-compute-resource-list',
  templateUrl: './compute-resource-list.component.html',
  styleUrls: ['./compute-resource-list.component.scss'],
})
export class ComputeResourceListComponent implements OnInit {
  @Input() computeResources: EntityModelComputeResourceDto[];

  tableColumns = ['Name', 'Vendor', 'Technology', 'Quantum Computation Model'];
  variableNames = ['name', 'vendor', 'technology', 'quantumComputationModel'];
  pagingInfo: any = {};
  paginatorConfig: any = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };

  constructor(
    private utilService: UtilService,
    private executionEnvironmentsService: ExecutionEnvironmentsService,
    private genericDataService: GenericDataService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  getComputeResources(params: QueryParams): void {
    this.executionEnvironmentsService
      .getComputeResources(params)
      .subscribe((data) => {
        this.prepareComputeResourceData(data);
      });
  }

  getComputeResourcesHateoas(url: string): void {
    this.genericDataService.getData(url).subscribe((data) => {
      this.prepareComputeResourceData(data);
    });
  }

  prepareComputeResourceData(data): void {
    if (data._embedded) {
      this.computeResources = data._embedded.computeResources;
    } else {
      this.computeResources = [];
    }
    this.pagingInfo.page = data.page;
    this.pagingInfo._links = data._links;
  }

  onComputeResourceClicked(
    computeResource: EntityModelComputeResourceDto
  ): void {
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
            .subscribe((computeResource: EntityModelComputeResourceDto) => {
              this.router.navigate([
                'execution-environments',
                'compute-resources',
                computeResource.id,
              ]);
              this.utilService.callSnackBar(
                'Successfully created compute resource "' +
                  computeResource.name +
                  '"'
              );
            });
        }
      });
  }

  onDeleteComputeResources(deleteParams: SelectParams): void {
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
          let successfulDeletions = 0;
          for (const computeResource of deleteParams.elements) {
            deletionTasks.push(
              this.executionEnvironmentsService
                .deleteComputeResource({
                  computeResourceId: computeResource.id,
                })
                .toPromise()
                .then(() => successfulDeletions++)
            );
          }
          forkJoin(deletionTasks).subscribe(() => {
            console.log(this.pagingInfo.page);
            if (
              this.utilService.isLastPageEmptyAfterDeletion(
                successfulDeletions,
                this.computeResources.length,
                this.pagingInfo
              )
            ) {
              this.getComputeResourcesHateoas(this.pagingInfo._links.prev.href);
            } else {
              this.getComputeResourcesHateoas(this.pagingInfo._links.self.href);
            }
            this.utilService.callSnackBar(
              'Successfully deleted ' +
                successfulDeletions +
                '/' +
                dialogResult.data.length +
                ' compute resources.'
            );
          });
        }
      });
  }
}
