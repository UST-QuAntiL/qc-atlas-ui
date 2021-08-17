import { Component, Input, OnInit } from '@angular/core';
import { ExecutionEnvironmentsService } from 'api-atlas/services/execution-environments.service';
import { ImplementationDto } from 'api-atlas/models/implementation-dto';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import { Router } from '@angular/router';
import { SoftwarePlatformDto } from 'api-atlas/models/software-platform-dto';
import { forkJoin, Observable } from 'rxjs';
import { PageSoftwarePlatformDto } from 'api-atlas/models/page-software-platform-dto';
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
  pagingInfo: PageSoftwarePlatformDto = {};
  paginatorConfig: PaginatorConfig = {
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
    private router: Router,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.linkObject.title += this.implementation.name;
    this.getAllLinkedSoftwarePlatforms();
  }

  getAllSoftwarePlatforms(
    search?: QueryParams
  ): Observable<PageSoftwarePlatformDto> {
    return this.executionEnvironmentsService
      .getSoftwarePlatforms(search)
      .pipe((data) => data);
  }

  getAllLinkedSoftwarePlatforms(params: QueryParams = {}): void {
    this.linkObject.linkedData = [];
    this.algorithmService
      .getSoftwarePlatformsOfImplementation({
        algorithmId: this.implementation.implementedAlgorithmId,
        implementationId: this.implementation.id,
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
            'Error! Linked software platforms could not be retrieved.'
          );
        }
      );
  }

  updateDisplayedData(data): void {
    // clear link object data
    this.displayedData = [];
    // If software platforms found
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
    // If software platforms found
    if (data.content) {
      this.linkObject.data = data.content;
    }
    this.dialogData.pagingInfo.totalPages = data.totalPages;
    this.dialogData.pagingInfo.number = data.number;
    this.dialogData.pagingInfo.size = data.size;
    this.dialogData.pagingInfo.sort = data.sort;
  }

  openLinkSoftwarePlatformDialog(): void {
    this.getAllSoftwarePlatforms().subscribe((data) => {
      this.updateLinkDialogData(data);
      const dialogRef = this.utilService.createDialog(
        LinkItemListDialogComponent,
        this.dialogData,
        1000,
        700
      );
      const searchTextSub = dialogRef.componentInstance.onDataListConfigChanged.subscribe(
        (search: QueryParams) => {
          this.getAllSoftwarePlatforms(search).subscribe((updatedData) => {
            this.updateLinkDialogData(updatedData);
            dialogRef.componentInstance.data.linkObject = this.linkObject;
          });
        }
      );
      const pagingSub = dialogRef.componentInstance.onPageChanged.subscribe(
        (page: QueryParams) => {
          this.getAllSoftwarePlatforms(page).subscribe((pageData) => {
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
                '".'
            );
          })
          .catch(() => {
            snackbarMessages.push(
              'Error! Could not link software platform "' +
                softwarePlatform.name +
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
      this.getAllLinkedSoftwarePlatforms(parameters);
      snackbarMessages.push(
        this.utilService.generateFinishingSnackbarMessage(
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
                '".'
            );
          })
          .catch(() => {
            snackbarMessages.push(
              'Error! Could not unlink software platform "' +
                softwarePlatform.name +
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
      this.getAllLinkedSoftwarePlatforms(event.queryParams);
      snackbarMessages.push(
        this.utilService.generateFinishingSnackbarMessage(
          successfulDeletions,
          event.elements.length,
          'software platforms',
          'unlinked'
        )
      );
      this.utilService.callSnackBarSequence(snackbarMessages);
    });
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
}
