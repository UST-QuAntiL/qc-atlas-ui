import { Component, OnInit } from '@angular/core';
import { AlgorithmService } from 'api/services/algorithm.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlgorithmDto } from 'api/models/algorithm-dto';
import { ImplementationDto } from 'api/models/implementation-dto';
import { SoftwarePlatformService } from 'api/services/software-platform.service';
import { PublicationService } from 'api/services/publication.service';
import { EntityModelComputingResourcePropertyDto } from 'api/models/entity-model-computing-resource-property-dto';
import { BreadcrumbLink } from '../../generics/navigation-breadcrumb/navigation-breadcrumb.component';
import { Option } from '../../generics/property-input/select-input.component';
import {
  DeleteParams,
  QueryParams,
} from '../../generics/data-list/data-list.component';

@Component({
  templateUrl: './implementation-view.component.html',
  styleUrls: ['./implementation-view.component.scss'],
})
export class ImplementationViewComponent implements OnInit {
  impl: ImplementationDto;
  algo: AlgorithmDto;
  softwarePlatformOptions: Option[];

  quantumResources: any[] = [];
  tableColumns = ['Name', 'Datatype', 'Description', 'Value'];
  variableNames = ['name', 'datatype', 'description', 'value'];
  pagingInfo: any = {};
  paginatorConfig: any = {
    amountChoices: [1, 2, 3],
    selectedAmount: 1,
  };

  links: BreadcrumbLink[] = [
    { heading: '', subHeading: '' },
    { heading: '', subHeading: '' },
  ];
  computeResourceProperties: EntityModelComputingResourcePropertyDto[] = [];

  constructor(
    private algorithmService: AlgorithmService,
    private softwarePlatformService: SoftwarePlatformService,
    private publicationService: PublicationService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadGeneral();
  }

  onChangeImpl(): void {
    this.algorithmService
      .updateImplementation({
        algoId: this.algo.id,
        implId: this.impl.id,
        body: this.impl,
      })
      .subscribe();
    // live refresh name
    this.links[1] = {
      heading: this.impl.name,
      subHeading: '',
    };
  }

  changeTab(tabNumber: number): void {
    // replace with switch case once quantum resource etc works in the backend
    if (tabNumber === 0) {
      this.loadGeneral();
    }
  }
  onAddQuantumResource(): void {}

  onDeleteQuantumResource($event: DeleteParams): void {}

  onDatalistConfigChanged(params: QueryParams): void {
    this.publicationService.getPublications2(params).subscribe((data) => {
      console.log(data._embedded?.publications);
    });
  }

  onElementClicked(implementation: any): void {
    this.router.navigate([
      'algorithms',
      this.algo.id,
      'implementations',
      implementation.id,
    ]);
  }

  onPageChanged($event: string): void {}

  addComputeResourceProperty(
    property: EntityModelComputingResourcePropertyDto
  ): void {
    console.log('add compute resource property');
    console.log(property);
    this.algorithmService
      .addComputingResource1({
        algoId: this.algo.id,
        implId: this.impl.id,
        body: property,
      })
      .subscribe((e) => {
        this.fetchComputeResourceProperties();
      });
  }

  updateComputeResourceProperty(
    property: EntityModelComputingResourcePropertyDto
  ): void {
    this.algorithmService
      .updateComputingResource1({
        algoId: this.algo.id,
        implId: this.impl.id,
        resourceId: property.id,
        body: property,
      })
      .subscribe((e) => {
        this.fetchComputeResourceProperties();
      });
  }

  deleteComputeResourceProperty(
    property: EntityModelComputingResourcePropertyDto
  ): void {
    this.algorithmService
      .deleteComputingResource1({
        algoId: this.algo.id,
        implId: this.impl.id,
        resourceId: property.id,
      })
      .subscribe((e) => {
        this.computeResourceProperties = this.computeResourceProperties.filter(
          (elem: EntityModelComputingResourcePropertyDto) =>
            elem.id !== property.id
        );
        this.fetchComputeResourceProperties();
      });
  }

  fetchComputeResourceProperties(): void {
    this.algorithmService
      .getComputingResources1({
        algoId: this.algo.id,
        implId: this.impl.id,
        page: 0,
        // TODO find better option, e.g. use a pagination for the list
        size: 1000,
      })
      .subscribe((e) => {
        if (e._embedded != null) {
          this.computeResourceProperties =
            e._embedded.computingResourceProperties;
        }
      });
  }

  private loadGeneral(): void {
    this.softwarePlatformService.getSoftwarePlatforms1().subscribe((list) => {
      const softwarePlatforms = list._embedded?.softwarePlatforms || [];
      this.softwarePlatformOptions = softwarePlatforms.map((sp) => ({
        label: sp.name,
        value: sp.id,
      }));
    });
    this.activatedRoute.params.subscribe(({ algoId, implId }) => {
      this.algorithmService.getAlgorithm({ algoId }).subscribe((algo) => {
        this.algo = algo;
        this.links[0] = {
          heading: this.algo.name,
          subHeading: this.algo.computationModel + ' Algorithm',
          link: '/algorithms/' + algoId,
        };
      });

      this.algorithmService
        .getImplementation({ algoId, implId })
        .subscribe((impl) => {
          this.impl = impl;
          this.links[1] = {
            heading: this.impl.name,
            subHeading: '',
          };
          this.fetchComputeResourceProperties();
        });
    });
  }
}
