import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { AlgorithmDto } from 'api-atlas/models/algorithm-dto';
import { forkJoin, Observable } from 'rxjs';
import { ImplementationsService } from 'api-atlas/services/implementations.service';
import { PageImplementationDto } from 'api-atlas/models/page-implementation-dto';
import { Router } from '@angular/router';
import { ImplementationDto } from 'api-atlas/models/implementation-dto';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import {
  LinkObject,
  QueryParams,
} from '../../generics/data-list/data-list.component';
import {
  DialogData,
  LinkItemListDialogComponent,
} from '../../generics/dialogs/link-item-list-dialog.component';
import { UtilService } from '../../../util/util.service';
import { CreateImplementationDialogComponent } from './create-implementation-dialog.component';

@Component({
  selector: 'app-choice-implementation-dialog',
  templateUrl: './choice-implementation-dialog.component.html',
  styleUrls: ['./choice-implementation-dialog.component.scss'],
})
export class ChoiceImplementationDialogComponent implements OnInit {
  @Input() algorithm: AlgorithmDto;
  implementationForm: FormGroup;
  pagingInfo: any = {};
  displayedData = [];
  linkObject: LinkObject = {
    title: 'Link implementation with ',
    subtitle: 'Search implementations by name',
    displayVariable: 'name',
    data: [],
    linkedData: [],
  };
  dialogData: DialogData = {
    title: 'Link existing implementation',
    linkObject: this.linkObject,
    tableColumns: ['Name'],
    variableNames: ['name'],
    noButtonText: 'Cancel',
    pagingInfo: {},
    paginatorConfig: {
      amountChoices: [10, 25, 50],
      selectedAmount: 10,
    },
  };

  constructor(
    public dialogRef: MatDialogRef<ChoiceImplementationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ImplementationChoiceDialogData,
    public dialog: MatDialog,
    private utilService: UtilService,
    private implementationsService: ImplementationsService,
    private algorithmService: AlgorithmService,
    private router: Router
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {}

  onCreateImplementationDialog(): void {
    this.utilService
      .createDialog(CreateImplementationDialogComponent, {
        title: 'Create implementation for this algorithm',
      })
      .afterClosed()
      .subscribe((createImplementationDialogResult) => {
        this.dialogRef.close(createImplementationDialogResult);
      });
  }

  getImplementationsOfAlgorithm(params: QueryParams = {}): void {
    this.linkObject.linkedData = [];
    this.algorithmService
      .getImplementationsOfAlgorithm({
        algorithmId: this.algorithm.id,
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

  getAllImplementations(
    search?: QueryParams
  ): Observable<PageImplementationDto> {
    return this.implementationsService
      .getImplementations(search)
      .pipe((data) => data);
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
          this.linkPublications(dialogResult.selectedItems);
        }
      });
    });
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

  linkPublications(implementations: ImplementationDto[]): void {
    // Empty unlinked publications
    this.linkObject.data = [];
    const linkTasks = [];
    const snackbarMessages = [];
    let successfulLinks = 0;
    for (const implementation of implementations) {
      linkTasks.push(
        this.implementationsService
          .linkAlgorithmAndImplementation({
            implementationId: implementation.id,
            body: this.algorithm,
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
      this.getImplementationsOfAlgorithm(parameters);
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

  routeToImplementation(implementation: ImplementationDto): void {
    this.router.navigate([
      'algorithms',
      this.algorithm.id,
      'implementations',
      implementation.id,
    ]);
  }
}

export interface ImplementationChoiceDialogData {
  name: string;
  title: string;
}
