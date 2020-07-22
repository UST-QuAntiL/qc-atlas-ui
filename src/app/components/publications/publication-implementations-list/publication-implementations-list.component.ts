import { Component, Input, OnInit } from '@angular/core';
import { EntityModelPublicationDto } from 'api/models/entity-model-publication-dto';
import { Router } from '@angular/router';
import { PublicationService } from 'api/services/publication.service';
import { AlgorithmService } from 'api/services/algorithm.service';
import { EntityModelImplementationDto } from 'api/models/entity-model-implementation-dto';
import { GenericDataService } from '../../../util/generic-data.service';

@Component({
  selector: 'app-publication-implementations-list',
  templateUrl: './publication-implementations-list.component.html',
  styleUrls: ['./publication-implementations-list.component.scss'],
})
export class PublicationImplementationsListComponent implements OnInit {
  @Input() publication: EntityModelPublicationDto;
  linkedImplementations: EntityModelImplementationDto[] = [];
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
    private publicationService: PublicationService,
    private algorithmService: AlgorithmService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getLinkedImplementations({ id: this.publication.id });
  }

  onDatalistConfigChanged(event): void {
    this.getLinkedImplementations({ id: this.publication.id });
  }

  getLinkedImplementations(params): void {
    this.publicationService.getImplementations1(params).subscribe((data) => {
      // Read all incoming data
      if (data._embedded) {
        this.linkedImplementations = data._embedded.implementations;
      } else {
        this.linkedImplementations = [];
      }
    });
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
