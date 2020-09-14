import { Component, Input, OnInit } from '@angular/core';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import { PublicationService } from 'api-atlas/services/publication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityModelPublicationDto } from 'api-atlas/models/entity-model-publication-dto';
import { EntityModelImplementationDto } from 'api-atlas/models/entity-model-implementation-dto';
import { PublicationDto } from 'api-atlas/models/publication-dto';
import { GenericDataService } from '../../../../util/generic-data.service';
import { UtilService } from '../../../../util/util.service';

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
    title: 'Link publication with ',
    subtitle: 'Search publication by title',
    displayVariable: 'title',
    data: [],
  };
  tableAddAllowed = true;
  isLinkingEnabled = false;

  constructor(
    private genericDataService: GenericDataService,
    private algorithmService: AlgorithmService,
    private publicationService: PublicationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.linkObject.title += this.implementation.name;
    this.activatedRoute.params.subscribe(() => {
      this.getLinkedPublications();
    });
  }

  getLinkedPublications(): void {
    this.algorithmService
      .getPublicationsOfImplementation({
        algorithmId: this.implementation.implementedAlgorithmId,
        implementationId: this.implementation.id,
      })
      .subscribe((data) => {
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
      .linkImplementationAndPublication({
        implementationId: this.implementation.id,
        algorithmId: this.implementation.implementedAlgorithmId,
        body: publication,
      })
      .subscribe(() => {
        this.getLinkedPublications();
        this.utilService.callSnackBar('Successfully linked publication');
      });
  }

  unlinkPublications(event): void {
    const promises: Array<Promise<void>> = [];
    for (const publication of event.elements) {
      promises.push(
        this.algorithmService
          .unlinkImplementationAndPublication({
            algorithmId: this.implementation.implementedAlgorithmId,
            implementationId: this.implementation.id,
            publicationId: publication.id,
          })
          .toPromise()
      );
    }
    Promise.all(promises).then(() => {
      this.getLinkedPublications();
      this.utilService.callSnackBar('Successfully unlinked publication(s)');
    });
  }

  onElementClicked(publication: any): void {
    this.router.navigate(['publications', publication.id]);
  }

  onDatalistConfigChanged(event): void {
    this.getLinkedPublications();
  }

  // TODO: Determine if this is still neeeded
  //  onSelectToLink(publication: any): void {
  //    this.linkPublication(this.generateLinkParams(publication.id));
  //    this.linkObject.data = [];
  //  }

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
