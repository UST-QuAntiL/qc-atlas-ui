import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicationService } from 'api-atlas/services/publication.service';
import { PublicationDto } from 'api-atlas/models/publication-dto';
import { forkJoin } from 'rxjs';
import { AddPublicationDialogComponent } from '../dialogs/add-publication-dialog.component';
import {
  SelectParams,
  QueryParams,
  UrlData,
} from '../../generics/data-list/data-list.component';
import { ConfirmDialogComponent } from '../../generics/dialogs/confirm-dialog.component';
import { UtilService } from '../../../util/util.service';
import { PaginatorConfig } from '../../../util/paginatorConfig';
import { PagingInfo } from '../../../util/PagingInfo';

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss'],
})
export class PublicationListComponent implements OnInit {
  publications: PublicationDto[] = [];
  tableColumns = ['Title', 'URL', 'DOI', 'Authors'];
  variableNames = ['title', 'url', 'doi', 'authors'];
  externalLinkVariables = ['url'];
  pagingInfo: PagingInfo<PublicationDto> = {};
  paginatorConfig: PaginatorConfig = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };

  constructor(
    private publicationService: PublicationService,
    private router: Router,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {}

  getPublications(params: QueryParams): void {
    this.publicationService.getPublications(params).subscribe(
      (data) => {
        console.log('getPublications API response:', data); // Fügen Sie diese Zeile hinzu
        this.preparePublicationData(data);
      },
      () => {
        this.utilService.callSnackBar(
          'Error! Publications types could not be retrieved.'
        );
      }
    );
  }

  preparePublicationData(data): void {
    // Read all incoming data
    if (data.content) {
      this.publications = data.content;
    } else {
      this.publications = [];
    }
    this.pagingInfo.totalPages = data.totalPages;
    this.pagingInfo.number = data.number;
    this.pagingInfo.sort = data.sort;
  }

  onElementClicked(publication: PublicationDto): void {
    this.router.navigate(['publications', publication.id]);
  }

  onUrlClicked(urlData: UrlData): void {
    // No check needed since publications have only one url-field called 'url'
    window.open(urlData.element['url'], '_blank');
  }

  onAddElement(): void {
    this.utilService
      .createDialog(AddPublicationDialogComponent, {
        data: { title: 'Add new publication' },
      })
      .afterClosed()
      .subscribe(
        (dialogResult) => {
          if (dialogResult) {
            this.publicationService
              .createPublication({
                body: {
                  id: null,
                  title: dialogResult.publicationTitle,
                  authors: dialogResult.authors,
                },
              })
              .subscribe((data) => {
                this.router.navigate(['publications', data.id]);
                this.utilService.callSnackBar(
                  'Successfully created publication'
                );
              });
          }
        },
        () => {
          this.utilService.callSnackBar('Could not create publication !');
        }
      );
  }

  onDeleteElements(event: SelectParams): void {
    this.utilService
      .createDialog(ConfirmDialogComponent, {
        title: 'Confirm Deletion',
        message:
          'Are you sure you want to delete the following publication(s): ',
        data: event.elements,
        variableName: 'title',
        yesButtonText: 'yes',
        noButtonText: 'no',
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          const deletionTasks = [];
          const snackbarMessages = [];
          let successfulDeletions = 0;
          for (const publication of event.elements) {
            deletionTasks.push(
              this.publicationService
                .deletePublication({ publicationId: publication.id })
                .toPromise()
                .then(() => {
                  successfulDeletions++;
                  snackbarMessages.push(
                    'Successfully deleted publication "' +
                      publication.title +
                      '".'
                  );
                })
                .catch(() => {
                  snackbarMessages.push(
                    'Could not delete algorithm "' + publication.title + '".'
                  );
                })
            );
          }
          forkJoin(deletionTasks).subscribe(() => {
            if (
              this.utilService.isLastPageEmptyAfterDeletion(
                successfulDeletions,
                this.publications.length,
                this.pagingInfo
              )
            ) {
              event.queryParams.page--;
            }
            this.getPublications(event.queryParams);
            snackbarMessages.push(
              this.utilService.generateFinishingSnackbarMessage(
                successfulDeletions,
                event.elements.length,
                'publications'
              )
            );
            this.utilService.callSnackBarSequence(snackbarMessages);
          });
        }
      });
  }
}
