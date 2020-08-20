import { Component, Input, OnInit } from '@angular/core';
import { EntityModelPublicationDto } from 'api-atlas/models/entity-model-publication-dto';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import { PublicationService } from 'api-atlas/services/publication.service';
import { EntityModelAlgorithmDto } from 'api-atlas/models/entity-model-algorithm-dto';
import { Router } from '@angular/router';
import { AlgorithmDto } from 'api-atlas/models/algorithm-dto';
import { LinkObject } from '../../generics/data-list/data-list.component';
import { UtilService } from '../../../util/util.service';

@Component({
  selector: 'app-publication-algorithms-list',
  templateUrl: './publication-algorithms-list.component.html',
  styleUrls: ['./publication-algorithms-list.component.scss'],
})
export class PublicationAlgorithmsListComponent implements OnInit {
  @Input() publication: EntityModelPublicationDto;
  linkedAlgorithms: EntityModelAlgorithmDto[] = [];
  tableColumns = ['Name', 'Acronym', 'Type', 'Problem'];
  variableNames = ['name', 'acronym', 'computationModel', 'problem'];
  linkObject: LinkObject = {
    title: 'Link algorithm with ',
    subtitle: 'Search algorithm by name',
    displayVariable: 'name',
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
    this.linkObject.title += this.publication.title;
    this.getLinkedAlgorithms({ id: this.publication.id });
  }

  getLinkedAlgorithms(params): void {
    this.publicationService
      .getPublicationAlgorithms(params)
      .subscribe((algorithms) => {
        if (algorithms._embedded) {
          this.linkedAlgorithms = algorithms._embedded.algorithms;
        } else {
          this.linkedAlgorithms = [];
        }
      });
  }

  searchUnlinkedAlgorithms(search: string): void {
    // Search for unlinked algorithms if search-text is not empty
    if (search) {
      this.algorithmService.getAlgorithms({ search }).subscribe((data) => {
        this.updateLinkableAlgorithms(data._embedded);
      });
    } else {
      this.linkObject.data = [];
    }
  }

  updateLinkableAlgorithms(algorithmData): void {
    // Clear list of linkable algorithms
    this.linkObject.data = [];
    // If linkable algorithms found
    if (algorithmData) {
      // Search algorithms and filter only those that are not already linked
      for (const algorithm of algorithmData.algorithms) {
        if (!this.linkedAlgorithms.some((alg) => alg.id === algorithm.id)) {
          this.linkObject.data.push(algorithm);
        }
      }
    }
  }

  linkAlgorithm(algorithm: AlgorithmDto): void {
    // Generate parameters
    const params = this.generateLinkParams(algorithm.id);
    // Empty unlinked algorithms
    this.linkObject.data = [];
    // Link algorithm
    this.publicationService
      .linkAlgorithmWithPublication(params)
      .subscribe((linkedAlgorithm) => {
        this.getLinkedAlgorithms({ id: this.publication.id });
        this.utilService.callSnackBar('Successfully linked Algorithm');
      });
  }

  unlinkAlgorithms(event): void {
    // Iterate all selected algorithms
    for (const element of event.elements) {
      // Build params using path ids and perform delete request
      this.publicationService
        .unlinkAlgorithmFromPublication(this.generateLinkParams(element.id))
        .subscribe((data) => {
          // Update table after deletion
          this.getLinkedAlgorithms({ id: this.publication.id });
          this.utilService.callSnackBar('Successfully unlinked Algorithm');
        });
    }
  }

  onElementClicked(algorithm: any): void {
    this.router.navigate(['algorithms', algorithm.id]);
  }

  onDatalistConfigChanged(event): void {
    this.getLinkedAlgorithms({ id: this.publication.id });
  }

  generateLinkParams(algorithmId: string): any {
    return {
      id: this.publication.id,
      algoId: algorithmId,
    };
  }

  onToggleLink(): void {
    this.isLinkingEnabled = !this.isLinkingEnabled;
    this.tableAddAllowed = !this.tableAddAllowed;
  }
}
