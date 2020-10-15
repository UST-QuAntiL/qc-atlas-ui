import { Component, Input, OnInit } from '@angular/core';
import { EntityModelSoftwarePlatformDto } from 'api-atlas/models/entity-model-software-platform-dto';
import { ExecutionEnvironmentsService } from 'api-atlas/services/execution-environments.service';
import { Router } from '@angular/router';
import { ImplementationDto } from 'api-atlas/models/implementation-dto';
import { ImplementationsService } from 'api-atlas/services/implementations.service';
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
  selector: 'app-software-platform-impl-list',
  templateUrl: './software-platform-impl-list.component.html',
  styleUrls: ['./software-platform-impl-list.component.scss'],
})
export class SoftwarePlatformImplListComponent implements OnInit {
  @Input() softwarePlatform: EntityModelSoftwarePlatformDto;
  displayedData = [];
  tableColumns = [
    'Name',
    'Description',
    'Contributors',
    'Assumptions',
    'Version',
  ];
  variableNames = [
    'name',
    'description',
    'contributors',
    'assumptions',
    'version',
  ];
  linkObject: LinkObject = {
    title: 'Link software platform with ',
    subtitle: 'Search implementation by name',
    displayVariable: 'name',
    data: [],
    linkedData: [],
  };
  dialogData: DialogData = {
    title: 'Link existing implementations',
    linkObject: this.linkObject,
    tableColumns: ['Name', 'Description', 'Version'],
    variableNames: ['name', 'description', 'version'],
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
    private implementationService: ImplementationsService,
    private router: Router,
    private utilService: UtilService,
    private genericDataService: GenericDataService
  ) {}

  ngOnInit(): void {
    this.linkObject.title += this.softwarePlatform.name;
    this.getAllLinkedImplementations();
  }

  getAllImplementations(search?: QueryParams): Observable<any> {
    return this.implementationService
      .getImplementations(search)
      .pipe((data) => data);
  }

  getAllLinkedImplementations(): void {
    this.linkObject.linkedData = [];
    this.executionEnvironmentService
      .getImplementationsOfSoftwarePlatform({
        softwarePlatformId: this.softwarePlatform.id,
      })
      .subscribe((data) => {
        if (data._embedded) {
          this.linkObject.linkedData = data._embedded.implementations;
        }
      });
  }

  getPagedLinkedImplementations(params: any): void {
    this.executionEnvironmentService
      .getImplementationsOfSoftwarePlatform({
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
    // If implementations found
    if (data._embedded) {
      this.displayedData = data._embedded.implementations;
    }
    this.pagingInfo.page = data.page;
    this.pagingInfo._links = data._links;
  }

  updateLinkDialogData(data): void {
    // clear link object data
    this.linkObject.data = [];
    // If implementations found
    if (data._embedded) {
      this.linkObject.data = data._embedded.implementations;
    }
    this.dialogData.pagingInfo.page = data.page;
    this.dialogData.pagingInfo._links = data._links;
  }

  openLinkImplementationDialog(): void {
    this.getAllImplementations().subscribe((data) => {
      this.updateLinkDialogData(data);
      const dialogRef = this.utilService.createDialog(
        LinkItemListDialogComponent,
        this.dialogData,
        1000,
        700
      );
      const searchTextSub = dialogRef.componentInstance.onDataListConfigChanged.subscribe(
        (search: QueryParams) => {
          this.getAllImplementations(search).subscribe((updatedData) => {
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
        (element: ImplementationDto) => {
          this.routeToImplementation(element);
          dialogRef.close();
        }
      );

      dialogRef.afterClosed().subscribe((dialogResult) => {
        searchTextSub.unsubscribe();
        pagingSub.unsubscribe();
        elementClickedSub.unsubscribe();
        if (dialogResult) {
          this.linkImplementations(dialogResult.selectedItems);
        }
      });
    });
  }

  linkImplementations(implementations: ImplementationDto[]): void {
    // Empty unlinked implementations
    this.linkObject.data = [];
    const linkTasks = [];
    const snackbarMessages = [];
    let successfulLinks = 0;
    for (const implementation of implementations) {
      linkTasks.push(
        this.executionEnvironmentService
          .linkSoftwarePlatformAndImplementation({
            softwarePlatformId: this.softwarePlatform.id,
            body: implementation,
          })
          .toPromise()
          .then(() => {
            successfulLinks++;
            snackbarMessages.push(
              'Successfully linked implementation "' + implementation.name + '"'
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
      this.getAllLinkedImplementations();
      snackbarMessages.push(
        this.utilService.generateFinishingSnackbarMessage(
          successfulLinks,
          implementations.length,
          'implementations',
          'linked'
        )
      );
      this.utilService.callSnackBarSequence(snackbarMessages);
    });
  }

  unlinkImplementations(event): void {
    const deletionTasks = [];
    const snackbarMessages = [];
    let successfulDeletions = 0;
    for (const implementation of event.elements) {
      deletionTasks.push(
        this.executionEnvironmentService
          .unlinkSoftwarePlatformAndImplementation({
            softwarePlatformId: this.softwarePlatform.id,
            implementationId: implementation.id,
          })
          .toPromise()
          .then(() => {
            successfulDeletions++;
            snackbarMessages.push(
              'Successfully unlinked implementation "' +
                implementation.name +
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
      this.getAllLinkedImplementations();
      snackbarMessages.push(
        this.utilService.generateFinishingSnackbarMessage(
          successfulDeletions,
          event.elements.length,
          'implementations',
          'unlinked'
        )
      );
      this.utilService.callSnackBarSequence(snackbarMessages);
    });
  }

  onDatalistConfigChanged(event): void {
    this.getPagedLinkedImplementations(event);
  }

  onElementClicked(implementation: ImplementationDto): void {
    this.routeToImplementation(implementation);
  }

  routeToImplementation(implementation: ImplementationDto): void {
    this.router.navigate([
      'algorithms',
      implementation.implementedAlgorithmId,
      'implementations',
      implementation.id,
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
