import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PublicationService } from 'api/services/publication.service';
import { AlgorithmDto } from 'api/models/algorithm-dto';
import { GenericDataService } from '../../../util/generic-data.service';
import { AddAlgorithmDialogComponent } from '../../algorithms/dialogs/add-algorithm-dialog.component';
import { AddPublicationDialogComponent } from '../dialogs/add-publication-dialog.component';

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss'],
})
export class PublicationListComponent implements OnInit {
  publications: any[] = [];
  tableColumns = ['Title', 'URL', 'DOI', 'Authors'];
  variableNames = ['title', 'url', 'doi', 'authors'];
  pagingInfo: any = {};
  paginatorConfig: any = {
    amountChoices: [1, 2, 3],
    selectedAmount: 1,
  };

  constructor(
    private publicationService: PublicationService,
    private genericDataService: GenericDataService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {}

  getPublications(params: any): void {
    this.publicationService.getPublications2(params).subscribe((data) => {
      console.log(data);
      this.preparePublicationData(JSON.parse(JSON.stringify(data)));
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

  onAddElement(): void {
    const params: any = {};
    const dialogRef = this.dialog.open(AddPublicationDialogComponent, {
      width: '400px',
      data: { title: 'Add new publication' },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {});
  }

  onDeleteElements(event): void {
    // Iterate all selected algorithms and delete them
    for (const publication of event.elements) {
      this.publicationService
        .deletePublication(this.generateDeleteParams(publication.id))
        .subscribe(() => {
          // Refresh Algorithms after delete
          this.getPublications(event.queryParams);
        });
    }
  }

  onPageChanged(event): void {
    this.getPublicationsHateoas(event);
  }

  onDatalistConfigChanged(event): void {
    this.getPublications(event);
  }

  generateDeleteParams(publicationId: string): any {
    const params: any = {};
    params.id = publicationId;
    return params;
  }
}
