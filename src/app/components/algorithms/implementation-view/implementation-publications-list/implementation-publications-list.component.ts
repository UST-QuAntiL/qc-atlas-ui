import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImplementationDto } from 'api-atlas/models/implementation-dto';
import { PagePublicationDto } from 'api-atlas/models/page-publication-dto';
import { PublicationDto } from 'api-atlas/models/publication-dto';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import { PublicationService } from 'api-atlas/services/publication.service';
import { forkJoin, Observable } from 'rxjs';
import { PaginatorConfig } from '../../../../util/paginatorConfig';
import { PagingInfo } from '../../../../util/PagingInfo';
import { UtilService } from '../../../../util/util.service';
import {
  LinkObject,
  QueryParams,
  UrlData,
} from '../../../generics/data-list/data-list.component';
import {
  DialogData,
  LinkItemListDialogComponent,
} from '../../../generics/dialogs/link-item-list-dialog.component';

@Component({
  selector: 'app-implementation-publications-list',
  templateUrl: './implementation-publications-list.component.html',
  styleUrls: ['./implementation-publications-list.component.scss'],
})
export class ImplementationPublicationsListComponent implements OnInit {
  @Input() implementation: ImplementationDto;

  variableNames: string[] = ['title', 'authors', 'doi', 'url'];
  tableColumns: string[] = ['Title', 'Authors', 'DOI', 'URL'];
  externalLinkVariables = ['url'];
  displayedData = [];
  linkObject: LinkObject = {
    title: 'Link publication with ',
    subtitle: 'Search publications by title',
    displayVariable: 'title',
    data: [],
    linkedData: [],
  };
  dialogData: DialogData = {
    title: 'Link existing publication',
    linkObject: this.linkObject,
    tableColumns: ['Name', 'Authors'],
    variableNames: ['title', 'authors'],
    noButtonText: 'Cancel',
    pagingInfo: {},
    paginatorConfig: {
      amountChoices: [10, 25, 50],
      selectedAmount: 10,
    },
  };
  tableAddAllowed = true;
  pagingInfo: PagingInfo<PublicationDto> = {};
  paginatorConfig: PaginatorConfig = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };

  constructor(
    private algorithmService: AlgorithmService,
    private publicationService: PublicationService,
    private router: Router,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.linkObject.title += this.implementation.name;
    this.getAllLinkedPublications();
  }

  getAllPublications(search?: QueryParams): Observable<PagePublicationDto> {
    return this.publicationService.getPublications(search).pipe((data) => data);
  }

  getAllLinkedPublications(params: QueryParams = {}): void {
    this.linkObject.linkedData = [];
    this.algorithmService
      .getPublicationsOfImplementation({
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
            'Error! Linked publications could not be retrieved.'
          );
        }
      );
  }

  updateDisplayedData(data): void {
    // clear link object data
    this.displayedData = [];
    // If publications found
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
    // If publications found
    if (data.content) {
      this.linkObject.data = data.content;
    }
    this.dialogData.pagingInfo.totalPages = data.totalPages;
    this.dialogData.pagingInfo.number = data.number;
    this.dialogData.pagingInfo.size = data.size;
    this.dialogData.pagingInfo.sort = data.sort;
  }

  openLinkPublicationDialog(): void {
    this.getAllPublications().subscribe((data) => {
      this.updateLinkDialogData(data);
      const dialogRef = this.utilService.createDialog(
        LinkItemListDialogComponent,
        this.dialogData,
        1000,
        700
      );
      const searchTextSub = dialogRef.componentInstance.onDataListConfigChanged.subscribe(
        (search: QueryParams) => {
          this.getAllPublications(search).subscribe((updatedData) => {
            this.updateLinkDialogData(updatedData);
            dialogRef.componentInstance.data.linkObject = this.linkObject;
          });
        }
      );
      const pagingSub = dialogRef.componentInstance.onPageChanged.subscribe(
        (page: QueryParams) => {
          this.getAllPublications(page).subscribe((pageData) => {
            this.updateLinkDialogData(pageData);
            dialogRef.componentInstance.data.linkObject = this.linkObject;
          });
        }
      );
      const elementClickedSub = dialogRef.componentInstance.onElementClicked.subscribe(
        (element: PublicationDto) => {
          this.routeToPublication(element);
          dialogRef.close();
        }
      );

      dialogRef.afterClosed().subscribe((dialogResult) => {
        searchTextSub.unsubscribe();
        pagingSub.unsubscribe();
        elementClickedSub.unsubscribe();
        if (dialogResult) {
          this.linkPublications(dialogResult.selectedItems);
        }
      });
    });
  }

  linkPublications(publications: PublicationDto[]): void {
    // Empty unlinked publications
    this.linkObject.data = [];
    const linkTasks = [];
    const snackbarMessages = [];
    let successfulLinks = 0;
    for (const publication of publications) {
      linkTasks.push(
        this.algorithmService
          .linkImplementationAndPublication({
            algorithmId: this.implementation.implementedAlgorithmId,
            implementationId: this.implementation.id,
            body: publication,
          })
          .toPromise()
          .then(() => {
            successfulLinks++;
            snackbarMessages.push(
              'Successfully linked publication "' + publication.title + '".'
            );
          })
          .catch(() => {
            snackbarMessages.push(
              'Error! Could not link publication "' + publication.title + '".'
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
      this.getAllLinkedPublications(parameters);
      snackbarMessages.push(
        this.utilService.generateFinishingSnackbarMessage(
          successfulLinks,
          publications.length,
          'publications',
          'linked'
        )
      );
      this.utilService.callSnackBarSequence(snackbarMessages);
    });
  }

  unlinkPublications(event): void {
    const deletionTasks = [];
    const snackbarMessages = [];
    let successfulDeletions = 0;
    for (const publication of event.elements) {
      deletionTasks.push(
        this.algorithmService
          .unlinkImplementationAndPublication({
            algorithmId: this.implementation.implementedAlgorithmId,
            implementationId: this.implementation.id,
            publicationId: publication.id,
          })
          .toPromise()
          .then(() => {
            successfulDeletions++;
            snackbarMessages.push(
              'Successfully unlinked publication "' + publication.title + '".'
            );
          })
          .catch(() => {
            snackbarMessages.push(
              'Error! Could not unlink publication "' + publication.title + '".'
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
      this.getAllLinkedPublications(event.queryParams);
      snackbarMessages.push(
        this.utilService.generateFinishingSnackbarMessage(
          successfulDeletions,
          event.elements.length,
          'publications',
          'unlinked'
        )
      );
      this.utilService.callSnackBarSequence(snackbarMessages);
    });
  }

  onUrlClicked(urlData: UrlData): void {
    // No check needed since publications have only one url-field called 'url'
    window.open(urlData.element['url'], '_blank');
  }

  routeToPublication(publication: PublicationDto): void {
    this.router.navigate(['publications', publication.id]);
  }
}
