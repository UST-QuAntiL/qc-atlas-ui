import { Component, Input, OnInit } from '@angular/core';
import { EntityModelComputeResourceDto } from 'api-atlas/models/entity-model-compute-resource-dto';
import { ExecutionEnvironmentsService } from 'api-atlas/services/execution-environments.service';
import { Router } from '@angular/router';
import { CloudServiceDto } from 'api-atlas/models/cloud-service-dto';
import { MatDialog } from '@angular/material/dialog';
import {
  SelectParams,
  LinkObject,
  QueryParams,
  UrlData,
} from '../../../generics/data-list/data-list.component';
import { UtilService } from '../../../../util/util.service';
import { LinkItemListDialogComponent } from '../../../generics/dialogs/link-item-list-dialog.component';
import { GenericDataService } from '../../../../util/generic-data.service';

@Component({
  selector: 'app-compute-resource-cloud-service-list',
  templateUrl: './compute-resource-cloud-service-list.component.html',
  styleUrls: ['./compute-resource-cloud-service-list.component.scss'],
})
export class ComputeResourceCloudServiceListComponent implements OnInit {
  @Input() computeResource: EntityModelComputeResourceDto;

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
    this.linkObject.title += this.computeResource.name;
    this.getCloudServices();
    this.getLinkedCloudServices({ computeResourceId: this.computeResource.id });
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
    computeResourceId: string;
    search?: string;
    page?: number;
    size?: number;
    sort?: string[];
  }): void {
    this.executionEnvironmentsService
      .getCloudServicesOfComputeResource(params)
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
      .linkCloudServiceAndComputeResource({
        cloudServiceId: cloudService.id,
        body: this.computeResource,
      })
      .subscribe(() => {
        this.getLinkedCloudServices({
          computeResourceId: this.computeResource.id,
        });
        this.utilService.callSnackBar('Successfully linked cloud service');
      });
  }

  unlinkCloudServices(event: SelectParams): void {
    const outputPromises: Array<Promise<void>> = [];
    for (const cloudService of event.elements) {
      outputPromises.push(
        this.executionEnvironmentsService
          .unlinkCloudServiceAndComputeResource({
            cloudServiceId: cloudService.id,
            computeResourceId: this.computeResource.id,
          })
          .toPromise()
      );
    }
    Promise.all(outputPromises).then(() => {
      this.getLinkedCloudServices({
        computeResourceId: this.computeResource.id,
      });
      this.utilService.callSnackBar('Successfully unlinked cloud services');
    });
  }

  onDatalistConfigChanged(): void {
    this.getLinkedCloudServices({ computeResourceId: this.computeResource.id });
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
