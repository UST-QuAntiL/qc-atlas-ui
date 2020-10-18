import { Component, Input, OnInit } from '@angular/core';
import { EntityModelPublicationDto } from 'api-atlas/models/entity-model-publication-dto';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import { PublicationService } from 'api-atlas/services/publication.service';
import { Router } from '@angular/router';
import { AlgorithmDto } from 'api-atlas/models/algorithm-dto';
import { forkJoin, Observable } from 'rxjs';
import {
  LinkObject,
  QueryParams,
} from '../../generics/data-list/data-list.component';
import { UtilService } from '../../../util/util.service';
import {
  DialogData,
  LinkItemListDialogComponent,
} from '../../generics/dialogs/link-item-list-dialog.component';
import { GenericDataService } from '../../../util/generic-data.service';
@Component({
  selector: 'app-publication-algorithms-list',
  templateUrl: './publication-algorithms-list.component.html',
  styleUrls: ['./publication-algorithms-list.component.scss'],
})
export class PublicationAlgorithmsListComponent implements OnInit {
  @Input() publication: EntityModelPublicationDto;
  displayedData = [];
  tableColumns = ['Name', 'Acronym', 'Type', 'Problem'];
  variableNames = ['name', 'acronym', 'computationModel', 'problem'];
  linkObject: LinkObject = {
    title: 'Link publication with ',
    subtitle: 'Search algorithm by name',
    displayVariable: 'name',
    data: [],
    linkedData: [],
  };
  dialogData: DialogData = {
    title: 'Link existing algorithms',
    linkObject: this.linkObject,
    tableColumns: ['Name', 'Acronym', 'Type'],
    variableNames: ['name', 'acronym', 'computationModel'],
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
    this.linkObject.title += this.publication.title;
    this.getAllLinkedAlgorithms();
  }

  getAllAlgorithms(search?: QueryParams): Observable<any> {
    return this.algorithmService.getAlgorithms(search).pipe((data) => data);
  }

  getAllLinkedAlgorithms(): void {
    this.linkObject.linkedData = [];
    this.publicationService
      .getAlgorithmsOfPublication({ publicationId: this.publication.id })
      .subscribe(
        (data) => {
          if (data._embedded) {
            this.linkObject.linkedData = data._embedded.algorithms;
          }
        },
        () => {
          this.utilService.callSnackBar(
            'Error! Linked algorithms could not be retrieved.'
          );
        }
      );
  }

  getPagedLinkedAlgorithms(params: any): void {
    this.publicationService
      .getAlgorithmsOfPublication({
        publicationId: this.publication.id,
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
    // If algorithms found
    if (data._embedded) {
      this.displayedData = data._embedded.algorithms;
    }
    this.pagingInfo.page = data.page;
    this.pagingInfo._links = data._links;
  }

  updateLinkDialogData(data): void {
    // clear link object data
    this.linkObject.data = [];
    // If algorithms found
    if (data._embedded) {
      this.linkObject.data = data._embedded.algorithms;
    }
    this.dialogData.pagingInfo.page = data.page;
    this.dialogData.pagingInfo._links = data._links;
  }

  openLinkAlgorithmDialog(): void {
    this.getAllAlgorithms().subscribe((data) => {
      this.updateLinkDialogData(data);
      const dialogRef = this.utilService.createDialog(
        LinkItemListDialogComponent,
        this.dialogData,
        1000,
        700
      );
      const searchTextSub = dialogRef.componentInstance.onDataListConfigChanged.subscribe(
        (search: QueryParams) => {
          this.getAllAlgorithms(search).subscribe((updatedData) => {
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
          this.linkAlgorithms(dialogResult.selectedItems);
        }
      });
    });
  }

  linkAlgorithms(algorithms: AlgorithmDto[]): void {
    // Empty unlinked algorithms
    this.linkObject.data = [];
    const linkTasks = [];
    const snackbarMessages = [];
    let successfulLinks = 0;
    for (const algorithm of algorithms) {
      linkTasks.push(
        this.publicationService
          .linkPublicationAndAlgorithm({
            publicationId: this.publication.id,
            body: algorithm,
          })
          .toPromise()
          .then(() => {
            successfulLinks++;
            snackbarMessages.push(
              'Successfully linked algorithm "' + algorithm.name + '"'
            );
          })
          .catch(() => {
            snackbarMessages.push(
              'Error! Could not link algorithm "' + algorithm.name + '".'
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
      this.getAllLinkedAlgorithms();
      snackbarMessages.push(
        this.utilService.generateFinishingSnackbarMessage(
          successfulLinks,
          algorithms.length,
          'algorithms',
          'linked'
        )
      );
      this.utilService.callSnackBarSequence(snackbarMessages);
    });
  }

  unlinkAlgorithms(event): void {
    const deletionTasks = [];
    const snackbarMessages = [];
    let successfulDeletions = 0;
    for (const algorithm of event.elements) {
      deletionTasks.push(
        this.publicationService
          .unlinkPublicationAndAlgorithm({
            algorithmId: algorithm.id,
            publicationId: this.publication.id,
          })
          .toPromise()
          .then(() => {
            successfulDeletions++;
            snackbarMessages.push(
              'Successfully unlinked algorithm "' + algorithm.name + '".'
            );
          })
          .catch(() => {
            snackbarMessages.push(
              'Error! Could not unlink algorithm  "' + algorithm.name + '".'
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
      this.getAllLinkedAlgorithms();
      snackbarMessages.push(
        this.utilService.generateFinishingSnackbarMessage(
          successfulDeletions,
          event.elements.length,
          'algorithms',
          'unlinked'
        )
      );
      this.utilService.callSnackBarSequence(snackbarMessages);
    });
  }

  onDatalistConfigChanged(event): void {
    this.getPagedLinkedAlgorithms(event);
  }

  onElementClicked(algorithm: AlgorithmDto): void {
    this.routeToAlgorithm(algorithm);
  }

  routeToAlgorithm(algorithm: AlgorithmDto): void {
    this.router.navigate(['algorithms', algorithm.id]);
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
