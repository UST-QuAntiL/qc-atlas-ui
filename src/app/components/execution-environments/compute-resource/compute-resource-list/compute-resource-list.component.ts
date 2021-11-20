import { Component, Input, OnInit } from '@angular/core';
import { ExecutionEnvironmentsService } from 'api-atlas/services/execution-environments.service';
import { Router } from '@angular/router';
import { ComputeResourceDto } from 'api-atlas/models/compute-resource-dto';
import { forkJoin } from 'rxjs';
import { ProviderService } from 'generated/api-qprov/services/provider.service';
import { EntityModelQpuDto } from 'generated/api-qprov/models/entity-model-qpu-dto';
import {
  SelectParams,
  QueryParams,
} from '../../../generics/data-list/data-list.component';
import { UtilService } from '../../../../util/util.service';
import { CreateComputeResourceDialogComponent } from '../dialogs/create-compute-resource-dialog.component';
import { ConfirmDialogComponent } from '../../../generics/dialogs/confirm-dialog.component';
import { PaginatorConfig } from '../../../../util/paginatorConfig';
import { PagingInfo } from '../../../../util/PagingInfo';

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
    private providerService: ProviderService
  ) {}

  ngOnInit(): void {
    this.executionEnvironmentsService
      .getComputeResources()
      .subscribe((data) => {
        this.providerService.getProviders().subscribe((result) => {
          this.getListOfProvidersAndQpus(result, data.content);
        });
      });
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
                  snackbarMessages.push(JSON.parse(errorResponse.error).message)
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

  getListOfProvidersAndQpus(result, computeResources): void {
    if (result === null || result._embedded == null) {
      console.error('Error while loading provider!');
      return;
    } else {
      result._embedded.providerDtoes.forEach((providerDto) => {
        this.providerService
          .getQpUs({ providerId: providerDto.id })
          .subscribe((res) => {
            const qpus = res._embedded.qpuDtoes;
            const vendor = providerDto.name;
            this.AddAllQpusFromQprov(vendor, qpus, computeResources);
          });
      });
    }
  }

  AddAllQpusFromQprov(
    vendor: string,
    qpus: EntityModelQpuDto[],
    computeResources: ComputeResourceDto[]
  ): void {
    if (computeResources.length > 0) {
      const relevantVendorQpuNames = computeResources
        .filter(
          (computeResource) => computeResource.vendor.trim() === vendor.trim()
        )
        .map((each) => each.name);
      qpus.forEach((element) => {
        if (!relevantVendorQpuNames.includes(element.name)) {
          const computeResourceDto: ComputeResourceDto = {
            id: null,
            name: element.name,
            vendor,
          };
          this.executionEnvironmentsService
            .createComputeResource({ body: computeResourceDto })
            .subscribe(
              (computeResource: ComputeResourceDto) => {
                this.getComputeResources({ page: 0, size: 10, sort: Array(0) });
              },
              () => {
                this.utilService.callSnackBar(
                  'Error! Could not create compute resource from qprov'
                );
              }
            );
        }
      });
    } else {
      qpus.forEach((element) => {
        const computeResourceDto: ComputeResourceDto = {
          id: null,
          name: element.name,
          vendor,
        };
        this.executionEnvironmentsService
          .createComputeResource({ body: computeResourceDto })
          .subscribe(
            (computeResource: ComputeResourceDto) => {
              this.getComputeResources({ page: 0, size: 10, sort: Array(0) });
            },
            () => {
              this.utilService.callSnackBar(
                'Error! Could not create compute resource from qprov'
              );
            }
          );
      });
    }
  }
}
