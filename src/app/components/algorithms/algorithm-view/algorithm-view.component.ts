import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlgorithmDto } from 'api-atlas/models/algorithm-dto';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApplicationAreaDto } from 'api-atlas/models/application-area-dto';
import { ApplicationAreasService } from 'api-atlas/services/application-areas.service';
import { ProblemTypeService } from 'api-atlas/services/problem-type.service';
import { ProblemTypeDto } from 'api-atlas/models/problem-type-dto';
import { TagDto } from 'api-atlas/models/tag-dto';
import { RevisionDto } from 'api-atlas/models/revision-dto';
import { ApiConfiguration } from 'api-atlas/api-configuration';
import { BreadcrumbLink } from '../../generics/navigation-breadcrumb/navigation-breadcrumb.component';
import { UtilService } from '../../../util/util.service';
import { UiFeatures } from '../../../directives/qc-atlas-ui-repository-configuration.service';
import { ChangePageGuard } from '../../../services/deactivation-guard';
import { CompareVersionDialogComponent } from '../dialogs/compare-version-dialog.component';

@Component({
  selector: 'app-algorithm-view',
  templateUrl: './algorithm-view.component.html',
  styleUrls: ['./algorithm-view.component.scss'],
})
export class AlgorithmViewComponent implements OnInit, OnDestroy {
  readonly UiFeatures = UiFeatures;

  revisions: RevisionDto[] = [];
  algorithm: AlgorithmDto;
  frontendAlgorithm: AlgorithmDto;
  applicationAreas: ApplicationAreaDto[];
  problemTypes: ProblemTypeDto[];
  tags: TagDto[] = [];
  generalTab = true;
  revisionBadgeHidden = true;
  revisionCounter = 0;
  // TODO: revisionAvailable is obsolete if the planqk platform supports versioning
  revisionAvailable = false;
  compareVersion = false;

  links: BreadcrumbLink[] = [{ heading: '', subHeading: '' }];

  private routeSub: Subscription;

  constructor(
    private algorithmService: AlgorithmService,
    private applicationAreasService: ApplicationAreasService,
    private problemTypeService: ProblemTypeService,
    private route: ActivatedRoute,
    private utilService: UtilService,
    private config: ApiConfiguration,
    public guard: ChangePageGuard
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(({ algoId }) => {
      this.algorithmService.getAlgorithm({ algorithmId: algoId }).subscribe(
        (algo: AlgorithmDto) => {
          this.algorithm = algo;
          this.frontendAlgorithm = JSON.parse(
            JSON.stringify(algo)
          ) as AlgorithmDto;
          let subheading = this.algorithm.computationModel
            .toString()
            .toLowerCase();
          subheading = subheading[0].toUpperCase() + subheading.slice(1);
          this.links[0] = {
            heading: this.createBreadcrumbHeader(this.algorithm),
            subHeading: subheading + ' Algorithm',
          };
          this.getApplicationAreasForAlgorithm(algoId);
          this.getProblemTypesForAlgorithm(algoId);
          this.getTagsForAlgorithm(algoId);
          this.fetchRevisions();
        },
        () => {
          this.utilService.callSnackBar(
            'Error! Algorithm could not be retrieved.'
          );
        }
      );
    });
  }

  changeTab(tabNumber: number): void {
    if (tabNumber === 0) {
      this.generalTab = true;
    } else {
      this.generalTab = false;
    }
  }
  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  saveAlgorithm(
    updatedAlgorithm: AlgorithmDto,
    updateFrontendAlgorithm: boolean
  ): void {
    this.algorithmService
      .updateAlgorithm({
        algorithmId: this.algorithm.id,
        body: updatedAlgorithm,
      })
      .subscribe(
        (algo) => {
          this.algorithm = algo;
          if (updateFrontendAlgorithm) {
            this.frontendAlgorithm = JSON.parse(
              JSON.stringify(algo)
            ) as AlgorithmDto;
          }
          this.links[0] = {
            heading: this.createBreadcrumbHeader(this.algorithm),
            subHeading: this.algorithm.computationModel + ' Algorithm',
          };
          this.revisionCounter++;
          this.revisionBadgeHidden = false;
          this.fetchRevisions();
          this.utilService.callSnackBar('Algorithm was successfully updated.');
        },
        (error) => {
          console.log(error);
          this.utilService.callSnackBar('Error! Could not update algorithm.');
        }
      );
  }

  getApplicationAreasForAlgorithm(algoId: string): void {
    this.algorithmService
      .getApplicationAreasOfAlgorithm({ algorithmId: algoId })
      .subscribe(
        (areas) => {
          if (areas.content) {
            this.applicationAreas = areas.content;
          } else {
            this.applicationAreas = [];
          }
        },
        (error) => {
          console.log(error);
          this.applicationAreas = [];
        }
      );
  }

  getProblemTypesForAlgorithm(algoId: string): void {
    this.algorithmService
      .getProblemTypesOfAlgorithm({ algorithmId: algoId })
      .subscribe(
        (problems) => {
          if (problems.content) {
            this.problemTypes = problems.content;
          } else {
            this.problemTypes = [];
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  addTag(tag: TagDto): void {
    this.algorithmService
      .addTagToAlgorithm({
        algorithmId: this.algorithm.id,
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
      .removeTagFromAlgorithm({
        algorithmId: this.algorithm.id,
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

  updateAlgorithmField(event: { field; value }): void {
    this.algorithm[event.field] = event.value;
    this.saveAlgorithm(this.algorithm, false);
  }

  addApplicationArea(applicationArea: ApplicationAreaDto): void {
    this.algorithmService
      .linkAlgorithmAndApplicationArea({
        algorithmId: this.algorithm.id,
        body: applicationArea,
      })
      .subscribe(
        () => {
          this.utilService.callSnackBar(
            'Successfully linked application area "' +
              applicationArea.name +
              '" to algorithm "' +
              this.algorithm.name +
              '".'
          );
          this.getApplicationAreasForAlgorithm(this.algorithm.id);
        },
        () => {
          this.utilService.callSnackBar(
            'Error! Could not link application area "' +
              applicationArea.name +
              '" to algorithm "' +
              this.algorithm.name +
              '".'
          );
        }
      );
  }

  removeApplicationArea(applicationArea: ApplicationAreaDto): void {
    this.algorithmService
      .unlinkAlgorithmAndApplicationArea({
        algorithmId: this.algorithm.id,
        applicationAreaId: applicationArea.id,
      })
      .subscribe(
        () => {
          this.getApplicationAreasForAlgorithm(this.algorithm.id);
          this.utilService.callSnackBar(
            'Successfully removed link to application area "' +
              applicationArea.name +
              '" from algorithm "' +
              this.algorithm.name +
              '".'
          );
        },
        (error) => {
          console.log(error);
          this.utilService.callSnackBar(
            'Error! Could not remove link to application area "' +
              applicationArea.name +
              '" from algorithm "' +
              this.algorithm.name +
              '".'
          );
        }
      );
  }

  addProblemType(problemType: ProblemTypeDto): void {
    this.algorithmService
      .linkAlgorithmAndProblemType({
        algorithmId: this.algorithm.id,
        body: problemType,
      })
      .subscribe(
        () => {
          this.getProblemTypesForAlgorithm(this.algorithm.id);
          this.utilService.callSnackBar(
            'Successfully linked problem type "' +
              problemType.name +
              '" to algorithm "' +
              this.algorithm.name +
              '"'
          );
        },
        (error) => {
          console.log(error);
          this.utilService.callSnackBar(
            'Error! Could not link problem type "' +
              problemType.name +
              '" to algorithm "' +
              this.algorithm.name +
              '".'
          );
        }
      );
  }

  removeProblemTypeFromAlgorithm(problemType: ProblemTypeDto): void {
    this.algorithmService
      .unlinkAlgorithmAndProblemType({
        algorithmId: this.algorithm.id,
        problemTypeId: problemType.id,
      })
      .subscribe(
        () => {
          this.getProblemTypesForAlgorithm(this.algorithm.id);
          this.utilService.callSnackBar(
            'Successfully removed link to problem type "' +
              problemType.name +
              '" from algorithm "' +
              this.algorithm.name +
              '".'
          );
        },
        (error) => {
          console.log(error);
          this.utilService.callSnackBar(
            'Error! Could not remove link to problem type "' +
              problemType.name +
              '" from algorithm "' +
              this.algorithm.name +
              '".'
          );
        }
      );
  }

  createBreadcrumbHeader(algorithm: AlgorithmDto): string {
    const header = algorithm.name;

    return algorithm.acronym ? header + ' (' + algorithm.acronym + ')' : header;
  }

  getRevision(revision: RevisionDto): void {
    this.algorithmService
      .getAlgorithmRevision({
        algorithmId: this.algorithm.id,
        revisionId: revision.id,
      })
      .subscribe(
        (algorithmRevision) => {
          this.frontendAlgorithm = algorithmRevision;
          let subheading = this.frontendAlgorithm.computationModel
            .toString()
            .toLowerCase();
          subheading = subheading[0].toUpperCase() + subheading.slice(1);
          this.links[0] = {
            heading: this.createBreadcrumbHeader(this.frontendAlgorithm),
            subHeading: subheading + ' Algorithm',
          };
          this.utilService.callSnackBar(
            'Algorithm revision ' +
              revision.id +
              ' has been loaded successfully.'
          );
        },
        (error) => {
          console.log(error);
          this.utilService.callSnackBar(
            'Error! Could not load Algorithm revision ' + revision.id
          );
        }
      );
  }

  fetchRevisions(): void {
    // TODO: check is obsolete if the planqk platform supports versioning
    if (this.config.rootUrl.includes('platform.planqk')) {
      this.revisionAvailable = false;
    } else {
      this.algorithmService
        .getAlgorithmRevisions({
          algorithmId: this.algorithm.id,
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
    this.algorithmService
      .getAlgorithmRevision({
        algorithmId: this.algorithm.id,
        revisionId: revision.id,
      })
      .subscribe(
        (algorithmRevision) => {
          this.comparePropertiesOfVersions(
            this.frontendAlgorithm,
            algorithmRevision
          );
          this.utilService.callSnackBar(
            'Algorithm revision ' +
              revision.id +
              ' has been fetched successfully for comparison.'
          );
        },
        (error) => {
          console.log(error);
          this.utilService.callSnackBar(
            'Error! Could not fetch Algorithm revision for comparison' +
              revision.id
          );
        }
      );
  }

  comparePropertiesOfVersions(
    currentVersion: AlgorithmDto,
    compareVersion: AlgorithmDto
  ): void {
    const dialogRef = this.utilService.createDialog(
      CompareVersionDialogComponent,
      {
        title: 'Compare Versions',
        currentVersion,
        compareVersion,
      },
      {
        width: '500px',
      }
    );
    dialogRef.afterClosed().subscribe((result) => {
      this.compareVersion = false;
    });
  }

  private getTagsForAlgorithm(algoId: string): void {
    this.algorithmService
      .getTagsOfAlgorithm({ algorithmId: algoId })
      .subscribe((next) => {
        if (next) {
          this.tags = next.map((t) => ({
            value: t.value,
            category: t.category,
          }));
        }
      });
  }
}
