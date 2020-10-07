import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExecutionEnvironmentsService } from 'api-atlas/services/execution-environments.service';
import { EntityModelSoftwarePlatformDto } from 'api-atlas/models/entity-model-software-platform-dto';
import { CloudServiceDto } from 'api-atlas/models/cloud-service-dto';
import { MatDialog } from '@angular/material/dialog';
import {
  SelectParams,
  LinkObject,
  QueryParams,
  UrlData,
} from '../../../generics/data-list/data-list.component';
import { UtilService } from '../../../../util/util.service';
import { GenericDataService } from '../../../../util/generic-data.service';
import { LinkItemListDialogComponent } from '../../../generics/dialogs/link-item-list-dialog.component';

@Component({
  selector: 'app-software-platform-cloud-service-list',
  templateUrl: './software-platform-cloud-service-list.component.html',
  styleUrls: ['./software-platform-cloud-service-list.component.scss'],
})
export class SoftwarePlatformCloudServiceListComponent implements OnInit {
  @Input() softwarePlatform: EntityModelSoftwarePlatformDto;

  tableColumns = ['Name', 'Provider', 'Description', 'CostModel', 'URL'];
  variableNames = ['name', 'provider', 'description', 'costModel', 'url'];
  externalLinkVariables = ['url'];
  linkObject: LinkObject = {
    title: 'Link cloud service with ',
    subtitle: 'Search cloud services by name',
    displayVariable: 'name',
    data: [],
    linkedData: [],
  };
  tableAddAllowed = true;
  pagingInfo: any = {};
  paginatorConfig: any = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };

  constructor(
    private executionEnvironmentsService: ExecutionEnvironmentsService,
    private genericDataService: GenericDataService,
    private router: Router,
    private utilService: UtilService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.linkObject.title += this.softwarePlatform.name;
    this.getCloudServices();
    this.getLinkedCloudServices({
      softwarePlatformId: this.softwarePlatform.id,
    });
  }

  getCloudServices(): void {
    this.executionEnvironmentsService
      .getCloudServices({ page: -1 })
      .subscribe((cloudServices) => {
        this.linkObject.data = [];
        if (cloudServices._embedded) {
          this.linkObject.data = cloudServices._embedded.cloudServices;
        }
      });
  }

  updateCloudServicesData(data): void {
    // clear link object data
    this.linkObject.data = [];
    // If cloud services found
    if (data._embedded) {
      this.linkObject.data = data._embedded.cloudServices;
    }
    this.pagingInfo.page = data.page;
    this.pagingInfo._links = data._links;
  }

  getLinkedCloudServices(params: {
    softwarePlatformId: string;
    search?: string;
    page?: number;
    size?: number;
    sort?: string[];
  }): void {
    this.executionEnvironmentsService
      .getCloudServicesOfSoftwarePlatform(params)
      .subscribe((cloudServices) => {
        this.linkObject.linkedData = [];
        if (cloudServices._embedded) {
          this.linkObject.linkedData = cloudServices._embedded.cloudServices;
        }
      });
  }

  openLinkCloudServiceDialog() {
    this.executionEnvironmentsService.getCloudServices().subscribe((data) => {
      this.updateCloudServicesData(data);
      const dialogRef = this.dialog.open(LinkItemListDialogComponent, {
        width: '800px',
        data: {
          title: 'Link existing cloud services',
          linkObject: this.linkObject,
          tableColumns: ['Name', 'Provider', 'Description'],
          variableNames: ['name', 'provider', 'description'],
          pagingInfo: this.pagingInfo,
          paginatorConfig: this.paginatorConfig,
          noButtonText: 'Cancel',
        },
      });
      const searchTextSub = dialogRef.componentInstance.onDataListConfigChanged.subscribe(
        (search: QueryParams) => {
          this.executionEnvironmentsService
            .getCloudServices(search)
            .subscribe((updatedData) => {
              this.updateCloudServicesData(updatedData);
              dialogRef.componentInstance.data.linkObject = this.linkObject;
            });
        }
      );
      const pagingSub = dialogRef.componentInstance.onPageChanged.subscribe(
        (page: string) => {
          this.genericDataService.getData(page).subscribe((pageData) => {
            this.updateCloudServicesData(pageData);
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
          for (const cloudService of dialogResult.selectedItems) {
            this.linkCloudService(cloudService);
          }
        }
      });
    });
  }

  linkCloudService(cloudService: CloudServiceDto): void {
    this.linkObject.data = [];
    this.executionEnvironmentsService
      .linkSoftwarePlatformAndCloudService({
        softwarePlatformId: this.softwarePlatform.id,
        body: cloudService,
      })
      .subscribe(() => {
        this.getLinkedCloudServices({
          softwarePlatformId: this.softwarePlatform.id,
        });
        this.utilService.callSnackBar('Successfully linked compute resource');
      });
  }

  unlinkCloudServices(event: SelectParams): void {
    const promises: Array<Promise<void>> = [];
    for (const cloudService of event.elements) {
      promises.push(
        this.executionEnvironmentsService
          .unlinkSoftwarePlatformAndCloudService({
            softwarePlatformId: this.softwarePlatform.id,
            cloudServiceId: cloudService.id,
          })
          .toPromise()
      );
    }
    Promise.all(promises).then(() => {
      this.getLinkedCloudServices({
        softwarePlatformId: this.softwarePlatform.id,
      });
      this.utilService.callSnackBar('Successfully unlinked compute resource');
    });
  }

  onDatalistConfigChanged(): void {
    this.getLinkedCloudServices({
      softwarePlatformId: this.softwarePlatform.id,
    });
  }

  onElementClicked(cloudService: CloudServiceDto): void {
    this.routeToCloudService(cloudService);
  }

  onUrlClicked(urlData: UrlData): void {
    // No check needed since publications have only one url-field called 'url'
    window.open(urlData.element['url'], '_blank');
  }

  private routeToCloudService(cloudService: CloudServiceDto) {
    this.router.navigate([
      'execution-environments',
      'cloud-services',
      cloudService.id,
    ]);
  }
}
