import { Component, Input, OnInit } from '@angular/core';
import { EntityModelAlgorithmDto } from 'api-atlas/models/entity-model-algorithm-dto';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import { PublicationService } from 'api-atlas/services/publication.service';
import { Router } from '@angular/router';
import { PublicationDto } from 'api-atlas/models/publication-dto';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
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
    private utilService: UtilService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.linkObject.title += this.algorithm.name;
    this.getAllLinkedPublications();
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

  getLinkedPublications(params?: any): void {
    this.algorithmService
      .getPublicationsOfAlgorithm({
        algorithmId: this.algorithm.id,
        page: params.page,
        size: params.size,
        sort: params.sort,
        search: params.sort,
      })
      .subscribe((data) => {
        this.updateLinkedPublicationData(data);
      });
  }

  updateLinkedPublicationData(data): void {
    // clear link object data
    this.displayedData = [];
    // If publications found
    if (data._embedded) {
      this.displayedData = data._embedded.publications;
    }
    this.pagingInfo.page = data.page;
    this.pagingInfo._links = data._links;
  }

  updatePublicationData(data): void {
    // clear link object data
    this.linkObject.data = [];
    // If publications found
    if (data._embedded) {
      this.linkObject.data = data._embedded.publications;
    }
    this.dialogData.pagingInfo.page = data.page;
    this.dialogData.pagingInfo._links = data._links;
  }

  openLinkPublicationDialog() {
    this.publicationService.getPublications().subscribe((data) => {
      this.updatePublicationData(data);
      const dialogRef = this.dialog.open(LinkItemListDialogComponent, {
        width: '800px',
        data: this.dialogData,
      });
      const searchTextSub = dialogRef.componentInstance.onDataListConfigChanged.subscribe(
        (search: QueryParams) => {
          this.publicationService
            .getPublications(search)
            .subscribe((updatedData) => {
              this.updatePublicationData(updatedData);
              dialogRef.componentInstance.data.linkObject = this.linkObject;
            });
        }
      );
      const pagingSub = dialogRef.componentInstance.onPageChanged.subscribe(
        (page: string) => {
          this.genericDataService.getData(page).subscribe((pageData) => {
            this.updatePublicationData(pageData);
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
    let successfulLinks = 0;
    for (const publication of publications) {
      linkTasks.push(
        this.algorithmService
          .linkAlgorithmAndPublication({
            algorithmId: this.algorithm.id,
            body: publication,
          })
          .toPromise()
          .then(() => successfulLinks++)
      );
    }
    forkJoin(linkTasks).subscribe(() => {
      this.getLinkedPublicationsHateoas(this.pagingInfo._links.self.href);
      this.getAllLinkedPublications();
      const snackbarText =
        successfulLinks > 1
          ? 'Successfully linked ' + successfulLinks + ' publications'
          : 'Publication sucessfully linked';
      this.utilService.callSnackBar(snackbarText);
    });
  }

  unlinkPublications(event): void {
    const deletionTasks = [];
    let successfulDeletions = 0;
    for (const publication of event.elements) {
      deletionTasks.push(
        this.algorithmService
          .unlinkAlgorithmAndPublication({
            algorithmId: this.algorithm.id,
            publicationId: publication.id,
          })
          .toPromise()
          .then(() => successfulDeletions++)
      );
    }
    forkJoin(deletionTasks).subscribe(() => {
      if (
        this.utilService.isLastPageEmptyAfterDeletion(
          successfulDeletions,
          this.linkObject.linkedData.length,
          this.pagingInfo
        )
      ) {
        this.getLinkedPublicationsHateoas(this.pagingInfo._links.prev.href);
      } else {
        this.getLinkedPublicationsHateoas(this.pagingInfo._links.self.href);
      }
      this.getAllLinkedPublications();
      const snackbarText =
        successfulDeletions > 1
          ? 'Successfully unlinked ' + successfulDeletions + ' publications'
          : 'Publication sucessfully unlinked';
      this.utilService.callSnackBar(snackbarText);
    });
  }

  onDatalistConfigChanged(event): void {
    this.getLinkedPublications(event);
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

  getLinkedPublicationsHateoas(url: string): void {
    this.genericDataService.getData(url).subscribe((data) => {
      this.updateLinkedPublicationData(data);
    });
  }

  onPageChanged(event): void {
    this.getLinkedPublicationsHateoas(event);
  }
}
