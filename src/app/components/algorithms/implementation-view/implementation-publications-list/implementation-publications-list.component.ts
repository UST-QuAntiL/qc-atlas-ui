import { Component, Input, OnInit } from '@angular/core';
import { AlgorithmService } from 'api/services/algorithm.service';
import { PublicationService } from 'api/services/publication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityModelPublicationDto } from 'api/models/entity-model-publication-dto';
import { EntityModelImplementationDto } from 'api/models/entity-model-implementation-dto';
import { PublicationDto } from 'api/models/publication-dto';
import { GenericDataService } from '../../../../util/generic-data.service';

@Component({
  selector: 'app-implementation-publications-list',
  templateUrl: './implementation-publications-list.component.html',
  styleUrls: ['./implementation-publications-list.component.scss'],
})
export class ImplementationPublicationsListComponent implements OnInit {
  @Input() implementation: EntityModelImplementationDto;
  linkedPublications: EntityModelPublicationDto[] = [];
  tableColumns = ['Title', 'URL', 'DOI', 'Authors'];
  variableNames = ['title', 'url', 'doi', 'authors'];
  linkObject: any = {
    title: 'Link implementation with ',
    subtitle: 'Search publication by title',
    displayVariable: 'title',
    data: [],
  };
  algoId: string;
  tableAddAllowed = true;
  isLinkingEnabled = false;

  constructor(
    private genericDataService: GenericDataService,
    private algorithmService: AlgorithmService,
    private publicationService: PublicationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.linkObject.title += this.implementation.name;
    this.activatedRoute.params.subscribe(({ algoId }) => {
      this.algoId = algoId;
      this.getLinkedPublications();
    });
  }

  getLinkedPublications(): void {
    this.algorithmService
      .getPublicationsByAlgorithm({
        algoId: this.algoId,
      })
      .subscribe((data) => {
        // Read all incoming data
        if (data._embedded) {
          this.linkedPublications = data._embedded.publications;
        } else {
          this.linkedPublications = [];
        }
      });
  }

  searchUnlinkedPublications(search: string): void {
    if (search) {
      this.publicationService.getPublications({ search }).subscribe((data) => {
        this.updateLinkablePublications(data._embedded);
      });
    } else {
      this.linkObject.data = [];
    }
  }

  linkPublication(publication: PublicationDto): void {
    // Empty unlinked algorithms
    this.linkObject.data = [];
    this.algorithmService
      .addPublication(this.generateLinkParams(publication.id))
      .subscribe((data) => {
        this.getLinkedPublications();
      });
  }

  async unlinkPublications(event): Promise<void> {
    // Iterate all selected algorithms
    for (const publication of event.elements) {
      await // Build params using path ids and perform delete request
      this.algorithmService
        .deleteReferenceToPublication(this.generateLinkParams(publication.id))
        .toPromise();
      this.getLinkedPublications();
    }
  }

  onElementClicked(publication: any): void {
    this.router.navigate(['publications', publication.id]);
  }

  onDatalistConfigChanged(event): void {
    this.getLinkedPublications();
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

  updateLinkablePublications(publicationData) {
    // Clear list of linkable algorithms
    this.linkObject.data = [];
    // If linkable algorithms found
    if (publicationData) {
      // Search algorithms and filter only those that are not already linked
      for (const publication of publicationData.publications) {
        if (
          !this.linkedPublications.some((publ) => publ.id === publication.id)
        ) {
          this.linkObject.data.push(publication);
        }
      }
    }
  }

  onToggleLink(): void {
    this.isLinkingEnabled = !this.isLinkingEnabled;
    this.tableAddAllowed = !this.tableAddAllowed;
  }
}
