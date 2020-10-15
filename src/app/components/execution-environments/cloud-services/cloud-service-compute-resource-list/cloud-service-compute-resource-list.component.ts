import { Component, Input, OnInit } from '@angular/core';
import { EntityModelCloudServiceDto } from 'api-atlas/models/entity-model-cloud-service-dto';
import { ExecutionEnvironmentsService } from 'api-atlas/services/execution-environments.service';
import { Router } from '@angular/router';
import { ComputeResourceDto } from 'api-atlas/models/compute-resource-dto';
import { forkJoin, Observable } from 'rxjs';
import {
  LinkObject,
  QueryParams,
} from '../../../generics/data-list/data-list.component';
import { UtilService } from '../../../../util/util.service';
import { GenericDataService } from '../../../../util/generic-data.service';
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
  @Input() cloudService: EntityModelCloudServiceDto;
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
    private utilService: UtilService,
    private genericDataService: GenericDataService
  ) {}

  ngOnInit(): void {
    this.linkObject.title += this.cloudService.name;
    this.getAllLinkedComputeResources();
  }

  getAllComputeResources(search?: QueryParams): Observable<any> {
    return this.executionEnvironmentService
      .getComputeResources(search)
      .pipe((data) => data);
  }

  getAllLinkedComputeResources(): void {
    this.linkObject.linkedData = [];
    this.executionEnvironmentService
      .getComputeResourcesOfCloudService({
        cloudServiceId: this.cloudService.id,
      })
      .subscribe((data) => {
        if (data._embedded) {
          this.linkObject.linkedData = data._embedded.computeResources;
        }
      });
  }

  getPagedLinkedComputeResources(params: any): void {
    this.executionEnvironmentService
      .getComputeResourcesOfCloudService({
        cloudServiceId: this.cloudService.id,
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
    // If compute resources found
    if (data._embedded) {
      this.displayedData = data._embedded.computeResources;
    }
    this.pagingInfo.page = data.page;
    this.pagingInfo._links = data._links;
  }

  updateLinkDialogData(data): void {
    // clear link object data
    this.linkObject.data = [];
    // If compute resources found
    if (data._embedded) {
      this.linkObject.data = data._embedded.computeResources;
    }
    this.dialogData.pagingInfo.page = data.page;
    this.dialogData.pagingInfo._links = data._links;
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
        (page: string) => {
          this.getHateaosDataFromGenericService(page).subscribe((pageData) => {
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
              'Successfully linked compute resources "' +
                computeResource.name +
                '"'
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
      this.getAllLinkedComputeResources();
      snackbarMessages.push(
        this.utilService.generateFinishingSnackarMessage(
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
                '"'
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
      this.getAllLinkedComputeResources();
      snackbarMessages.push(
        this.utilService.generateFinishingSnackarMessage(
          successfulDeletions,
          event.elements.length,
          'compute resources',
          'unlinked'
        )
      );
      this.utilService.callSnackBarSequence(snackbarMessages);
    });
  }

  onDatalistConfigChanged(event): void {
    this.getPagedLinkedComputeResources(event);
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

  getHateaosDataFromGenericService(url: string): Observable<any> {
    return this.genericDataService.getData(url).pipe((data) => data);
  }

  onPageChanged(event): void {
    this.getHateaosDataFromGenericService(event).subscribe((data) => {
      this.updateDisplayedData(data);
    });
  }
}
