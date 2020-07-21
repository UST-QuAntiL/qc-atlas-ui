import { Component, Input, OnInit } from '@angular/core';
import { AlgorithmService } from 'api/services/algorithm.service';
import { PublicationService } from 'api/services/publication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityModelPublicationDto } from 'api/models/entity-model-publication-dto';
import { EntityModelAlgorithmDto } from 'api/models/entity-model-algorithm-dto';
import { EntityModelImplementationDto } from 'api/models/entity-model-implementation-dto';
import { ImplementationDto } from 'api/models/implementation-dto';
import { GenericDataService } from '../../../../util/generic-data.service';

@Component({
  selector: 'app-implementation-publications-list',
  templateUrl: './implementation-publications-list.component.html',
  styleUrls: ['./implementation-publications-list.component.scss'],
})
export class ImplementationPublicationsListComponent implements OnInit {
  @Input() implementation: EntityModelImplementationDto;
  publications: EntityModelPublicationDto[] = [];
  linkedPublications: any[] = [];
  implementationLinks: any;
  tableColumns = ['Title', 'URL', 'DOI', 'Authors'];
  variableNames = ['title', 'url', 'doi', 'authors'];
  linkObject: any = {
    title: 'Link implementation with publications',
    subtitle: 'Search publications',
    displayVariable: 'title',
    data: [],
  };
  algoId: string;
  constructor(
    private genericDataService: GenericDataService,
    private algorithmService: AlgorithmService,
    private publicationService: PublicationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log(this.implementation);
    this.activatedRoute.params.subscribe(({ algoId }) => {
      this.algoId = algoId;
    });
    this.implementationLinks = JSON.parse(
      JSON.stringify(this.implementation._links)
    );
    this.getImplementationPublications(
      this.implementationLinks.publications.href
    );
  }

  getImplementationPublications(url: string): void {
    this.genericDataService.getData(url).subscribe((data) => {
      this.prepareLinkedPublicationData(data);
    });
  }

  getPublications(params): void {
    this.publicationService.getPublications2(params).subscribe((data) => {
      this.preparePublicationData(data);
    });
  }

  linkPublication(params: any): void {
    this.algorithmService.addPublication1(params).subscribe((data) => {
      this.getImplementationPublications(
        this.implementationLinks.publications.href
      );
    });
  }

  unlinkPublications(event): void {
    // Iterate all selected algorithms
    for (const element of event.elements) {
      console.log(element);
      // Build params using path ids and perform delete request
      this.algorithmService
        .deleteReferenceToPublication1(this.generateLinkParams(element.id))
        .subscribe((data) => {
          // Update table after deletion
          this.getImplementationPublications(
            this.implementationLinks.publications.href
          );
        });
    }
  }

  prepareLinkedPublicationData(data): void {
    // Read all incoming data
    if (data._embedded) {
      this.linkedPublications = data._embedded.publications;
    } else {
      this.linkedPublications = [];
    }
  }

  preparePublicationData(data): void {
    // Read all incoming data
    if (data._embedded) {
      this.linkObject.data = data._embedded.publications;
    } else {
      this.linkObject.data = [];
    }
  }

  onElementClicked(publication: any): void {
    this.router.navigate(['publications', publication.id]);
  }

  onDatalistConfigChanged(event): void {
    console.log('Config change clicked!');
    this.getImplementationPublications(
      this.implementationLinks.publications.href
    );
  }

  searchPublications(search: string): void {
    if (search) {
      this.getPublications({ search });
    } else {
      this.linkObject.data = [];
    }
  }

  onSelectToLink(publication: any): void {
    this.linkPublication(this.generateLinkParams(publication.id));
    this.linkObject.data = [];
  }

  generateLinkParams(publicationId: string): any {
    return {
      publId: publicationId,
      algoId: this.algoId,
      implId: this.implementation.id,
    };
  }
}
