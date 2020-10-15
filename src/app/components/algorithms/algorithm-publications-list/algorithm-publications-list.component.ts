import { Component, Input, OnInit } from '@angular/core';
import { EntityModelAlgorithmDto } from 'api-atlas/models/entity-model-algorithm-dto';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import { PublicationService } from 'api-atlas/services/publication.service';
import { Router } from '@angular/router';
import { PublicationDto } from 'api-atlas/models/publication-dto';
import { forkJoin, Observable } from 'rxjs';
import {
  LinkObject,
  QueryParams,
  UrlData,
} from '../../generics/data-list/data-list.component';
import { UtilService } from '../../../util/util.service';
import {
  DialogData,
  LinkItemListDialogComponent,
} from '../../generics/dialogs/link-item-list-dialog.component';
import { GenericDataService } from '../../../util/generic-data.service';

@Component({
  selector: 'app-algorithm-publications-list',
  templateUrl: './algorithm-publications-list.component.html',
  styleUrls: ['./algorithm-publications-list.component.scss'],
})
export class AlgorithmPublicationsListComponent implements OnInit {
  @Input() algorithm: EntityModelAlgorithmDto;

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
  pagingInfo: any = {};
  paginatorConfig: any = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };

  constructor(
    private algorithmService: AlgorithmService,
    private publicationService: PublicationService,
    private genericDataService: GenericDataService,
    private router: Router,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.linkObject.title += this.algorithm.name;
    this.getAllLinkedPublications();
  }

  getAllPublications(search?: QueryParams): Observable<any> {
    return this.publicationService.getPublications(search).pipe((data) => data);
  }

  getAllLinkedPublications(): void {
    this.linkObject.linkedData = [];
    this.algorithmService
      .getPublicationsOfAlgorithm({ algorithmId: this.algorithm.id })
      .subscribe((data) => {
        if (data._embedded) {
          this.linkObject.linkedData = data._embedded.publications;
        }
      });
  }

  getPagedLinkedPublications(params: any): void {
    this.algorithmService
      .getPublicationsOfAlgorithm({
        algorithmId: this.algorithm.id,
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
    // If publications found
    if (data._embedded) {
      this.displayedData = data._embedded.publications;
    }
    this.pagingInfo.page = data.page;
    this.pagingInfo._links = data._links;
  }

  updateLinkDialogData(data): void {
    // clear link object data
    this.linkObject.data = [];
    // If publications found
    if (data._embedded) {
      this.linkObject.data = data._embedded.publications;
    }
    this.dialogData.pagingInfo.page = data.page;
    this.dialogData.pagingInfo._links = data._links;
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
        (page: string) => {
          this.getHateaosDataFromGenericService(page).subscribe((pageData) => {
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
          .linkAlgorithmAndPublication({
            algorithmId: this.algorithm.id,
            body: publication,
          })
          .toPromise()
          .then(() => {
            successfulLinks++;
            snackbarMessages.push(
              'Successfully linked publication "' + publication.title + '"'
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
      this.getAllLinkedPublications();
      snackbarMessages.push(
        this.utilService.generateFinishingSnackarMessage(
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
          .unlinkAlgorithmAndPublication({
            algorithmId: this.algorithm.id,
            publicationId: publication.id,
          })
          .toPromise()
          .then(() => {
            successfulDeletions++;
            snackbarMessages.push(
              'Successfully unlinked publication "' + publication.title + '"'
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
      this.getAllLinkedPublications();
      snackbarMessages.push(
        this.utilService.generateFinishingSnackarMessage(
          successfulDeletions,
          event.elements.length,
          'publications',
          'unlinked'
        )
      );
      this.utilService.callSnackBarSequence(snackbarMessages);
    });
  }

  onDatalistConfigChanged(event): void {
    this.getPagedLinkedPublications(event);
  }

  onElementClicked(publication: PublicationDto): void {
    this.routeToPublication(publication);
  }

  onUrlClicked(urlData: UrlData): void {
    // No check needed since publications have only one url-field called 'url'
    window.open(urlData.element['url'], '_blank');
  }

  routeToPublication(publication: PublicationDto): void {
    this.router.navigate(['publications', publication.id]);
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
