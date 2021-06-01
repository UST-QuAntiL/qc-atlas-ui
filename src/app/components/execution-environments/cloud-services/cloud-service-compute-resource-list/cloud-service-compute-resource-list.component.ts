import { Component, Input, OnInit } from '@angular/core';
import { CloudServiceDto } from 'api-atlas/models/cloud-service-dto';
import { ExecutionEnvironmentsService } from 'api-atlas/services/execution-environments.service';
import { Router } from '@angular/router';
import { ComputeResourceDto } from 'api-atlas/models/compute-resource-dto';
import { forkJoin, Observable } from 'rxjs';
import { PageComputeResourceDto } from 'api-atlas/models/page-compute-resource-dto';
import {
  LinkObject,
  QueryParams,
} from '../../../generics/data-list/data-list.component';
import { UtilService } from '../../../../util/util.service';
import {
  DialogData,
  LinkItemListDialogComponent,
} from '../../../generics/dialogs/link-item-list-dialog.component';

@Component({
  selector: 'app-cloud-service-compute-resource-list',
  templateUrl: './cloud-service-compute-resource-list.component.html',
  styleUrls: ['./cloud-service-compute-resource-list.component.scss'],
})
export class CloudServiceComputeResourceListComponent implements OnInit {
  @Input() cloudService: CloudServiceDto;
  displayedData = [];
  tableColumns = ['Name', 'Vendor', 'Technology', 'Quantum Computation Model'];
  variableNames = ['name', 'vendor', 'technology', 'quantumComputationModel'];
  linkObject: LinkObject = {
    title: 'Link cloud service with ',
    subtitle: 'Search compute resources by name',
    displayVariable: 'name',
    data: [],
    linkedData: [],
  };
  dialogData: DialogData = {
    title: 'Link existing compute resources',
    linkObject: this.linkObject,
    tableColumns: ['Name', 'Vendor', 'Technology'],
    variableNames: ['name', 'vendor', 'technology'],
    noButtonText: 'Cancel',
    pagingInfo: {},
    paginatorConfig: {
      amountChoices: [10, 25, 50],
      selectedAmount: 10,
    },
  };
  pagingInfo: any = {};
  paginatorConfig: any = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };

  constructor(
    private executionEnvironmentService: ExecutionEnvironmentsService,
    private router: Router,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.linkObject.title += this.cloudService.name;
    this.getAllLinkedComputeResources();
  }

  getAllComputeResources(
    search?: QueryParams
  ): Observable<PageComputeResourceDto> {
    return this.executionEnvironmentService
      .getComputeResources(search)
      .pipe((data) => data);
  }

  getAllLinkedComputeResources(params: QueryParams = {}): void {
    this.linkObject.linkedData = [];
    this.executionEnvironmentService
      .getComputeResourcesOfCloudService({
        cloudServiceId: this.cloudService.id,
        search: params.search,
        page: params.page,
        sort: params.sort,
        size: params.size,
      })
      .subscribe(
        (data) => {
          if (data.content) {
            this.linkObject.linkedData = data.content;
          }
          this.updateDisplayedData(data);
        },
        () => {
          this.utilService.callSnackBar(
            'Error! Linked compute resources could not be retrieved.'
          );
        }
      );
  }

  updateDisplayedData(data): void {
    // clear link object data
    this.displayedData = [];
    // If compute resources found
    if (data.content) {
      this.displayedData = data.content;
    }
    this.pagingInfo.totalPages = data.totalPages;
    this.pagingInfo.totalElements = data.totalElements;
    this.pagingInfo.number = data.number;
    this.pagingInfo.size = data.size;
    this.pagingInfo.sort = data.sort;
    this.pagingInfo.search = data.search;
  }

  updateLinkDialogData(data): void {
    // clear link object data
    this.linkObject.data = [];
    // If compute resources found
    if (data.content) {
      this.linkObject.data = data.content;
    }
    this.dialogData.pagingInfo.totalPages = data.totalPages;
    this.dialogData.pagingInfo.number = data.number;
    this.dialogData.pagingInfo.size = data.size;
    this.dialogData.pagingInfo.sort = data.sort;
  }

  openLinkComputeResourceDialog(): void {
    this.getAllComputeResources().subscribe((data) => {
      this.updateLinkDialogData(data);
      const dialogRef = this.utilService.createDialog(
        LinkItemListDialogComponent,
        this.dialogData,
        1000,
        700
      );
      const searchTextSub = dialogRef.componentInstance.onDataListConfigChanged.subscribe(
        (search: QueryParams) => {
          this.getAllComputeResources(search).subscribe((updatedData) => {
            this.updateLinkDialogData(updatedData);
            dialogRef.componentInstance.data.linkObject = this.linkObject;
          });
        }
      );
      const pagingSub = dialogRef.componentInstance.onPageChanged.subscribe(
        (page: QueryParams) => {
          this.getAllComputeResources(page).subscribe((pageData) => {
            this.updateLinkDialogData(pageData);
            dialogRef.componentInstance.data.linkObject = this.linkObject;
          });
        }
      );
      const elementClickedSub = dialogRef.componentInstance.onElementClicked.subscribe(
        (element: ComputeResourceDto) => {
          this.routeToComputeResource(element);
          dialogRef.close();
        }
      );

      dialogRef.afterClosed().subscribe((dialogResult) => {
        searchTextSub.unsubscribe();
        pagingSub.unsubscribe();
        elementClickedSub.unsubscribe();
        if (dialogResult) {
          this.linkComputeResources(dialogResult.selectedItems);
        }
      });
    });
  }

  linkComputeResources(computeResources: ComputeResourceDto[]): void {
    // Empty unlinked compute resources
    this.linkObject.data = [];
    const linkTasks = [];
    const snackbarMessages = [];
    let successfulLinks = 0;
    for (const computeResource of computeResources) {
      linkTasks.push(
        this.executionEnvironmentService
          .linkCloudServiceAndComputeResource({
            cloudServiceId: this.cloudService.id,
            body: computeResource,
          })
          .toPromise()
          .then(() => {
            successfulLinks++;
            snackbarMessages.push(
              'Successfully linked compute resource "' +
                computeResource.name +
                '".'
            );
          })
          .catch(() => {
            snackbarMessages.push(
              'Error! Could not link compute resource "' +
                computeResource.name +
                '".'
            );
          })
      );
    }
    forkJoin(linkTasks).subscribe(() => {
      const correctPage = this.utilService.getLastPageAfterCreation(
        this.pagingInfo,
        successfulLinks
      );
      const parameters: QueryParams = {
        size: this.pagingInfo.size,
        page: correctPage,
        sort: this.pagingInfo.sort,
        search: this.pagingInfo.search,
      };
      this.getAllLinkedComputeResources(parameters);
      snackbarMessages.push(
        this.utilService.generateFinishingSnackbarMessage(
          successfulLinks,
          computeResources.length,
          'compute resources',
          'linked'
        )
      );
      this.utilService.callSnackBarSequence(snackbarMessages);
    });
  }

  unlinkComputeResources(event): void {
    const deletionTasks = [];
    const snackbarMessages = [];
    let successfulDeletions = 0;
    for (const computeResource of event.elements) {
      deletionTasks.push(
        this.executionEnvironmentService
          .unlinkCloudServiceAndComputeResource({
            cloudServiceId: this.cloudService.id,
            computeResourceId: computeResource.id,
          })
          .toPromise()
          .then(() => {
            successfulDeletions++;
            snackbarMessages.push(
              'Successfully unlinked compute resource "' +
                computeResource.name +
                '".'
            );
          })
          .catch(() => {
            snackbarMessages.push(
              'Error! Could not unlink compute resource "' +
                computeResource.name +
                '".'
            );
          })
      );
    }
    forkJoin(deletionTasks).subscribe(() => {
      if (
        this.utilService.isLastPageEmptyAfterDeletion(
          successfulDeletions,
          this.displayedData.length,
          this.pagingInfo
        )
      ) {
        event.queryParams.page--;
      }
      this.getAllLinkedComputeResources(event.queryParams);
      snackbarMessages.push(
        this.utilService.generateFinishingSnackbarMessage(
          successfulDeletions,
          event.elements.length,
          'compute resources',
          'unlinked'
        )
      );
      this.utilService.callSnackBarSequence(snackbarMessages);
    });
  }

  routeToComputeResource(computeResource: ComputeResourceDto): void {
    this.router.navigate([
      'execution-environments',
      'compute-resources',
      computeResource.id,
    ]);
  }
}
