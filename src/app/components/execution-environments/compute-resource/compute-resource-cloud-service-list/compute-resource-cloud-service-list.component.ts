import { Component, Input, OnInit } from '@angular/core';
import { ComputeResourceDto } from 'api-atlas/models/compute-resource-dto';
import { ExecutionEnvironmentsService } from 'api-atlas/services/execution-environments.service';
import { Router } from '@angular/router';
import { CloudServiceDto } from 'api-atlas/models/cloud-service-dto';
import { forkJoin, Observable } from 'rxjs';
import { PageCloudServiceDto } from 'api-atlas/models/page-cloud-service-dto';
import {
  LinkObject,
  QueryParams,
  UrlData,
} from '../../../generics/data-list/data-list.component';
import { UtilService } from '../../../../util/util.service';
import {
  DialogData,
  LinkItemListDialogComponent,
} from '../../../generics/dialogs/link-item-list-dialog.component';
import { PaginatorConfig } from '../../../../util/paginatorConfig';
import { PagingInfo } from '../../../../util/PagingInfo';

@Component({
  selector: 'app-compute-resource-cloud-service-list',
  templateUrl: './compute-resource-cloud-service-list.component.html',
  styleUrls: ['./compute-resource-cloud-service-list.component.scss'],
})
export class ComputeResourceCloudServiceListComponent implements OnInit {
  @Input() computeResource: ComputeResourceDto;
  displayedData = [];
  tableColumns = ['Name', 'Provider', 'Description', 'CostModel', 'URL'];
  variableNames = ['name', 'provider', 'description', 'costModel', 'url'];
  externalLinkVariables = ['url'];
  linkObject: LinkObject = {
    title: 'Link compute resource with ',
    subtitle: 'Search cloud services by name',
    displayVariable: 'name',
    data: [],
    linkedData: [],
  };
  dialogData: DialogData = {
    title: 'Link existing cloud services',
    linkObject: this.linkObject,
    tableColumns: ['Name', 'Provider', 'Description'],
    variableNames: ['name', 'provider', 'description'],
    noButtonText: 'Cancel',
    pagingInfo: {},
    paginatorConfig: {
      amountChoices: [10, 25, 50],
      selectedAmount: 10,
    },
  };
  pagingInfo: PagingInfo = {};
  paginatorConfig: PaginatorConfig = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };

  constructor(
    private executionEnvironmentService: ExecutionEnvironmentsService,
    private router: Router,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.linkObject.title += this.computeResource.name;
    this.getAllLinkedCloudServices();
  }

  getAllCloudServices(search?: QueryParams): Observable<PageCloudServiceDto> {
    return this.executionEnvironmentService
      .getCloudServices(search)
      .pipe((data) => data);
  }

  getAllLinkedCloudServices(params: QueryParams = {}): void {
    this.linkObject.linkedData = [];
    this.executionEnvironmentService
      .getCloudServicesOfComputeResource({
        computeResourceId: this.computeResource.id,
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
            'Error! Linked cloud services could not be retrieved.'
          );
        }
      );
  }

  updateDisplayedData(data): void {
    // clear link object data
    this.displayedData = [];
    // If cloud services found
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
    // If cloud services found
    if (data.content) {
      this.linkObject.data = data.content;
    }
    this.dialogData.pagingInfo.totalPages = data.totalPages;
    this.dialogData.pagingInfo.number = data.number;
    this.dialogData.pagingInfo.size = data.size;
    this.dialogData.pagingInfo.sort = data.sort;
  }

  openLinkCloudServiceDialog(): void {
    this.getAllCloudServices().subscribe((data) => {
      this.updateLinkDialogData(data);
      const dialogRef = this.utilService.createDialog(
        LinkItemListDialogComponent,
        this.dialogData,
        1000,
        700
      );
      const searchTextSub = dialogRef.componentInstance.onDataListConfigChanged.subscribe(
        (search: QueryParams) => {
          this.getAllCloudServices(search).subscribe((updatedData) => {
            this.updateLinkDialogData(updatedData);
            dialogRef.componentInstance.data.linkObject = this.linkObject;
          });
        }
      );
      const pagingSub = dialogRef.componentInstance.onPageChanged.subscribe(
        (page: QueryParams) => {
          this.getAllCloudServices(page).subscribe((pageData) => {
            this.updateLinkDialogData(pageData);
            dialogRef.componentInstance.data.linkObject = this.linkObject;
          });
        }
      );
      const elementClickedSub = dialogRef.componentInstance.onElementClicked.subscribe(
        (element: CloudServiceDto) => {
          this.routeToCloudService(element);
          dialogRef.close();
        }
      );

      dialogRef.afterClosed().subscribe((dialogResult) => {
        searchTextSub.unsubscribe();
        pagingSub.unsubscribe();
        elementClickedSub.unsubscribe();
        if (dialogResult) {
          this.linkCloudServices(dialogResult.selectedItems);
        }
      });
    });
  }

  linkCloudServices(cloudServices: CloudServiceDto[]): void {
    // Empty unlinked cloud services
    this.linkObject.data = [];
    const linkTasks = [];
    const snackbarMessages = [];
    let successfulLinks = 0;
    for (const cloudService of cloudServices) {
      linkTasks.push(
        this.executionEnvironmentService
          .linkCloudServiceAndComputeResource({
            cloudServiceId: cloudService.id,
            body: this.computeResource,
          })
          .toPromise()
          .then(() => {
            successfulLinks++;
            snackbarMessages.push(
              'Successfully linked cloud service "' + cloudService.name + '".'
            );
          })
          .catch(() => {
            snackbarMessages.push(
              'Error! Could not link cloud service "' + cloudService.name + '".'
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
      this.getAllLinkedCloudServices(parameters);
      snackbarMessages.push(
        this.utilService.generateFinishingSnackbarMessage(
          successfulLinks,
          cloudServices.length,
          'cloud services',
          'linked'
        )
      );
      this.utilService.callSnackBarSequence(snackbarMessages);
    });
  }

  unlinkCloudServices(event): void {
    const deletionTasks = [];
    const snackbarMessages = [];
    let successfulDeletions = 0;
    for (const cloudService of event.elements) {
      deletionTasks.push(
        this.executionEnvironmentService
          .unlinkCloudServiceAndComputeResource({
            cloudServiceId: cloudService.id,
            computeResourceId: this.computeResource.id,
          })
          .toPromise()
          .then(() => {
            successfulDeletions++;
            snackbarMessages.push(
              'Successfully unlinked cloud service "' + cloudService.name + '".'
            );
          })
          .catch(() => {
            snackbarMessages.push(
              'Error! Could not unlink cloud service "' +
                cloudService.name +
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
      this.getAllLinkedCloudServices(event.queryParams);
      snackbarMessages.push(
        this.utilService.generateFinishingSnackbarMessage(
          successfulDeletions,
          event.elements.length,
          'cloud services',
          'unlinked'
        )
      );
      this.utilService.callSnackBarSequence(snackbarMessages);
    });
  }

  routeToCloudService(cloudService: CloudServiceDto): void {
    this.router.navigate([
      'execution-environments',
      'cloud-services',
      cloudService.id,
    ]);
  }

  onUrlClicked(urlData: UrlData): void {
    // No check needed since cloud services have only one url-field called 'url'
    window.open(urlData.element['url'], '_blank');
  }
}
