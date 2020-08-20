import { Component, Input, OnInit } from '@angular/core';
import { EntityModelAlgorithmDto } from 'api-atlas/models/entity-model-algorithm-dto';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import { EntityModelPublicationDto } from 'api-atlas/models/entity-model-publication-dto';
import { PublicationService } from 'api-atlas/services/publication.service';
import { Router } from '@angular/router';
import { PublicationDto } from 'api-atlas/models/publication-dto';
import { LinkObject } from '../../generics/data-list/data-list.component';
import { UtilService } from '../../../util/util.service';
import { ConfirmDialogComponent } from '../../generics/dialogs/confirm-dialog.component';

@Component({
  selector: 'app-algorithm-publications-list',
  templateUrl: './algorithm-publications-list.component.html',
  styleUrls: ['./algorithm-publications-list.component.scss'],
})
export class AlgorithmPublicationsListComponent implements OnInit {
  @Input() algorithm: EntityModelAlgorithmDto;
  @Input() linkedPublications: EntityModelPublicationDto[] = [];

  publications: EntityModelPublicationDto[];
  variableNames: string[] = ['title', 'authors', 'doi'];
  tableColumns: string[] = ['Title', 'Authors', 'DOI'];
  linkObject: LinkObject = {
    title: 'Link publication with ',
    subtitle: 'Search publications by title',
    displayVariable: 'title',
    data: [],
  };
  tableAddAllowed = true;
  isLinkingEnabled = false;

  constructor(
    private algorithmService: AlgorithmService,
    private publicationService: PublicationService,
    private router: Router,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.linkObject.title += this.algorithm.name;
    this.getLinkedPublications({ algoId: this.algorithm.id });
  }

  getLinkedPublications(params): void {
    this.algorithmService
      .getPublicationsByAlgorithm(params)
      .subscribe((publications) => {
        if (publications._embedded) {
          this.linkedPublications = publications._embedded.publications;
        } else {
          this.linkedPublications = [];
        }
      });
  }

  searchUnlinkedPublications(search: string): void {
    // Search for unlinked algorithms if search-text is not empty
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
    // Link algorithm
    this.algorithmService
      .addPublication({ algoId: this.algorithm.id, body: publication })
      .subscribe((data) => {
        this.getLinkedPublications({ algoId: this.algorithm.id });
        this.utilService.callSnackBar('Successfully linked Publication');
      });
  }

  async unlinkPublications(event): Promise<void> {
    // Iterate all selected algorithms
    for (const publication of event.elements) {
      await this.algorithmService
        .deleteReferenceToPublication({
          algoId: this.algorithm.id,
          publicationId: publication.id,
        })
        .toPromise();
      this.getLinkedPublications({ algoId: this.algorithm.id });
      this.utilService.callSnackBar('Successfully unlinked Publication');
    }
  }

  onAddElement(): void {}

  onDatalistConfigChanged(event): void {
    this.getLinkedPublications({ algoId: this.algorithm.id });
  }

  onElementClicked(publication: PublicationDto): void {
    this.router.navigate(['publications', publication.id]);
  }

  updateLinkablePublications(publicationData): void {
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
