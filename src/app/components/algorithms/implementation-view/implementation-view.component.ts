import { Component, OnInit } from '@angular/core';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlgorithmDto } from 'api-atlas/models/algorithm-dto';
import { ImplementationDto } from 'api-atlas/models/implementation-dto';
import { ExecutionEnvironmentsService } from 'api-atlas/services/execution-environments.service';
import { PublicationService } from 'api-atlas/services/publication.service';
import { EntityModelComputeResourcePropertyDto } from 'api-atlas/models/entity-model-compute-resource-property-dto';
import { TagDto } from 'api-atlas/models';
import { BreadcrumbLink } from '../../generics/navigation-breadcrumb/navigation-breadcrumb.component';
import { Option } from '../../generics/property-input/select-input.component';
import {
  SelectParams,
  QueryParams,
} from '../../generics/data-list/data-list.component';
import { InputParameter } from '../impl-selection-criteria/impl-selection-criteria.component';
import { UtilService } from '../../../util/util.service';
import { ConfirmDialogComponent } from '../../generics/dialogs/confirm-dialog.component';

@Component({
  templateUrl: './implementation-view.component.html',
  styleUrls: ['./implementation-view.component.scss'],
})
export class ImplementationViewComponent implements OnInit {
  implementation: ImplementationDto;
  algorithm: AlgorithmDto;
  softwarePlatformOptions: Option[];
  tags: TagDto[] = [];

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
  computeResourceProperties: EntityModelComputeResourcePropertyDto[] = [];

  placeholderInputParams: InputParameter[] = [
    {
      name: 'N',
      datatype: 'Integer',
    },
    {
      name: 'M',
      datatype: 'String',
    },
  ];

  placeholderPrologRule = 'executable(N, shor-general-qiskit) :- N > 2.';

  constructor(
    private algorithmService: AlgorithmService,
    private softwarePlatformService: ExecutionEnvironmentsService,
    private executionEnvironmentsService: ExecutionEnvironmentsService,
    private publicationService: PublicationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.loadGeneral();
  }

  changeTab(tabNumber: number): void {
    // replace with switch case once quantum resource etc works in the backend
    if (tabNumber === 0) {
      this.loadGeneral();
    }
  }

  onDatalistConfigChanged(params: QueryParams): void {
    this.publicationService.getPublications(params).subscribe((data) => {
      console.log(data._embedded?.publications);
    });
  }

  onElementClicked(implementation: any): void {
    this.router.navigate([
      'algorithms',
      implementation.implementedAlgorithmId,
      'implementations',
      implementation.id,
    ]);
  }

  updateComputeResourceProperty(
    property: EntityModelComputeResourcePropertyDto
  ): void {
    this.algorithmService
      .updateComputeResourcePropertyOfImplementation({
        algorithmId: this.implementation.implementedAlgorithmId,
        implementationId: this.implementation.id,
        computeResourcePropertyId: property.id,
        body: property,
      })
      .subscribe(() => {
        this.fetchComputeResourceProperties();
        this.utilService.callSnackBar('Successfully updated property');
      });
  }

  addComputeResourceProperty(
    property: EntityModelComputeResourcePropertyDto
  ): void {
    this.algorithmService
      .createComputeResourcePropertyForImplementation({
        algorithmId: this.implementation.implementedAlgorithmId,
        implementationId: this.implementation.id,
        body: property,
      })
      .subscribe(() => {
        this.fetchComputeResourceProperties();
        this.utilService.callSnackBar('Successfully added property');
      });
  }

  deleteComputeResourceProperty(
    property: EntityModelComputeResourcePropertyDto
  ): void {
    this.utilService
      .createDialog(ConfirmDialogComponent, {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete the following property: ',
        data: [property.type],
        variableName: 'name',
        yesButtonText: 'yes',
        noButtonText: 'no',
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          this.algorithmService
            .deleteComputeResourcePropertyOfImplementation({
              algorithmId: this.implementation.implementedAlgorithmId,
              implementationId: this.implementation.id,
              computeResourcePropertyId: property.id,
            })
            .subscribe(() => {
              this.computeResourceProperties = this.computeResourceProperties.filter(
                (elem: EntityModelComputeResourcePropertyDto) =>
                  elem.id !== property.id
              );
              this.fetchComputeResourceProperties();
              this.utilService.callSnackBar('Successfully deleted property');
            });
        }
      });
  }

  fetchComputeResourceProperties(): void {
    this.algorithmService
      .getComputeResourcePropertiesOfImplementation({
        algorithmId: this.implementation.implementedAlgorithmId,
        implementationId: this.implementation.id,
        page: -1,
      })
      .subscribe((e) => {
        if (e._embedded != null) {
          this.computeResourceProperties =
            e._embedded.computeResourceProperties;
        }
      });
  }

  addTag(tag: TagDto): void {
    this.algorithmService
      .addTagToImplementation({
        algorithmId: this.implementation.implementedAlgorithmId,
        implementationId: this.implementation.id,
        body: tag,
      })
      .subscribe();
  }

  removeTag(tag: TagDto): void {
    this.algorithmService
      .removeTagFromImplementation({
        algorithmId: this.implementation.implementedAlgorithmId,
        implementationId: this.implementation.id,
        body: tag,
      })
      .subscribe();
  }

  updateImplementationField(event: { field; value }): void {
    this.implementation[event.field] = event.value;
    this.algorithmService
      .updateImplementation({
        algorithmId: this.implementation.implementedAlgorithmId,
        implementationId: this.implementation.id,
        body: this.implementation,
      })
      .subscribe(
        (impl) => {
          this.implementation = impl;
          // live refresh name
          let subheading = this.algorithm.computationModel
            .toString()
            .toLowerCase();
          subheading =
            subheading[0].toUpperCase() +
            subheading.slice(1) +
            ' Implementation';
          this.links[1] = {
            heading: this.implementation.name,
            subHeading: subheading,
          };
          this.utilService.callSnackBar('Successfully updated implementation');
        },
        (error) => {
          console.log(error);
        }
      );
  }

  private loadGeneral(): void {
    this.executionEnvironmentsService
      .getSoftwarePlatforms()
      .subscribe((list) => {
        const softwarePlatforms = list._embedded?.softwarePlatforms || [];
        this.softwarePlatformOptions = softwarePlatforms.map((sp) => ({
          label: sp.name,
          value: sp.id,
        }));
      });
    this.activatedRoute.params.subscribe(({ algoId, implId }) => {
      this.algorithmService
        .getAlgorithm({ algorithmId: algoId })
        .subscribe((algo) => {
          this.algorithm = algo;
          let subheading = this.algorithm.computationModel
            .toString()
            .toLowerCase();
          subheading = subheading[0].toUpperCase() + subheading.slice(1);
          this.links[0] = {
            heading: this.algorithm.name,
            subHeading: subheading + ' Algorithm',
            link: '/algorithms/' + algoId,
          };
          this.links[1].subHeading = subheading + ' Implementation';
        });

      this.algorithmService
        .getImplementation({ algorithmId: algoId, implementationId: implId })
        .subscribe((impl) => {
          this.implementation = impl;
          this.links[1].heading = this.implementation.name;
          this.fetchComputeResourceProperties();
          this.getTagsForImplementation(algoId, implId);
        });
    });
  }

  private getTagsForImplementation(algoId: string, implId: string): void {
    this.algorithmService
      .getTagsOfImplementation({
        algorithmId: algoId,
        implementationId: implId,
      })
      .subscribe((next) => {
        if (next._embedded?.tags) {
          this.tags = next._embedded.tags.map((t) => ({
            value: t.value,
            category: t.category,
          }));
        }
      });
  }
}
