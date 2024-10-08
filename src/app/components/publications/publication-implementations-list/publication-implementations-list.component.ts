import { Component, Input, OnInit } from '@angular/core';
import { PublicationDto } from 'api-atlas/models/publication-dto';
import { Router } from '@angular/router';
import { PublicationService } from 'api-atlas/services/publication.service';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import { ImplementationDto } from 'api-atlas/models/implementation-dto';
import { forkJoin, Observable } from 'rxjs';
import { ImplementationsService } from 'api-atlas/services/implementations.service';
import { PageImplementationDto } from 'api-atlas/models/page-implementation-dto';
import {
  LinkObject,
  QueryParams,
} from '../../generics/data-list/data-list.component';
import {
  DialogData,
  LinkItemListDialogComponent,
} from '../../generics/dialogs/link-item-list-dialog.component';
import { UtilService } from '../../../util/util.service';
import { PaginatorConfig } from '../../../util/paginatorConfig';
import { PagingInfo } from '../../../util/PagingInfo';

@Component({
  selector: 'app-publication-implementations-list',
  templateUrl: './publication-implementations-list.component.html',
  styleUrls: ['./publication-implementations-list.component.scss'],
})
export class PublicationImplementationsListComponent implements OnInit {
  @Input() publication: PublicationDto;
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
    title: 'Link publication with ',
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
  pagingInfo: PagingInfo<ImplementationDto> = {};
  paginatorConfig: PaginatorConfig = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };

  constructor(
    private publicationService: PublicationService,
    private algorithmService: AlgorithmService,
    private implementationService: ImplementationsService,
    private router: Router,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.linkObject.title += this.publication.title;
    this.getAllLinkedImplementations();
  }

  getAllImplementations(
    search?: QueryParams
  ): Observable<PageImplementationDto> {
    return this.implementationService
      .getImplementations(search)
      .pipe((data) => data);
  }

  getAllLinkedImplementations(params: QueryParams = {}): void {
    this.linkObject.linkedData = [];
    this.publicationService
      .getImplementationsOfPublication({
        publicationId: this.publication.id,
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
            'Error! Linked implementations could not be retrieved.'
          );
        }
      );
  }

  updateDisplayedData(data): void {
    // clear link object data
    this.displayedData = [];
    // If implementations found
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
    // If implementations found
    if (data.content) {
      this.linkObject.data = data.content;
    }
    this.dialogData.pagingInfo.totalPages = data.totalPages;
    this.dialogData.pagingInfo.number = data.number;
    this.dialogData.pagingInfo.size = data.size;
    this.dialogData.pagingInfo.sort = data.sort;
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
        (page: QueryParams) => {
          this.getAllImplementations(page).subscribe((pageData) => {
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
          this.linkAlgorithms(dialogResult.selectedItems);
        }
      });
    });
  }

  linkAlgorithms(implementations: ImplementationDto[]): void {
    // Empty unlinked implementations
    this.linkObject.data = [];
    const linkTasks = [];
    const snackbarMessages = [];
    let successfulLinks = 0;
    for (const implementation of implementations) {
      linkTasks.push(
        this.algorithmService
          .linkImplementationAndPublication({
            algorithmId: implementation.implementedAlgorithmId,
            implementationId: implementation.id,
            body: this.publication,
          })
          .toPromise()
          .then(() => {
            successfulLinks++;
            snackbarMessages.push(
              'Successfully linked implementation "' +
                implementation.name +
                '".'
            );
          })
          .catch(() => {
            snackbarMessages.push(
              'Error! Could not link implementation "' +
                implementation.name +
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
      this.getAllLinkedImplementations(parameters);
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
        this.algorithmService
          .unlinkImplementationAndPublication({
            algorithmId: implementation.implementedAlgorithmId,
            implementationId: implementation.id,
            publicationId: this.publication.id,
          })
          .toPromise()
          .then(() => {
            successfulDeletions++;
            snackbarMessages.push(
              'Successfully unlinked implementation "' +
                implementation.name +
                '".'
            );
          })
          .catch(() => {
            snackbarMessages.push(
              'Error! Could not unlink implementation "' +
                implementation.name +
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
      this.getAllLinkedImplementations(event.queryParams);
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

  routeToImplementation(implementation: ImplementationDto): void {
    this.router.navigate([
      'algorithms',
      implementation.implementedAlgorithmId,
      'implementations',
      implementation.id,
    ]);
  }
}
