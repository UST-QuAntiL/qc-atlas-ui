import { Component, Input, OnInit } from '@angular/core';
import { EntityModelPublicationDto } from 'api/models/entity-model-publication-dto';
import { AlgorithmService } from 'api/services/algorithm.service';
import { PublicationService } from 'api/services/publication.service';
import { GenericDataService } from '../../../util/generic-data.service';

@Component({
  selector: 'app-publication-implementations-list',
  templateUrl: './publication-implementations-list.component.html',
  styleUrls: ['./publication-implementations-list.component.scss'],
})
export class PublicationImplementationsListComponent implements OnInit {
  @Input() publication: EntityModelPublicationDto;
  implementations: any[] = [];
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
  linkObject: any = {
    title: 'Link publication with implementations',
    subtitle: 'Search implementations',
    displayVariable: 'name',
    data: [],
  };

  constructor(
    private genericDataService: GenericDataService,
    private algorithmService: AlgorithmService,
    private publicationService: PublicationService
  ) {}

  ngOnInit(): void {
    this.publicationLinks = JSON.parse(JSON.stringify(this.publication._links));
    this.getPublicationImplementations(
      this.publicationLinks.implementations.href
    );
  }

  onDatalistConfigChanged(event): void {
    console.log('Config change clicked!');
    this.getPublicationImplementations(
      this.publicationLinks.implementations.href
    );
  }

  unlinkImplementations(event): void {
    // Iterate all selected algorithms
    for (const element of event.elements) {
      // Build params using path ids and perform delete request
      this.publicationService
        .deleteReferenceToImplementation(this.generateLinkParams(element.id))
        .subscribe((data) => {
          // Update table after deletion
          this.getPublicationImplementations(
            this.publicationLinks.implementations.href
          );
        });
    }
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
  searchImplementations(search: string): void {
    if (search) {
      this.getImplementations({ search });
    } else {
      this.linkObject.data = [];
    }
  }

  getImplementations(params): void {
    this.algorithmService.getImplementations(params).subscribe((data) => {
      this.prepareImplementationData(JSON.parse(JSON.stringify(data)));
    });
  }

  prepareImplementationData(data): void {
    // Read all incoming data
    if (data._embedded) {
      this.linkObject.data = data._embedded.implementations;
    } else {
      this.linkObject.data = [];
    }
  }

  linkImplementation(params: any): void {
    this.publicationService.addAlgorithm(params).subscribe((data) => {
      this.getPublicationImplementations(
        this.publicationLinks.implementations.href
      );
    });
  }

  onSelectToLink(implementation: any): void {
    this.linkImplementation(this.generateLinkParams(implementation.id));
    this.linkObject.data = [];
  }

  generateLinkParams(implementationId: string): any {
    return {
      id: this.publication.id,
      implId: implementationId,
    };
  }

  onElementClicked(implementation: any): void {
    console.log('Implementation clicked');
  }
}
