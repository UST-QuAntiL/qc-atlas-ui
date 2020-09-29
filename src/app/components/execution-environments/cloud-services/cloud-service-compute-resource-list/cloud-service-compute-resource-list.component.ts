import { Component, Input, OnInit } from '@angular/core';
import { EntityModelCloudServiceDto } from 'api-atlas/models/entity-model-cloud-service-dto';
import { ExecutionEnvironmentsService } from 'api-atlas/services/execution-environments.service';
import { Router } from '@angular/router';
import { ComputeResourceDto } from 'api-atlas/models/compute-resource-dto';
import { MatDialog } from '@angular/material/dialog';
import {
  SelectParams,
  LinkObject,
  QueryParams,
} from '../../../generics/data-list/data-list.component';
import { UtilService } from '../../../../util/util.service';
import { GenericDataService } from '../../../../util/generic-data.service';
import { LinkItemListDialogComponent } from '../../../generics/dialogs/link-item-list-dialog.component';

@Component({
  selector: 'app-cloud-service-compute-resource-list',
  templateUrl: './cloud-service-compute-resource-list.component.html',
  styleUrls: ['./cloud-service-compute-resource-list.component.scss'],
})
export class CloudServiceComputeResourceListComponent implements OnInit {
  @Input() cloudService: EntityModelCloudServiceDto;

  tableColumns = ['Name', 'Vendor', 'Technology', 'Quantum Computation Model'];
  variableNames = ['name', 'vendor', 'technology', 'quantumComputationModel'];
  linkObject: LinkObject = {
    title: 'Link compute resource with ',
    subtitle: 'Search compute resources by name',
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
    this.linkObject.title += this.cloudService.name;
    this.getComputeResources();
    this.getLinkedComputeResources({ cloudServiceId: this.cloudService.id });
  }

  getComputeResources(): void {
    this.executionEnvironmentsService
      .getComputeResources({ page: -1 })
      .subscribe((computeResources) => {
        this.linkObject.data = [];
        if (computeResources._embedded) {
          this.linkObject.data = computeResources._embedded.computeResources;
        }
      });
  }

  updateComputeResourcesData(data): void {
    // clear link object data
    this.linkObject.data = [];
    // If compute resources found
    if (data._embedded) {
      this.linkObject.data = data._embedded.computeResources;
    }
    this.pagingInfo.page = data.page;
    this.pagingInfo._links = data._links;
  }

  getLinkedComputeResources(params: {
    cloudServiceId: string;
    search?: string;
    page?: number;
    size?: number;
    sort?: string[];
  }): void {
    this.executionEnvironmentsService
      .getComputeResourcesOfCloudService(params)
      .subscribe((computeResource) => {
        this.linkObject.linkedData = [];
        if (computeResource._embedded) {
          this.linkObject.linkedData =
            computeResource._embedded.computeResources;
        }
      });
  }

  openLinkComputeResourceDialog(): void {
    this.executionEnvironmentsService
      .getComputeResources()
      .subscribe((data) => {
        this.updateComputeResourcesData(data);
        const dialogRef = this.dialog.open(LinkItemListDialogComponent, {
          width: '800px',
          data: {
            title: 'Link existing compute resources',
            linkObject: this.linkObject,
            tableColumns: ['Name', 'Vendor', 'Technology'],
            variableNames: ['name', 'vendor', 'technology'],
            pagingInfo: this.pagingInfo,
            paginatorConfig: this.paginatorConfig,
            noButtonText: 'Cancel',
          },
        });
        const searchTextSub = dialogRef.componentInstance.onDataListConfigChanged.subscribe(
          (search: QueryParams) => {
            this.executionEnvironmentsService
              .getComputeResources(search)
              .subscribe((updatedData) => {
                this.updateComputeResourcesData(updatedData);
                dialogRef.componentInstance.data.linkObject = this.linkObject;
              });
          }
        );
        const pagingSub = dialogRef.componentInstance.onPageChanged.subscribe(
          (page: string) => {
            this.genericDataService.getData(page).subscribe((pageData) => {
              this.updateComputeResourcesData(pageData);
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
            for (const computeResource of dialogResult.selectedItems) {
              this.linkComputeResource(computeResource);
            }
          }
        });
      });
  }

  linkComputeResource(computeResource: ComputeResourceDto): void {
    this.linkObject.data = [];
    this.executionEnvironmentsService
      .linkCloudServiceAndComputeResource({
        cloudServiceId: this.cloudService.id,
        body: computeResource,
      })
      .subscribe((data) => {
        this.getLinkedComputeResources({
          cloudServiceId: this.cloudService.id,
        });
        this.utilService.callSnackBar('Successfully linked compute resource');
      });
  }

  unlinkComputeResources(event: SelectParams): void {
    const promises: Array<Promise<void>> = [];
    for (const computeResource of event.elements) {
      promises.push(
        this.executionEnvironmentsService
          .unlinkCloudServiceAndComputeResource({
            cloudServiceId: this.cloudService.id,
            computeResourceId: computeResource.id,
          })
          .toPromise()
      );
    }
    Promise.all(promises).then(() => {
      this.getLinkedComputeResources({ cloudServiceId: this.cloudService.id });
      this.utilService.callSnackBar('Successfully unlinked compute resource');
    });
  }

  onDatalistConfigChanged(): void {
    this.getLinkedComputeResources({ cloudServiceId: this.cloudService.id });
  }

  onElementClicked(computeResource: ComputeResourceDto): void {
    this.routeToComputeResource(computeResource);
  }

  routeToComputeResource(computeResource: ComputeResourceDto): void {
    this.router.navigate([
      'execution-environments',
      'compute-resources',
      computeResource.id,
    ]);
  }
}
