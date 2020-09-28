import { Component, OnDestroy, OnInit } from '@angular/core';
import { EntityModelAlgorithmDto } from 'api-atlas/models/entity-model-algorithm-dto';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { EntityModelApplicationAreaDto } from 'api-atlas/models/entity-model-application-area-dto';
import { ApplicationAreasService } from 'api-atlas/services/application-areas.service';
import { EntityModelProblemTypeDto } from 'api-atlas/models/entity-model-problem-type-dto';
import { ProblemTypeService } from 'api-atlas/services/problem-type.service';
import { ProblemTypeDto } from 'api-atlas/models/problem-type-dto';
import { TagDto } from 'api-atlas/models/tag-dto';
import { AlgorithmDto } from 'api-atlas/models/algorithm-dto';
import { BreadcrumbLink } from '../../generics/navigation-breadcrumb/navigation-breadcrumb.component';
import { UtilService } from '../../../util/util.service';
import { ChangePageGuard } from '../../../services/deactivation-guard';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-algorithm-view',
  templateUrl: './algorithm-view.component.html',
  styleUrls: ['./algorithm-view.component.scss'],
})
export class AlgorithmViewComponent implements OnInit, OnDestroy {
  isNisqUsed = environment.nisqAnalyzer;

  algorithm: EntityModelAlgorithmDto;
  frontendAlgorithm: EntityModelAlgorithmDto;
  applicationAreas: EntityModelApplicationAreaDto[];
  problemTypes: EntityModelProblemTypeDto[];
  tags: TagDto[] = [];

  links: BreadcrumbLink[] = [{ heading: '', subHeading: '' }];

  private routeSub: Subscription;

  constructor(
    private algorithmService: AlgorithmService,
    private applicationAreasService: ApplicationAreasService,
    private problemTypeService: ProblemTypeService,
    private route: ActivatedRoute,
    private utilService: UtilService,
    public guard: ChangePageGuard
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(({ algoId }) => {
      this.algorithmService.getAlgorithm({ algorithmId: algoId }).subscribe(
        (algo: EntityModelAlgorithmDto) => {
          this.algorithm = algo;
          this.frontendAlgorithm = JSON.parse(
            JSON.stringify(algo)
          ) as EntityModelAlgorithmDto;
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
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }

  ngOnDestroy(): void {
    this.routeSub.unsubscribe();
  }

  saveAlgorithm(
    updatedAlgorithm: EntityModelAlgorithmDto,
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
            ) as EntityModelAlgorithmDto;
          }
          this.links[0] = {
            heading: this.createBreadcrumbHeader(this.algorithm),
            subHeading: this.algorithm.computationModel + ' Algorithm',
          };
          this.utilService.callSnackBar('Successfully updated algorithm');
        },
        (error) => {
          console.log(error);
        }
      );
  }

  getApplicationAreasForAlgorithm(algoId: string): void {
    this.algorithmService
      .getApplicationAreasOfAlgorithm({ algorithmId: algoId })
      .subscribe(
        (areas) => {
          if (areas._embedded) {
            this.applicationAreas = areas._embedded.applicationAreas;
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
          if (problems._embedded) {
            this.problemTypes = problems._embedded.problemTypes;
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
      .subscribe();
  }

  removeTag(tag: TagDto): void {
    this.algorithmService
      .removeTagFromAlgorithm({
        algorithmId: this.algorithm.id,
        body: tag,
      })
      .subscribe();
  }

  updateAlgorithmField(event: { field; value }): void {
    this.algorithm[event.field] = event.value;
    this.saveAlgorithm(this.algorithm, false);
  }

  addApplicationArea(applicationArea: EntityModelApplicationAreaDto): void {
    this.algorithmService
      .linkAlgorithmAndApplicationArea({
        algorithmId: this.algorithm.id,
        body: applicationArea,
      })
      .subscribe((areas) => {
        this.utilService.callSnackBar(
          'Successfully linked application area "' +
            applicationArea.name +
            '" to algorithm "' +
            this.algorithm.name +
            '"'
        );
        this.getApplicationAreasForAlgorithm(this.algorithm.id);
      });
  }

  removeApplicationArea(applicationArea: EntityModelApplicationAreaDto): void {
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
              '"'
          );
        },
        (error) => {
          console.log(error);
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
        (error) => console.log(error)
      );
    // this.problemTypeService.createProblemType({ body: problemType }).subscribe(
    //   (type) => {
    //     this.algorithmService
    //       .linkAlgorithmAndProblemType({
    //         algorithmId: this.algorithm.id,
    //         body: type,
    //       })
    //       .subscribe(
    //         () => {
    //           this.getProblemTypesForAlgorithm(this.algorithm.id);
    //           this.utilService.callSnackBar(
    //             'Successfully linked application area "' +
    //               type.name +
    //               '" to algorithm "' +
    //               this.algorithm.name +
    //               '"'
    //           );
    //         },
    //         (error) => console.log(error)
    //       );
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }

  removeProblemTypeFromAlgorithm(problemType: EntityModelProblemTypeDto): void {
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
              '"'
          );
        },
        (error) => {
          console.log(error);
        }
      );
  }

  createBreadcrumbHeader(algorithm: AlgorithmDto): string {
    const header = this.algorithm.name;

    return this.algorithm.acronym
      ? header + ' (' + this.algorithm.acronym + ')'
      : header;
  }

  private getTagsForAlgorithm(algoId: string): void {
    this.algorithmService
      .getTagsOfAlgorithm({ algorithmId: algoId })
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
