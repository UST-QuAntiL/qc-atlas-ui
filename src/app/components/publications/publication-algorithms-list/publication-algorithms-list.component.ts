import { Component, Input, OnInit } from '@angular/core';
import { EntityModelPublicationDto } from 'api-atlas/models/entity-model-publication-dto';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import { PublicationService } from 'api-atlas/services/publication.service';
import { EntityModelAlgorithmDto } from 'api-atlas/models/entity-model-algorithm-dto';
import { Router } from '@angular/router';
import { AlgorithmDto } from 'api-atlas/models/algorithm-dto';
import { PublicationDto } from 'api-atlas/models/publication-dto';
import { MatDialog } from '@angular/material/dialog';
import {
  LinkObject,
  QueryParams,
} from '../../generics/data-list/data-list.component';
import { UtilService } from '../../../util/util.service';
import { LinkItemListDialogComponent } from '../../generics/dialogs/link-item-list-dialog.component';
import { GenericDataService } from '../../../util/generic-data.service';
@Component({
  selector: 'app-publication-algorithms-list',
  templateUrl: './publication-algorithms-list.component.html',
  styleUrls: ['./publication-algorithms-list.component.scss'],
})
export class PublicationAlgorithmsListComponent implements OnInit {
  @Input() publication: EntityModelPublicationDto;
  linkedAlgorithms: EntityModelAlgorithmDto[] = [];
  tableColumns = ['Name', 'Acronym', 'Type', 'Problem'];
  variableNames = ['name', 'acronym', 'computationModel', 'problem'];
  linkObject: LinkObject = {
    title: 'Link algorithm with ',
    subtitle: 'Search algorithm by name',
    displayVariable: 'name',
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
    private utilService: UtilService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.linkObject.title += this.publication.title;
    this.getLinkedAlgorithms({ publicationId: this.publication.id });
  }

  getLinkedAlgorithms(params: {
    publicationId: string;
    search?: string;
    page?: number;
    size?: number;
    sort?: string[];
  }): void {
    this.publicationService
      .getAlgorithmsOfPublication(params)
      .subscribe((algorithms) => {
        this.linkObject.linkedData = [];
        if (algorithms._embedded) {
          this.linkObject.linkedData = algorithms._embedded.algorithms;
        }
      });
  }

  updateAlgorithmData(data): void {
    // clear link object data
    this.linkObject.data = [];
    // If algorithms found
    if (data._embedded) {
      this.linkObject.data = data._embedded.algorithms;
    }
    this.pagingInfo.page = data.page;
    this.pagingInfo._links = data._links;
  }

  openLinkAlgorithmDialog() {
    this.algorithmService.getAlgorithms().subscribe((data) => {
      this.updateAlgorithmData(data);
      const dialogRef = this.dialog.open(LinkItemListDialogComponent, {
        width: '800px',
        data: {
          title: 'Link existing algorithm',
          linkObject: this.linkObject,
          tableColumns: ['Name', 'Acronym', 'Type'],
          variableNames: ['name', 'acronym', 'computationModel'],
          pagingInfo: this.pagingInfo,
          paginatorConfig: this.paginatorConfig,
          noButtonText: 'Cancel',
        },
      });
      const searchTextSub = dialogRef.componentInstance.onDataListConfigChanged.subscribe(
        (search: QueryParams) => {
          this.algorithmService
            .getAlgorithms(search)
            .subscribe((updatedData) => {
              this.updateAlgorithmData(updatedData);
              dialogRef.componentInstance.data.linkObject = this.linkObject;
            });
        }
      );
      const pagingSub = dialogRef.componentInstance.onPageChanged.subscribe(
        (page: string) => {
          this.genericDataService.getData(page).subscribe((pageData) => {
            this.updateAlgorithmData(pageData);
            dialogRef.componentInstance.data.linkObject = this.linkObject;
          });
        }
      );
      const elementClickedSub = dialogRef.componentInstance.onElementClicked.subscribe(
        (element: AlgorithmDto) => {
          this.routeToAlgorithm(element);
          dialogRef.close();
        }
      );

      dialogRef.afterClosed().subscribe((dialogResult) => {
        searchTextSub.unsubscribe();
        pagingSub.unsubscribe();
        elementClickedSub.unsubscribe();
        if (dialogResult) {
          for (const algorithm of dialogResult.selectedItems) {
            this.linkAlgorithm(algorithm);
          }
        }
      });
    });
  }

  linkAlgorithm(algorithm: AlgorithmDto): void {
    // Empty unlinked algorithms
    this.linkObject.data = [];
    // Link algorithm
    this.publicationService
      .linkPublicationAndAlgorithm({
        publicationId: this.publication.id,
        body: algorithm,
      })
      .subscribe(() => {
        this.getLinkedAlgorithms({ publicationId: this.publication.id });
        this.utilService.callSnackBar('Successfully linked Algorithm');
      });
  }

  unlinkAlgorithms(algorithmList): void {
    const outputPromises: Array<Promise<void>> = [];
    for (const element of algorithmList.elements) {
      outputPromises.push(
        this.publicationService
          .unlinkPublicationAndAlgorithm({
            algorithmId: element.id,
            publicationId: this.publication.id,
          })
          .toPromise()
      );
    }

    Promise.all(outputPromises).then(() => {
      this.getLinkedAlgorithms({ publicationId: this.publication.id });
      this.utilService.callSnackBar('Successfully unlinked Algorithm');
    });
  }

  onElementClicked(algorithm: AlgorithmDto): void {
    this.routeToAlgorithm(algorithm);
  }

  routeToAlgorithm(algorithm: AlgorithmDto): void {
    this.router.navigate(['algorithms', algorithm.id]);
  }

  onDatalistConfigChanged(event): void {
    this.getLinkedAlgorithms({ publicationId: this.publication.id });
  }
}
