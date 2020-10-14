import { Component, Input, OnInit } from '@angular/core';
import { EntityModelPublicationDto } from 'api-atlas/models/entity-model-publication-dto';
import { Router } from '@angular/router';
import { PublicationService } from 'api-atlas/services/publication.service';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import { ImplementationDto } from 'api-atlas/models/implementation-dto';
import { forkJoin, Observable } from 'rxjs';
import { ImplementationsService } from 'api-atlas/services/implementations.service';
import { MatDialog } from '@angular/material/dialog';
import {
  LinkObject,
  QueryParams,
  UrlData,
} from '../../generics/data-list/data-list.component';
import {
  DialogData,
  LinkItemListDialogComponent,
} from '../../generics/dialogs/link-item-list-dialog.component';
import { UtilService } from '../../../util/util.service';
import { GenericDataService } from '../../../util/generic-data.service';

@Component({
  selector: 'app-publication-implementations-list',
  templateUrl: './publication-implementations-list.component.html',
  styleUrls: ['./publication-implementations-list.component.scss'],
})
export class PublicationImplementationsListComponent implements OnInit {
  @Input() publication: EntityModelPublicationDto;
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
  pagingInfo: any = {};
  paginatorConfig: any = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };

  constructor(
    private publicationService: PublicationService,
    private algorithmService: AlgorithmService,
    private implementationService: ImplementationsService,
    private router: Router,
    private dialog: MatDialog,
    private utilService: UtilService,
    private genericDataService: GenericDataService
  ) {}

  ngOnInit(): void {
    this.linkObject.title += this.publication.title;
    this.getAllLinkedImplementations();
  }

  getAllImplementations(search?: QueryParams): Observable<any> {
    return this.implementationService
      .getImplementations(search)
      .pipe((data) => data);
  }

  getAllLinkedImplementations(): void {
    this.linkObject.linkedData = [];
    this.publicationService
      .getImplementationsOfPublication({ publicationId: this.publication.id })
      .subscribe((data) => {
        if (data._embedded) {
          this.linkObject.linkedData = data._embedded.implementations;
        }
      });
  }

  getPagedLinkedImplementations(params: any): void {
    this.publicationService
      .getImplementationsOfPublication({
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
    // If implementations found
    if (data._embedded) {
      this.displayedData = data._embedded.implementations;
    }
    this.pagingInfo.page = data.page;
    this.pagingInfo._links = data._links;
  }

  updateLinkDialogData(data): void {
    // clear link object data
    this.linkObject.data = [];
    // If implementations found
    if (data._embedded) {
      this.linkObject.data = data._embedded.implementations;
    }
    this.dialogData.pagingInfo.page = data.page;
    this.dialogData.pagingInfo._links = data._links;
  }

  openLinkImplementationDialog() {
    this.getAllImplementations().subscribe((data) => {
      this.updateLinkDialogData(data);
      const dialogRef = this.dialog.open(LinkItemListDialogComponent, {
        width: '800px',
        data: this.dialogData,
      });
      const searchTextSub = dialogRef.componentInstance.onDataListConfigChanged.subscribe(
        (search: QueryParams) => {
          this.getAllImplementations(search).subscribe((updatedData) => {
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
              'Successfully linked implementation "' + implementation.name + '"'
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
      this.getAllLinkedImplementations();
      snackbarMessages.push(
        this.utilService.generateFinalDeletionMessage(
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
                '"'
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
      this.getAllLinkedImplementations();
      snackbarMessages.push(
        this.utilService.generateFinalDeletionMessage(
          successfulDeletions,
          event.elements.length,
          'implementations',
          'unlinked'
        )
      );
      this.utilService.callSnackBarSequence(snackbarMessages);
    });
  }

  onDatalistConfigChanged(event): void {
    this.getPagedLinkedImplementations(event);
  }

  onElementClicked(implementation: ImplementationDto): void {
    this.routeToImplementation(implementation);
  }

  routeToImplementation(implementation: ImplementationDto): void {
    this.router.navigate([
      'algorithms',
      implementation.implementedAlgorithmId,
      'implementations',
      implementation.id,
    ]);
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
