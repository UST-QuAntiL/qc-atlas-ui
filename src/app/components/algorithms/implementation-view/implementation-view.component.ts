import { Component, OnInit } from '@angular/core';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlgorithmDto } from 'api-atlas/models/algorithm-dto';
import { ExecutionEnvironmentsService } from 'api-atlas/services/execution-environments.service';
import { PublicationService } from 'api-atlas/services/publication.service';
import { ComputeResourcePropertyDto } from 'api-atlas/models/compute-resource-property-dto';
import { ImplementationDto, TagDto } from 'api-atlas/models';
import { BreadcrumbLink } from '../../generics/navigation-breadcrumb/navigation-breadcrumb.component';
import { Option } from '../../generics/property-input/select-input.component';
import { UtilService } from '../../../util/util.service';
import { ConfirmDialogComponent } from '../../generics/dialogs/confirm-dialog.component';
import { ChangePageGuard } from '../../../services/deactivation-guard';
import { UiFeatures } from '../../../directives/qc-atlas-ui-repository-configuration.service';

@Component({
  templateUrl: './implementation-view.component.html',
  styleUrls: ['./implementation-view.component.scss'],
})
export class ImplementationViewComponent implements OnInit {
  readonly UiFeatures = UiFeatures;

  implementation: ImplementationDto;
  frontendImplementation: ImplementationDto;
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
  computeResourceProperties: ComputeResourcePropertyDto[] = [];

  constructor(
    private algorithmService: AlgorithmService,
    private softwarePlatformService: ExecutionEnvironmentsService,
    private executionEnvironmentsService: ExecutionEnvironmentsService,
    private publicationService: PublicationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private utilService: UtilService,
    public guard: ChangePageGuard
  ) {}

  ngOnInit(): void {
    this.loadGeneral();
  }

  saveImplementation(
    updatedImplementation: ImplementationDto,
    updateFrontendImplementation: boolean
  ): void {
    this.algorithmService
      .updateImplementation({
        algorithmId: this.algorithm.id,
        implementationId: this.implementation.id,
        body: updatedImplementation,
      })
      .subscribe(
        (impl) => {
          this.implementation = impl;
          if (updateFrontendImplementation) {
            this.frontendImplementation = JSON.parse(
              JSON.stringify(impl)
            ) as ImplementationDto;
          }
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
          this.utilService.callSnackBar(
            'Implementation was successfully updated.'
          );
        },
        (error) => {
          console.log(error);
          this.utilService.callSnackBar(
            'Error! Could not update implementation.'
          );
        }
      );
  }

  changeTab(tabNumber: number): void {
    // replace with switch case once quantum resource etc works in the backend
    if (tabNumber === 0) {
      this.loadGeneral();
    }
  }

  onElementClicked(implementation: any): void {
    this.router.navigate([
      'algorithms',
      implementation.implementedAlgorithmId,
      'implementations',
      implementation.id,
    ]);
  }

  updateComputeResourceProperty(property: ComputeResourcePropertyDto): void {
    this.algorithmService
      .updateComputeResourcePropertyOfImplementation({
        algorithmId: this.implementation.implementedAlgorithmId,
        implementationId: this.implementation.id,
        computeResourcePropertyId: property.id,
        body: property,
      })
      .subscribe(
        () => {
          this.fetchComputeResourceProperties();
          this.utilService.callSnackBar(
            'Compute resource property was successfully updated.'
          );
        },
        () => {
          this.utilService.callSnackBar(
            'Error! Could not update compute resource property.'
          );
        }
      );
  }

  addComputeResourceProperty(property: ComputeResourcePropertyDto): void {
    this.algorithmService
      .createComputeResourcePropertyForImplementation({
        algorithmId: this.implementation.implementedAlgorithmId,
        implementationId: this.implementation.id,
        body: property,
      })
      .subscribe(
        () => {
          this.fetchComputeResourceProperties();
          this.utilService.callSnackBar(
            'Compute resource property was successfully added.'
          );
        },
        () => {
          this.utilService.callSnackBar(
            'Error! Could not add compute resource property.'
          );
        }
      );
  }

  deleteComputeResourceProperty(property: ComputeResourcePropertyDto): void {
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
            .subscribe(
              () => {
                this.computeResourceProperties = this.computeResourceProperties.filter(
                  (elem: ComputeResourcePropertyDto) => elem.id !== property.id
                );
                this.fetchComputeResourceProperties();
                this.utilService.callSnackBar(
                  'Compute resource property was successfully deleted.'
                );
              },
              () => {
                this.utilService.callSnackBar(
                  'Error! Could not delete compute resource property.'
                );
              }
            );
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
        if (e.content != null) {
          this.computeResourceProperties = e.content;
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
      .toPromise()
      .then(() => {
        this.utilService.callSnackBar('Tag was successfully added.');
      })
      .catch(() => {
        this.utilService.callSnackBar('Error! Could not add tag.');
      });
  }

  removeTag(tag: TagDto): void {
    this.algorithmService
      .removeTagFromImplementation({
        algorithmId: this.implementation.implementedAlgorithmId,
        implementationId: this.implementation.id,
        body: tag,
      })
      .toPromise()
      .then(() => {
        this.utilService.callSnackBar('Tag was successfully removed.');
      })
      .catch(() => {
        this.utilService.callSnackBar('Error! Could not remove tag.');
      });
  }

  updateImplementationField(event: { field; value }): void {
    this.implementation[event.field] = event.value;
    this.saveImplementation(this.implementation, false);
  }

  private loadGeneral(): void {
    this.executionEnvironmentsService.getSoftwarePlatforms().subscribe(
      (list) => {
        const softwarePlatforms = list.content || [];
        this.softwarePlatformOptions = softwarePlatforms.map((sp) => ({
          label: sp.name,
          value: sp.id,
        }));
      },
      () => {
        this.utilService.callSnackBar(
          'Error! Software platform could not be retrieved.'
        );
      }
    );
    this.activatedRoute.params.subscribe(({ algoId, implId }) => {
      this.algorithmService.getAlgorithm({ algorithmId: algoId }).subscribe(
        (algo) => {
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
        },
        () => {
          this.utilService.callSnackBar(
            'Error! Algorithm could not be retrieved.'
          );
        }
      );

      this.algorithmService
        .getImplementation({ algorithmId: algoId, implementationId: implId })
        .subscribe(
          (impl) => {
            this.implementation = impl;
            this.frontendImplementation = JSON.parse(
              JSON.stringify(impl)
            ) as ImplementationDto;
            this.links[1].heading = this.implementation.name;
            this.fetchComputeResourceProperties();
            this.getTagsForImplementation(algoId, implId);
          },
          () => {
            this.utilService.callSnackBar(
              'Error! Implementation could not be retrieved.'
            );
          }
        );
    });
  }

  private getTagsForImplementation(algoId: string, implId: string): void {
    this.algorithmService
      .getTagsOfImplementation({
        algorithmId: algoId,
        implementationId: implId,
      })
      .subscribe(
        (next) => {
          if (next) {
            this.tags = next.map((t) => ({
              value: t.value,
              category: t.category,
            }));
          }
        },
        () => {
          this.utilService.callSnackBar('Error! Tags could not be retrieved.');
        }
      );
  }
}
