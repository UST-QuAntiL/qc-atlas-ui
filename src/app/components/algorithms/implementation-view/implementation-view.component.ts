import { Component, OnInit } from '@angular/core';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AlgorithmDto } from 'api-atlas/models/algorithm-dto';
import { ExecutionEnvironmentsService } from 'api-atlas/services/execution-environments.service';
import { PublicationService } from 'api-atlas/services/publication.service';
import { ComputeResourcePropertyDto } from 'api-atlas/models/compute-resource-property-dto';
import { ImplementationDto, TagDto } from 'api-atlas/models';
import { RevisionDto } from 'api-atlas/models';
import { ImplementationsService } from 'api-atlas/services/implementations.service';
import { ApiConfiguration } from 'api-atlas/api-configuration';
import { BreadcrumbLink } from '../../generics/navigation-breadcrumb/navigation-breadcrumb.component';
import { Option } from '../../generics/property-input/select-input.component';
import { UtilService } from '../../../util/util.service';
import { ConfirmDialogComponent } from '../../generics/dialogs/confirm-dialog.component';
import { ChangePageGuard } from '../../../services/deactivation-guard';
import { UiFeatures } from '../../../directives/qc-atlas-ui-repository-configuration.service';
import {
  ComparedData,
  CompareVersionDialogComponent,
} from '../dialogs/compare-version-dialog.component';

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
  revisions: RevisionDto[] = [];

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
  generalTabVisible = true;
  revisionBadgeHidden = true;
  revisionCounter = 0;
  // TODO: revisionAvailable is obsolete if the planqk platform supports versioning
  revisionAvailable = false;
  compareVersion = false;

  constructor(
    private algorithmService: AlgorithmService,
    private implementationsService: ImplementationsService,
    private softwarePlatformService: ExecutionEnvironmentsService,
    private executionEnvironmentsService: ExecutionEnvironmentsService,
    private publicationService: PublicationService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private utilService: UtilService,
    private config: ApiConfiguration,
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
          this.revisionCounter++;
          this.revisionBadgeHidden = false;
          this.fetchRevisions();
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
      this.generalTabVisible = true;
    } else {
      this.generalTabVisible = false;
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

  getRevision(revision: RevisionDto): void {
    this.implementationsService
      .getImplementationRevision({
        implementationId: this.implementation.id,
        revisionId: revision.id,
      })
      .subscribe(
        (implementationRevision) => {
          this.frontendImplementation = implementationRevision;
          let subheading = this.algorithm.computationModel
            .toString()
            .toLowerCase();
          subheading =
            subheading[0].toUpperCase() +
            subheading.slice(1) +
            ' Implementation';
          this.links[1] = {
            heading: this.frontendImplementation.name,
            subHeading: subheading,
          };
          this.utilService.callSnackBar(
            'Implementation revision ' +
              revision.id +
              ' has been loaded successfully.'
          );
        },
        (error) => {
          console.log(error);
          this.utilService.callSnackBar(
            'Error! Could not load Implementation revision ' + revision.id
          );
        }
      );
  }

  fetchRevisions(): void {
    // TODO: check is obsolete if the planqk platform supports versioning
    if (this.config.rootUrl.includes('platform.planqk')) {
      this.revisionAvailable = false;
    } else {
      this.implementationsService
        .getImplementationRevisions({
          implementationId: this.implementation.id,
        })
        .subscribe((data) => {
          this.revisionAvailable = true;
          this.prepareRevisionData(data);
        });
    }
  }

  prepareRevisionData(data): void {
    // Read all incoming data
    if (data.content) {
      this.revisions = data.content;
    } else {
      this.revisions = [];
    }
  }

  resetRevisionBadge(): void {
    this.revisionBadgeHidden = true;
    this.revisionCounter = 0;
  }

  compare(): void {
    this.compareVersion = true;
  }

  compareRevision(revision: RevisionDto): void {
    this.implementationsService
      .getImplementationRevision({
        implementationId: this.implementation.id,
        revisionId: revision.id,
      })
      .subscribe(
        (implementationRevision) => {
          this.comparePropertiesOfVersions(
            this.frontendImplementation,
            implementationRevision
          );
          this.utilService.callSnackBar(
            'Algorithm revision ' +
              revision.id +
              ' has been fetched successfully for comparison.'
          );
        },
        () => {
          this.utilService.callSnackBar(
            'Error! Could not fetch Algorithm revision for comparison' +
              revision.id
          );
        }
      );
  }

  comparePropertiesOfVersions(
    currentVersion: ImplementationDto,
    compareVersion: ImplementationDto
  ): void {
    const versionComparision = this.compareVersions(
      currentVersion,
      compareVersion
    );
    const dialogRef = this.utilService.createDialog(
      CompareVersionDialogComponent,
      {
        title: 'Compare Versions',
        versionComparision,
      },
      {
        width: '500px',
      }
    );
    dialogRef.afterClosed().subscribe((result) => {
      this.compareVersion = false;
    });
  }

  compareVersions(
    currentVersion: ImplementationDto,
    compareVersion: ImplementationDto
  ): ComparedData[] {
    const differences = new Array<ComparedData>();
    differences.push(
      this.caluclateDifference('Name', currentVersion.name, compareVersion.name)
    );
    differences.push(
      this.caluclateDifference(
        'Contributors',
        currentVersion.contributors,
        compareVersion.contributors
      )
    );
    differences.push(
      this.caluclateDifference(
        'Version',
        currentVersion.version,
        compareVersion.version
      )
    );
    differences.push(
      this.caluclateDifference(
        'License',
        currentVersion.license,
        compareVersion.license
      )
    );
    differences.push(
      this.caluclateDifference(
        'Dependencies',
        currentVersion.dependencies,
        compareVersion.dependencies
      )
    );
    differences.push(
      this.caluclateDifference(
        'Description',
        currentVersion.description,
        compareVersion.description
      )
    );
    differences.push(
      this.caluclateDifference(
        'Input Format',
        currentVersion.inputFormat,
        compareVersion.inputFormat
      )
    );
    differences.push(
      this.caluclateDifference(
        'Output Format',
        currentVersion.outputFormat,
        compareVersion.outputFormat
      )
    );
    differences.push(
      this.caluclateDifference(
        'Parameter',
        currentVersion.parameter,
        compareVersion.parameter
      )
    );
    return differences;
  }

  caluclateDifference(
    propertyName: string,
    firstValue: string,
    secondValue: string
  ): ComparedData {
    if (firstValue !== secondValue) {
      return {
        property: propertyName,
        currentVersionValue: firstValue,
        compareVersionValue: secondValue,
      };
    }
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
            this.fetchRevisions();
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
