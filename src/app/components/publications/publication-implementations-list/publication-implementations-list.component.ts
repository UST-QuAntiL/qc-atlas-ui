import { Component, Input, OnInit } from '@angular/core';
import { EntityModelPublicationDto } from 'api-atlas/models/entity-model-publication-dto';
import { Router } from '@angular/router';
import { PublicationService } from 'api-atlas/services/publication.service';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import { EntityModelImplementationDto } from 'api-atlas/models/entity-model-implementation-dto';
import { ImplementationDto } from 'api-atlas/models/implementation-dto';

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
    private publicationService: PublicationService,
    private algorithmService: AlgorithmService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getLinkedImplementations({ publicationId: this.publication.id });
  }

  onDatalistConfigChanged(event): void {
    this.getLinkedImplementations({ publicationId: this.publication.id });
  }

  getLinkedImplementations(params: {
    publicationId: string;
    search?: string;
    page?: number;
    size?: number;
    sort?: string[];
  }): void {
    this.publicationService
      .getImplementationsOfPublication(params)
      .subscribe((data) => {
        // Read all incoming data
        if (data._embedded) {
          this.linkedImplementations = data._embedded.implementations;
        } else {
          this.linkedImplementations = [];
        }
      });
  }

  onElementClicked(implementation: ImplementationDto): void {
    this.router.navigate([
      'algorithms',
      implementation.implementedAlgorithmId,
      'implementations',
      implementation.id,
    ]);
  }
}
