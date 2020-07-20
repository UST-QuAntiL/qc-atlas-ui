import { Component, Input, OnInit } from '@angular/core';
import { EntityModelPublicationDto } from 'api/models/entity-model-publication-dto';
import { AlgorithmService } from 'api/services/algorithm.service';
import { PublicationService } from 'api/services/publication.service';
import { GenericDataService } from '../../../util/generic-data.service';

@Component({
  selector: 'app-publication-algorithms-list',
  templateUrl: './publication-algorithms-list.component.html',
  styleUrls: ['./publication-algorithms-list.component.scss'],
})
export class PublicationAlgorithmsListComponent implements OnInit {
  @Input() publication: EntityModelPublicationDto;
  algorithms: any[] = [];
  linkedAlgorithms: any[] = [];
  publicationLinks: any;
  searchText: any;
  tableColumns = ['Name', 'Acronym', 'Type', 'Problem'];
  variableNames = ['name', 'acronym', 'computationModel', 'problem'];

  constructor(
    private genericDataService: GenericDataService,
    private algorithmService: AlgorithmService,
    private publicationService: PublicationService
  ) {}

  ngOnInit(): void {
    this.publicationLinks = JSON.parse(JSON.stringify(this.publication._links));
    this.getPublicationAlgorithms(this.publicationLinks.algorithms.href);
  }

  getPublicationAlgorithms(url: string): void {
    this.genericDataService.getData(url).subscribe((data) => {
      this.prepareRelatedAlgorithmData(JSON.parse(JSON.stringify(data)));
    });
  }

  getAlgorithms(params): void {
    this.algorithmService.getAlgorithms(params).subscribe((data) => {
      this.prepareAlgorithmData(JSON.parse(JSON.stringify(data)));
    });
  }

  linkAlgorithm(params: any): void {
    this.publicationService.addAlgorithm(params).subscribe((data) => {
      this.getPublicationAlgorithms(this.publicationLinks.algorithms.href);
    });
  }

  unlinkAlgorithms(event): void {
    // Iterate all selected algorithms
    for (const element of event.elements) {
      // Build params using path ids and perform delete request
      this.publicationService
        .deleteReferenceToAlgorithm(this.generateLinkParams(element.id))
        .subscribe((data) => {
          // Update table after deletion
          this.getPublicationAlgorithms(this.publicationLinks.algorithms.href);
        });
    }
  }

  prepareRelatedAlgorithmData(data): void {
    // Read all incoming data
    if (data._embedded) {
      this.linkedAlgorithms = data._embedded.algorithms;
    } else {
      this.linkedAlgorithms = [];
    }
  }

  prepareAlgorithmData(data): void {
    // Read all incoming data
    if (data._embedded) {
      this.algorithms = data._embedded.algorithms;
    } else {
      this.algorithms = [];
    }
  }

  onElementClicked(algorithm: any): void {
    console.log('Algorithm clicked');
  }

  onDatalistConfigChanged(event): void {
    console.log('Config change clicked!');
    this.getPublicationAlgorithms(this.publicationLinks.algorithms.href);
  }

  onSearchChange(): void {
    console.log(this.searchText);
    if (this.searchText.length > 0) {
      const params = {
        search: this.searchText,
      };
      this.getAlgorithms(params);
    }
  }

  onSelectToLink(algorithm: any): void {
    this.linkAlgorithm(this.generateLinkParams(algorithm.id));
  }

  generateLinkParams(algorithmId: string): any {
    return {
      id: this.publication.id,
      algoId: algorithmId,
    };
  }
}
