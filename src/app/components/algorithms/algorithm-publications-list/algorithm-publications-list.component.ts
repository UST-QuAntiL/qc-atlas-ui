import { Component, Input, OnInit } from '@angular/core';
import { EntityModelAlgorithmDto } from 'api-atlas/models/entity-model-algorithm-dto';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import { EntityModelPublicationDto } from 'api-atlas/models/entity-model-publication-dto';
import { PublicationService } from 'api-atlas/services/publication.service';
import { Router } from '@angular/router';
import { PublicationDto } from 'api-atlas/models/publication-dto';
import { MatDialog } from '@angular/material/dialog';
import {
  LinkObject,
  QueryParams,
} from '../../generics/data-list/data-list.component';
import { UtilService } from '../../../util/util.service';
import { ConfirmDialogComponent } from '../../generics/dialogs/confirm-dialog.component';
import { LinkItemListDialogComponent } from '../../generics/dialogs/link-item-list-dialog.component';
import { GenericDataService } from '../../../util/generic-data.service';

@Component({
  selector: 'app-algorithm-publications-list',
  templateUrl: './algorithm-publications-list.component.html',
  styleUrls: ['./algorithm-publications-list.component.scss'],
})
export class AlgorithmPublicationsListComponent implements OnInit {
  @Input() algorithm: EntityModelAlgorithmDto;

  variableNames: string[] = ['title', 'authors', 'doi'];
  tableColumns: string[] = ['Title', 'Authors', 'DOI'];
  linkObject: LinkObject = {
    title: 'Link publication with ',
    subtitle: 'Search publications by title',
    displayVariable: 'title',
    data: [],
  };
  tableAddAllowed = true;
  isLinkingEnabled = false;
  pagingInfo: any = {};
  paginatorConfig: any = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };
  linkedPublications: EntityModelPublicationDto[] = [];

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
    this.getLinkedPublications({ algoId: this.algorithm.id });
  }

  getLinkedPublications(params): void {
    this.algorithmService
      .getPublicationsByAlgorithm(params)
      .subscribe((publications) => {
        // this.linkedPublications = [];
        if (publications._embedded) {
          this.linkedPublications = publications._embedded.publications;
        }
      });
  }

  preparePublicationData(data): void {
    // Read all incoming data
    // If linkable publications found
    // this.linkObject.data = [];
    if (data._embedded) {
      this.linkObject.data = data._embedded.publications;
      // // Clear list of linkable algorithms
      // // Search algorithms and filter only those that are not already linked
      // for (const publication of data._embedded.publications) {
      //   this.linkObject.data.push(publication);
      //   if (
      //     !this.linkedPublications.some((publ) => publ.id === publication.id)
      //   ) {
      //     this.unlinkedPublications.push(publication);
      //   }
      // }
    }
    this.pagingInfo.page = data.page;
    this.pagingInfo._links = data._links;
  }

  linkPublication(publication: PublicationDto): void {
    // Empty unlinked algorithms
    this.linkObject.data = [];
    // Link algorithm
    this.algorithmService
      .addPublication({ algoId: this.algorithm.id, body: publication })
      .subscribe((data) => {
        this.getLinkedPublications({ algoId: this.algorithm.id });
        this.utilService.callSnackBar('Successfully linked Publication');
      });
  }

  async unlinkPublications(event): Promise<void> {
    // Iterate all selected algorithms
    for (const publication of event.elements) {
      await this.algorithmService
        .deleteReferenceToPublication({
          algoId: this.algorithm.id,
          publicationId: publication.id,
        })
        .toPromise();
      this.getLinkedPublications({ algoId: this.algorithm.id });
      this.utilService.callSnackBar('Successfully unlinked Publication');
    }
  }

  onDatalistConfigChanged(event): void {
    this.getLinkedPublications({ algoId: this.algorithm.id });
  }

  onElementClicked(publication: PublicationDto): void {
    this.routeTo(publication);
  }

  routeTo(publication: PublicationDto): void {
    this.router.navigate(['publications', publication.id]);
  }

  onToggleLink(): void {
    this.isLinkingEnabled = !this.isLinkingEnabled;
    this.tableAddAllowed = !this.tableAddAllowed;
  }

  openLinkPublicationDialog() {
    this.publicationService.getPublications().subscribe((data) => {
      this.preparePublicationData(JSON.parse(JSON.stringify(data)));
      const dialogRef = this.dialog.open(LinkItemListDialogComponent, {
        width: '800px',
        data: {
          title: 'Link existing publication',
          data: this.linkObject.data,
          tableColumns: ['Name', 'Authors'],
          variableNames: ['title', 'authors'],
          pagingInfo: this.pagingInfo,
          paginatorConfig: this.paginatorConfig,
          noButtonText: 'Cancel',
        },
      });
      const searchTextSub = dialogRef.componentInstance.onDataListConfigChanged.subscribe(
        (search: QueryParams) => {
          this.publicationService
            .getPublications(search)
            .subscribe((updatedData) => {
              this.preparePublicationData(
                JSON.parse(JSON.stringify(updatedData))
              );
              dialogRef.componentInstance.data.data = this.linkObject.data;
            });
        }
      );
      const pagingSub = dialogRef.componentInstance.onPageChanged.subscribe(
        (page: string) => {
          this.genericDataService.getData(page).subscribe((pageData) => {
            this.preparePublicationData(pageData);
            dialogRef.componentInstance.data.data = this.linkObject.data;
          });
        }
      );
      const elementClickedSub = dialogRef.componentInstance.onElementClicked.subscribe(
        (element: PublicationDto) => {
          this.routeTo(element);
          dialogRef.close();
        }
      );

      dialogRef.afterClosed().subscribe((dialogResult) => {
        searchTextSub.unsubscribe();
        pagingSub.unsubscribe();
        elementClickedSub.unsubscribe();
        if (dialogResult) {
          for (const publication of dialogResult.selectedItems) {
            this.linkPublication(publication);
          }
        }
      });
    });
  }
}
