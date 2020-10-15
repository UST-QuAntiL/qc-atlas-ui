import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExecutionEnvironmentsService } from 'api-atlas/services/execution-environments.service';
import { EntityModelSoftwarePlatformDto } from 'api-atlas/models/entity-model-software-platform-dto';
import { CloudServiceDto } from 'api-atlas/models/cloud-service-dto';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin, Observable } from 'rxjs';
import {
  LinkObject,
  QueryParams,
  UrlData,
} from '../../../generics/data-list/data-list.component';
import { UtilService } from '../../../../util/util.service';
import { GenericDataService } from '../../../../util/generic-data.service';
import {
  DialogData,
  LinkItemListDialogComponent,
} from '../../../generics/dialogs/link-item-list-dialog.component';

@Component({
  selector: 'app-software-platform-cloud-service-list',
  templateUrl: './software-platform-cloud-service-list.component.html',
  styleUrls: ['./software-platform-cloud-service-list.component.scss'],
})
export class SoftwarePlatformCloudServiceListComponent implements OnInit {
  @Input() softwarePlatform: EntityModelSoftwarePlatformDto;
  displayedData = [];
  tableColumns = ['Name', 'Provider', 'Description', 'CostModel', 'URL'];
  variableNames = ['name', 'provider', 'description', 'costModel', 'url'];
  externalLinkVariables = ['url'];
  linkObject: LinkObject = {
    title: 'Link software platform with ',
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
  pagingInfo: any = {};
  paginatorConfig: any = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };

  constructor(
    private executionEnvironmentService: ExecutionEnvironmentsService,
    private router: Router,
    private dialog: MatDialog,
    private utilService: UtilService,
    private genericDataService: GenericDataService
  ) {}

  ngOnInit(): void {
    this.linkObject.title += this.softwarePlatform.name;
    this.getAllLinkedCloudServices();
  }

  getAllCloudServices(search?: QueryParams): Observable<any> {
    return this.executionEnvironmentService
      .getCloudServices(search)
      .pipe((data) => data);
  }

  getAllLinkedCloudServices(): void {
    this.linkObject.linkedData = [];
    this.executionEnvironmentService
      .getCloudServicesOfSoftwarePlatform({
        softwarePlatformId: this.softwarePlatform.id,
      })
      .subscribe((data) => {
        if (data._embedded) {
          this.linkObject.linkedData = data._embedded.cloudServices;
        }
      });
  }

  getPagedLinkedCloudServices(params: any): void {
    this.executionEnvironmentService
      .getCloudServicesOfSoftwarePlatform({
        softwarePlatformId: this.softwarePlatform.id,
        page: params.page,
        size: params.size,
        sort: params.sort,
        search: params.sort,
      })
      .subscribe((data) => {
        this.updateDisplayedData(data);
      });
  }

  updateDisplayedData(data): void {
    // clear link object data
    this.displayedData = [];
    // If cloud services found
    if (data._embedded) {
      this.displayedData = data._embedded.cloudServices;
    }
    this.pagingInfo.page = data.page;
    this.pagingInfo._links = data._links;
  }

  updateLinkDialogData(data): void {
    // clear link object data
    this.linkObject.data = [];
    // If cloud services found
    if (data._embedded) {
      this.linkObject.data = data._embedded.cloudServices;
    }
    this.dialogData.pagingInfo.page = data.page;
    this.dialogData.pagingInfo._links = data._links;
  }

  openLinkCloudServiceDialog() {
    this.getAllCloudServices().subscribe((data) => {
      this.updateLinkDialogData(data);
      const dialogRef = this.dialog.open(LinkItemListDialogComponent, {
        width: '800px',
        data: this.dialogData,
      });
      const searchTextSub = dialogRef.componentInstance.onDataListConfigChanged.subscribe(
        (search: QueryParams) => {
          this.getAllCloudServices(search).subscribe((updatedData) => {
            this.updateLinkDialogData(updatedData);
            dialogRef.componentInstance.data.linkObject = this.linkObject;
          });
        }
      );
      const pagingSub = dialogRef.componentInstance.onPageChanged.subscribe(
        (page: string) => {
          this.getHateaosDataFromGenericService(page).subscribe((pageData) => {
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
          .linkSoftwarePlatformAndCloudService({
            softwarePlatformId: this.softwarePlatform.id,
            body: cloudService,
          })
          .toPromise()
          .then(() => {
            successfulLinks++;
            snackbarMessages.push(
              'Successfully linked cloud service "' + cloudService.name + '"'
            );
          })
      );
    }
    forkJoin(linkTasks).subscribe(() => {
      this.getHateaosDataFromGenericService(
        this.utilService.getLastPageAfterCreation(
          this.pagingInfo._links.self.href,
          this.pagingInfo,
          successfulLinks
        )
      ).subscribe((data) => {
        this.updateDisplayedData(data);
      });
      this.getAllLinkedCloudServices();
      snackbarMessages.push(
        this.utilService.generateFinishingSnackarMessage(
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
          .unlinkSoftwarePlatformAndCloudService({
            softwarePlatformId: this.softwarePlatform.id,
            cloudServiceId: cloudService.id,
          })
          .toPromise()
          .then(() => {
            successfulDeletions++;
            snackbarMessages.push(
              'Successfully unlinked cloud service "' + cloudService.name + '"'
            );
          })
      );
    }
    forkJoin(deletionTasks).subscribe(() => {
      const pagingInfo = this.utilService.isLastPageEmptyAfterDeletion(
        successfulDeletions,
        this.displayedData.length,
        this.pagingInfo
      )
        ? this.pagingInfo._links.prev.href
        : this.pagingInfo._links.self.href;
      this.getHateaosDataFromGenericService(pagingInfo).subscribe((data) => {
        this.updateDisplayedData(data);
      });
      this.getAllLinkedCloudServices();
      snackbarMessages.push(
        this.utilService.generateFinishingSnackarMessage(
          successfulDeletions,
          event.elements.length,
          'cloud services',
          'unlinked'
        )
      );
      this.utilService.callSnackBarSequence(snackbarMessages);
    });
  }

  onDatalistConfigChanged(event): void {
    this.getPagedLinkedCloudServices(event);
  }

  onElementClicked(cloudService: CloudServiceDto): void {
    this.routeToCloudService(cloudService);
  }

  routeToCloudService(cloudService: CloudServiceDto): void {
    this.router.navigate([
      'execution-environments',
      'cloud-services',
      cloudService.id,
    ]);
  }

  getHateaosDataFromGenericService(url: string): Observable<any> {
    return this.genericDataService.getData(url).pipe((data) => data);
  }

  onPageChanged(event): void {
    this.getHateaosDataFromGenericService(event).subscribe((data) => {
      this.updateDisplayedData(data);
    });
  }

  onUrlClicked(urlData: UrlData) {
    // No check needed since cloud services have only one url-field called 'url'
    window.open(urlData.element['url'], '_blank');
  }
}
