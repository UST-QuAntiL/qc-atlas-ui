import { Component, Input, OnInit } from '@angular/core';
import { ExecutionEnvironmentsService } from 'api-atlas/services/execution-environments.service';
import { ImplementationDto } from 'api-atlas/models/implementation-dto';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import { Router } from '@angular/router';
import { SoftwarePlatformDto } from 'api-atlas/models/software-platform-dto';
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
  selector: 'app-implementation-softwareplatform-list',
  templateUrl: './implementation-softwareplatform-list.component.html',
  styleUrls: ['./implementation-softwareplatform-list.component.scss'],
})
export class ImplementationSoftwareplatformListComponent implements OnInit {
  @Input() implementation: ImplementationDto;

  variableNames: string[] = ['name', 'link', 'license', 'version'];
  tableColumns: string[] = ['Name', 'Link', 'License', 'Version'];
  externalLinkVariables = ['link'];
  displayedData = [];
  linkObject: LinkObject = {
    title: 'Link software platform with ',
    subtitle: 'Search software platform by name',
    displayVariable: 'name',
    data: [],
    linkedData: [],
  };
  pagingInfo: any = {};
  paginatorConfig: any = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };

  dialogData: DialogData = {
    title: 'Link existing software platforms',
    linkObject: this.linkObject,
    tableColumns: ['Name', 'Version', 'Licence'],
    variableNames: ['name', 'version', 'licence'],
    noButtonText: 'Cancel',
    pagingInfo: {},
    paginatorConfig: {
      amountChoices: [10, 25, 50],
      selectedAmount: 10,
    },
  };

  constructor(
    private executionEnvironmentsService: ExecutionEnvironmentsService,
    private algorithmService: AlgorithmService,
    private genericDataService: GenericDataService,
    private router: Router,
    private utilService: UtilService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.linkObject.title += this.implementation.name;
    this.getAllLinkedSoftwarePlatforms();
  }

  getAllSoftwarePlatforms(search?: QueryParams): Observable<any> {
    return this.executionEnvironmentsService
      .getSoftwarePlatforms(search)
      .pipe((data) => data);
  }

  getAllLinkedSoftwarePlatforms(): void {
    this.linkObject.linkedData = [];
    this.algorithmService
      .getSoftwarePlatformsOfImplementation({
        algorithmId: this.implementation.implementedAlgorithmId,
        implementationId: this.implementation.id,
      })
      .subscribe((data) => {
        if (data._embedded) {
          this.linkObject.linkedData = data._embedded.softwarePlatforms;
        }
      });
  }

  getPagedLinkedSoftwarePlatforms(params: any): void {
    this.algorithmService
      .getSoftwarePlatformsOfImplementation({
        algorithmId: this.implementation.implementedAlgorithmId,
        implementationId: this.implementation.id,
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
    // If software platforms found
    if (data._embedded) {
      this.displayedData = data._embedded.softwarePlatforms;
    }
    this.pagingInfo.page = data.page;
    this.pagingInfo._links = data._links;
  }

  updateLinkDialogData(data): void {
    // clear link object data
    this.linkObject.data = [];
    // If software platforms found
    if (data._embedded) {
      this.linkObject.data = data._embedded.softwarePlatforms;
    }
    this.dialogData.pagingInfo.page = data.page;
    this.dialogData.pagingInfo._links = data._links;
  }

  openLinkSoftwarePlatformDialog() {
    this.getAllSoftwarePlatforms().subscribe((data) => {
      this.updateLinkDialogData(data);
      const dialogRef = this.dialog.open(LinkItemListDialogComponent, {
        width: '800px',
        data: this.dialogData,
      });
      const searchTextSub = dialogRef.componentInstance.onDataListConfigChanged.subscribe(
        (search: QueryParams) => {
          this.getAllSoftwarePlatforms(search).subscribe((updatedData) => {
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
        (element: SoftwarePlatformDto) => {
          this.routeToSoftwarePlatform(element);
          dialogRef.close();
        }
      );

      dialogRef.afterClosed().subscribe((dialogResult) => {
        searchTextSub.unsubscribe();
        pagingSub.unsubscribe();
        elementClickedSub.unsubscribe();
        if (dialogResult) {
          this.linkSoftwarePlatforms(dialogResult.selectedItems);
        }
      });
    });
  }

  linkSoftwarePlatforms(softwarePlatforms: SoftwarePlatformDto[]): void {
    // Empty unlinked software platforms
    this.linkObject.data = [];
    const linkTasks = [];
    const snackbarMessages = [];
    let successfulLinks = 0;
    for (const softwarePlatform of softwarePlatforms) {
      linkTasks.push(
        this.algorithmService
          .linkImplementationAndSoftwarePlatform({
            algorithmId: this.implementation.implementedAlgorithmId,
            implementationId: this.implementation.id,
            body: softwarePlatform,
          })
          .toPromise()
          .then(() => {
            successfulLinks++;
            snackbarMessages.push(
              'Successfully linked software platform "' +
                softwarePlatform.name +
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
      this.getAllLinkedSoftwarePlatforms();
      snackbarMessages.push(
        this.utilService.generateFinalDeletionMessage(
          successfulLinks,
          softwarePlatforms.length,
          'software platforms',
          'linked'
        )
      );
      this.utilService.callSnackBarSequence(snackbarMessages);
    });
  }

  unlinkSoftwarePlatforms(event): void {
    const deletionTasks = [];
    const snackbarMessages = [];
    let successfulDeletions = 0;
    for (const softwarePlatform of event.elements) {
      deletionTasks.push(
        this.algorithmService
          .unlinkImplementationAndSoftwarePlatform({
            algorithmId: this.implementation.implementedAlgorithmId,
            implementationId: this.implementation.id,
            softwarePlatformId: softwarePlatform.id,
          })
          .toPromise()
          .then(() => {
            successfulDeletions++;
            snackbarMessages.push(
              'Successfully unlinked software platform "' +
                softwarePlatform.name +
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
      this.getAllLinkedSoftwarePlatforms();
      snackbarMessages.push(
        this.utilService.generateFinalDeletionMessage(
          successfulDeletions,
          event.elements.length,
          'software platforms',
          'unlinked'
        )
      );
      this.utilService.callSnackBarSequence(snackbarMessages);
    });
  }

  onDatalistConfigChanged(event): void {
    this.getPagedLinkedSoftwarePlatforms(event);
  }

  onElementClicked(softwarePlatform: SoftwarePlatformDto): void {
    this.routeToSoftwarePlatform(softwarePlatform);
  }

  onUrlClicked(urlData: UrlData): void {
    // No check needed since software platforms have only one url-field called 'link'
    window.open(urlData.element['link'], '_blank');
  }

  routeToSoftwarePlatform(softwarePlatform: SoftwarePlatformDto): void {
    this.router.navigate([
      'execution-environments',
      'software-platforms',
      softwarePlatform.id,
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
