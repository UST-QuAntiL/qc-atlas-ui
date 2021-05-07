import { Component, Input, OnInit } from '@angular/core';
import { SoftwarePlatformDto } from 'api-atlas/models/software-platform-dto';
import { ExecutionEnvironmentsService } from 'api-atlas/services/execution-environments.service';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { ComputeResourceDto } from 'api-atlas/models/compute-resource-dto';
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
  selector: 'app-software-platform-compute-resource-list',
  templateUrl: './software-platform-compute-resource-list.component.html',
  styleUrls: ['./software-platform-compute-resource-list.component.scss'],
})
export class SoftwarePlatformComputeResourceListComponent implements OnInit {
  @Input() softwarePlatform: SoftwarePlatformDto;
  displayedData = [];
  tableColumns = ['Name', 'Vendor', 'Technology', 'Quantum Computation Model'];
  variableNames = ['name', 'vendor', 'technology', 'quantumComputationModel'];
  linkObject: LinkObject = {
    title: 'Link software platform with ',
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
    this.linkObject.title += this.softwarePlatform.name;
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
      .getComputeResourcesOfSoftwarePlatform({
        softwarePlatformId: this.softwarePlatform.id,
      })
      .subscribe(
        (data) => {
          if (data.content) {
            this.linkObject.linkedData = data.content;
          }
        },
        () => {
          this.utilService.callSnackBar(
            'Error! Linked compute resources could not be retrieved.'
          );
        }
      );
  }

  getPagedLinkedComputeResources(params: any): void {
    this.executionEnvironmentService
      .getComputeResourcesOfSoftwarePlatform({
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
          .linkSoftwarePlatformAndComputeResource({
            softwarePlatformId: this.softwarePlatform.id,
            body: computeResource,
          })
          .toPromise()
          .then(() => {
            successfulLinks++;
            snackbarMessages.push(
              'Successfully linked compute resource "' +
                computeResource.name +
                '"'
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
          .unlinkSoftwarePlatformAndComputeResource({
            softwarePlatformId: this.softwarePlatform.id,
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
