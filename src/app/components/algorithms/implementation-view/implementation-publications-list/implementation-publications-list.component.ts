import { Component, Input, OnInit } from '@angular/core';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import { PublicationService } from 'api-atlas/services/publication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityModelImplementationDto } from 'api-atlas/models/entity-model-implementation-dto';
import { PublicationDto } from 'api-atlas/models/publication-dto';
import { MatDialog } from '@angular/material/dialog';
import { GenericDataService } from '../../../../util/generic-data.service';
import { UtilService } from '../../../../util/util.service';
import { LinkItemListDialogComponent } from '../../../generics/dialogs/link-item-list-dialog.component';
import { QueryParams } from '../../../generics/data-list/data-list.component';

@Component({
  selector: 'app-implementation-publications-list',
  templateUrl: './implementation-publications-list.component.html',
  styleUrls: ['./implementation-publications-list.component.scss'],
})
export class ImplementationPublicationsListComponent implements OnInit {
  @Input() implementation: EntityModelImplementationDto;

  tableColumns = ['Title', 'URL', 'DOI', 'Authors'];
  variableNames = ['title', 'url', 'doi', 'authors'];
  linkObject: any = {
    title: 'Link publication with ',
    subtitle: 'Search publication by title',
    displayVariable: 'title',
    data: [],
    linkedData: [],
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
    private activatedRoute: ActivatedRoute,
    private utilService: UtilService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.linkObject.title += this.implementation.name;
    this.activatedRoute.params.subscribe(() => {
      this.getLinkedPublications();
    });
  }

  getLinkedPublications(): void {
    this.algorithmService
      .getPublicationsOfImplementation({
        algorithmId: this.implementation.implementedAlgorithmId,
        implementationId: this.implementation.id,
      })
      .subscribe((publications) => {
        this.linkObject.linkedData = [];
        if (publications._embedded) {
          this.linkObject.linkedData = publications._embedded.publications;
        }
      });
  }

  updatePublicationData(data): void {
    // clear link object data
    this.linkObject.data = [];
    // If publications found
    if (data._embedded) {
      this.linkObject.data = data._embedded.publications;
    }
    this.pagingInfo.page = data.page;
    this.pagingInfo._links = data._links;
  }

  linkPublication(publication: PublicationDto): void {
    // Empty unlinked algorithms
    this.linkObject.data = [];
    this.algorithmService
      .linkImplementationAndPublication({
        implementationId: this.implementation.id,
        algorithmId: this.implementation.implementedAlgorithmId,
        body: publication,
      })
      .subscribe(() => {
        this.getLinkedPublications();
        this.utilService.callSnackBar('Successfully linked publication');
      });
  }

  unlinkPublications(event): void {
    const promises: Array<Promise<void>> = [];
    for (const publication of event.elements) {
      promises.push(
        this.algorithmService
          .unlinkImplementationAndPublication({
            algorithmId: this.implementation.implementedAlgorithmId,
            implementationId: this.implementation.id,
            publicationId: publication.id,
          })
          .toPromise()
      );
    }
    Promise.all(promises).then(() => {
      this.getLinkedPublications();
      this.utilService.callSnackBar('Successfully unlinked publication(s)');
    });
  }

  onElementClicked(publication: any): void {
    this.routeToPublication(publication);
  }

  routeToPublication(publication: PublicationDto): void {
    this.router.navigate(['publications', publication.id]);
  }

  onDatalistConfigChanged(event): void {
    this.getLinkedPublications();
  }

  openLinkPublicationDialog() {
    this.publicationService.getPublications().subscribe((data) => {
      this.updatePublicationData(data);
      const dialogRef = this.dialog.open(LinkItemListDialogComponent, {
        width: '800px',
        data: {
          title: 'Link existing publication',
          linkObject: this.linkObject,
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
          for (const publication of dialogResult.selectedItems) {
            this.linkPublication(publication);
          }
        }
      });
    });
  }
}
