import { Component, OnInit } from '@angular/core';
import { ComputeResourceDto } from 'api-atlas/models/compute-resource-dto';
import { ExecutionEnvironmentsService } from 'api-atlas/services/execution-environments.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BreadcrumbLink } from '../../../generics/navigation-breadcrumb/navigation-breadcrumb.component';
import { FieldUpdate } from '../../../../util/FieldUpdate';
import { UpdateFieldEventService } from '../../../../services/update-field-event.service';
import { ChangePageGuard } from '../../../../services/deactivation-guard';
import { UtilService } from '../../../../util/util.service';
import { UiFeatures } from '../../../../directives/qc-atlas-ui-repository-configuration.service';

@Component({
  selector: 'app-compute-resource-view',
  templateUrl: './compute-resource-view.component.html',
  styleUrls: ['./compute-resource-view.component.scss'],
})
export class ComputeResourceViewComponent implements OnInit {
  readonly UiFeatures = UiFeatures;
  computeResource: ComputeResourceDto;
  frontendComputeResource: ComputeResourceDto;

  links: BreadcrumbLink[] = [{ heading: '', subHeading: '' }];

  private routeSub: Subscription;
  private fieldUpdateSubscription: Subscription;

  constructor(
    private executionEnvironmentsService: ExecutionEnvironmentsService,
    private updateFieldService: UpdateFieldEventService,
    private route: ActivatedRoute,
    private utilService: UtilService,
    public guard: ChangePageGuard
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(({ crId }) => {
      this.executionEnvironmentsService
        .getComputeResource({ computeResourceId: crId })
        .subscribe(
          (computeResource: ComputeResourceDto) => {
            this.computeResource = computeResource;
            this.frontendComputeResource = JSON.parse(
              JSON.stringify(computeResource)
            ) as ComputeResourceDto;
            this.links[0] = {
              heading: this.computeResource.name,
              subHeading: '',
            };
          },
          (error) => {
            console.log(error);
          }
        );
    });

    this.fieldUpdateSubscription = this.updateFieldService.updateComputeResourceFieldChannel.subscribe(
      (fieldUpdate: FieldUpdate) => {
        this.updateComputeResourceField(fieldUpdate);
      }
    );
  }

  ngOnDestroy(): void {
    this.fieldUpdateSubscription.unsubscribe();
  }

  saveComputeResource(
    updatedComputeResource: ComputeResourceDto,
    updateFrontendComputeResource: boolean
  ): void {
    this.executionEnvironmentsService
      .updateComputeResource({
        computeResourceId: this.computeResource.id,
        body: updatedComputeResource,
      })
      .subscribe(
        (computeRes) => {
          this.computeResource = computeRes;
          if (updateFrontendComputeResource) {
            this.frontendComputeResource = JSON.parse(
              JSON.stringify(computeRes)
            ) as ComputeResourceDto;
          }
          this.utilService.callSnackBar(
            'Successfully updated compute resource.'
          );
        },
        (error) => {
          console.log(error);
          this.utilService.callSnackBar(
            'Error! Could not update compute resource.'
          );
        }
      );
  }

  updateComputeResourceField(fieldUpdate: FieldUpdate): void {
    this.computeResource[fieldUpdate.field] = fieldUpdate.value;
    this.saveComputeResource(this.computeResource, false);
  }
}
