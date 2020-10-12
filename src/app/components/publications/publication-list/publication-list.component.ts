import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicationService } from 'api-atlas/services/publication.service';
import { EntityModelPublicationDto } from 'api-atlas/models/entity-model-publication-dto';
import { forkJoin } from 'rxjs';
import { GenericDataService } from '../../../util/generic-data.service';
import { AddPublicationDialogComponent } from '../dialogs/add-publication-dialog.component';
import {
  SelectParams,
  QueryParams,
  UrlData,
} from '../../generics/data-list/data-list.component';
import { ConfirmDialogComponent } from '../../generics/dialogs/confirm-dialog.component';
import { UtilService } from '../../../util/util.service';

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss'],
})
export class PublicationListComponent implements OnInit {
  publications: EntityModelPublicationDto[] = [];
  tableColumns = ['Title', 'URL', 'DOI', 'Authors'];
  variableNames = ['title', 'url', 'doi', 'authors'];
  externalLinkVariables = ['url'];
  pagingInfo: any = {};
  paginatorConfig: any = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };

  constructor(
    private publicationService: PublicationService,
    private genericDataService: GenericDataService,
    private router: Router,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {}

  getPublications(params: QueryParams): void {
    this.publicationService.getPublications(params).subscribe((data) => {
      this.preparePublicationData(data);
    });
  }

  getPublicationsHateoas(url: string): void {
    this.genericDataService.getData(url).subscribe((data) => {
      this.preparePublicationData(data);
    });
  }

  preparePublicationData(data): void {
    // Read all incoming data
    if (data._embedded) {
      this.publications = data._embedded.publications;
    } else {
      this.publications = [];
    }
    this.pagingInfo.page = data.page;
    this.pagingInfo._links = data._links;
  }

  onElementClicked(publication: any): void {
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
      .subscribe((dialogResult) => {
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
              this.utilService.callSnackBar('Successfully created publication');
            });
        }
      });
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
          let successfulDeletions = 0;
          for (const publication of event.elements) {
            deletionTasks.push(
              this.publicationService
                .deletePublication({ publicationId: publication.id })
                .toPromise()
                .then(() => successfulDeletions++)
            );
          }
          forkJoin(deletionTasks).subscribe(() => {
            console.log(this.pagingInfo.page);
            if (
              this.utilService.isLastPageEmptyAfterDeletion(
                successfulDeletions,
                this.publications.length,
                this.pagingInfo
              )
            ) {
              this.getPublicationsHateoas(this.pagingInfo._links.prev.href);
            } else {
              this.getPublicationsHateoas(this.pagingInfo._links.self.href);
            }
            this.utilService.callSnackBar(
              'Successfully deleted ' +
                successfulDeletions +
                '/' +
                dialogResult.data.length +
                ' publications.'
            );
          });
        }
      });
  }
}
