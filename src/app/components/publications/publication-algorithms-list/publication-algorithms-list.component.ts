import { Component, Input, OnInit } from '@angular/core';
import { PublicationDto } from 'api-atlas/models/publication-dto';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import { PublicationService } from 'api-atlas/services/publication.service';
import { Router } from '@angular/router';
import { AlgorithmDto } from 'api-atlas/models/algorithm-dto';
import { forkJoin, Observable } from 'rxjs';
import { PageAlgorithmDto } from 'api-atlas/models/page-algorithm-dto';
import {
  LinkObject,
  QueryParams,
} from '../../generics/data-list/data-list.component';
import { UtilService } from '../../../util/util.service';
import {
  DialogData,
  LinkItemListDialogComponent,
} from '../../generics/dialogs/link-item-list-dialog.component';
import { PaginatorConfig } from '../../../util/paginatorConfig';
import { PagingInfo } from '../../../util/PagingInfo';
@Component({
  selector: 'app-publication-algorithms-list',
  templateUrl: './publication-algorithms-list.component.html',
  styleUrls: ['./publication-algorithms-list.component.scss'],
})
export class PublicationAlgorithmsListComponent implements OnInit {
  @Input() publication: PublicationDto;
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
  pagingInfo: PagingInfo<AlgorithmDto> = {};
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
    this.linkObject.title += this.publication.title;
    this.getAllLinkedAlgorithms();
  }

  getAllAlgorithms(search?: QueryParams): Observable<PageAlgorithmDto> {
    return this.algorithmService.getAlgorithms(search).pipe((data) => data);
  }

  getAllLinkedAlgorithms(params: QueryParams = {}): void {
    this.linkObject.linkedData = [];
    this.publicationService
      .getAlgorithmsOfPublication({
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
            'Error! Linked algorithms could not be retrieved.'
          );
        }
      );
  }

  updateDisplayedData(data): void {
    // clear link object data
    this.displayedData = [];
    // If algorithms found
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
    // If algorithms found
    if (data.content) {
      this.linkObject.data = data.content;
    }
    this.dialogData.pagingInfo.totalPages = data.totalPages;
    this.dialogData.pagingInfo.number = data.number;
    this.dialogData.pagingInfo.size = data.size;
    this.dialogData.pagingInfo.sort = data.sort;
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
      const searchTextSub =
        dialogRef.componentInstance.onDataListConfigChanged.subscribe(
          (search: QueryParams) => {
            this.getAllAlgorithms(search).subscribe((updatedData) => {
              this.updateLinkDialogData(updatedData);
              dialogRef.componentInstance.data.linkObject = this.linkObject;
            });
          }
        );
      const pagingSub = dialogRef.componentInstance.onPageChanged.subscribe(
        (page: QueryParams) => {
          this.getAllAlgorithms(page).subscribe((pageData) => {
            this.updateLinkDialogData(pageData);
            dialogRef.componentInstance.data.linkObject = this.linkObject;
          });
        }
      );
      const elementClickedSub =
        dialogRef.componentInstance.onElementClicked.subscribe(
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
      this.getAllLinkedAlgorithms(parameters);
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
      if (
        this.utilService.isLastPageEmptyAfterDeletion(
          successfulDeletions,
          this.displayedData.length,
          this.pagingInfo
        )
      ) {
        event.queryParams.page--;
      }
      this.getAllLinkedAlgorithms(event.queryParams);
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

  routeToAlgorithm(algorithm: AlgorithmDto): void {
    this.router.navigate(['algorithms', algorithm.id]);
  }
}
