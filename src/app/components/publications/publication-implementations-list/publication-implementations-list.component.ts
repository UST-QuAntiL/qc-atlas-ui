import { Component, Input, OnInit } from '@angular/core';
import { EntityModelPublicationDto } from 'api/models/entity-model-publication-dto';
import { Router } from '@angular/router';
import { GenericDataService } from '../../../util/generic-data.service';

@Component({
  selector: 'app-publication-implementations-list',
  templateUrl: './publication-implementations-list.component.html',
  styleUrls: ['./publication-implementations-list.component.scss'],
})
export class PublicationImplementationsListComponent implements OnInit {
  @Input() publication: EntityModelPublicationDto;
  publicationLinks: any;
  linkedImplementations: any[] = [];
  tableColumns = ['Name', 'Description', 'Contributors', 'Assumptions', 'Link'];
  variableNames = [
    'name',
    'description',
    'contributors',
    'assumptions',
    'link',
  ];

  constructor(
    private genericDataService: GenericDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.publicationLinks = JSON.parse(JSON.stringify(this.publication._links));
    this.getPublicationImplementations(
      this.publicationLinks.implementations.href
    );
  }

  onDatalistConfigChanged(event): void {
    this.getPublicationImplementations(
      this.publicationLinks.implementations.href
    );
  }

  getPublicationImplementations(url: string): void {
    this.genericDataService.getData(url).subscribe((data) => {
      this.prepareRelatedImplementationData(data);
    });
  }
  prepareRelatedImplementationData(data): void {
    // Read all incoming data
    if (data._embedded) {
      this.linkedImplementations = data._embedded.implementations;
    } else {
      this.linkedImplementations = [];
    }
  }

  onElementClicked(implementation: any): void {
    this.genericDataService
      .getData(implementation._links.implementedAlgorithm.href)
      .subscribe((data) => {
        const algo = JSON.parse(JSON.stringify(data));
        this.router.navigate([
          'algorithms',
          algo.id,
          'implementations',
          implementation.id,
        ]);
      });
  }
}
