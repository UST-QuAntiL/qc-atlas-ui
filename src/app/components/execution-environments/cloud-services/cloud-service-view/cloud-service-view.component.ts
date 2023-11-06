import { Component, OnInit } from '@angular/core';
import { CloudServiceDto } from 'api-atlas/models/cloud-service-dto';
import { ExecutionEnvironmentsService } from 'api-atlas/services/execution-environments.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BreadcrumbLink } from '../../../generics/navigation-breadcrumb/navigation-breadcrumb.component';
import { UpdateFieldEventService } from '../../../../services/update-field-event.service';
import { FieldUpdate } from '../../../../util/FieldUpdate';
import { ChangePageGuard } from '../../../../services/deactivation-guard';
import { UtilService } from '../../../../util/util.service';

@Component({
  selector: 'app-cloud-service-view',
  templateUrl: './cloud-service-view.component.html',
  styleUrls: ['./cloud-service-view.component.scss'],
})
export class CloudServiceViewComponent implements OnInit {
  cloudService: CloudServiceDto;
  frontendCloudService: CloudServiceDto;
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
    this.routeSub = this.route.params.subscribe(({ csId }) => {
      this.executionEnvironmentsService
        .getCloudService({ cloudServiceId: csId })
        .subscribe(
          (cloudService: CloudServiceDto) => {
            this.cloudService = cloudService;
            this.frontendCloudService = JSON.parse(
              JSON.stringify(cloudService)
            ) as CloudServiceDto;
            this.links[0] = {
              heading: this.cloudService.name,
              subHeading: '',
            };
          },
          () => {
            this.utilService.callSnackBar(
              'Error! Cloud services could not be retrieved.'
            );
          }
        );
    });

    this.fieldUpdateSubscription =
      this.updateFieldService.updateCloudServiceFieldChannel.subscribe(
        (fieldUpdate: FieldUpdate) => {
          this.updateCloudServiceField(fieldUpdate);
        }
      );
  }

  ngOnDestroy(): void {
    this.fieldUpdateSubscription.unsubscribe();
  }

  saveCloudService(
    updatedCloudService: CloudServiceDto,
    updateFrontendCloudService: boolean
  ): void {
    this.executionEnvironmentsService
      .updateCloudService({
        cloudServiceId: this.cloudService.id,
        body: updatedCloudService,
      })
      .subscribe(
        (cloudSvc) => {
          this.cloudService = cloudSvc;
          if (updateFrontendCloudService) {
            this.frontendCloudService = JSON.parse(
              JSON.stringify(cloudSvc)
            ) as CloudServiceDto;
          }
          this.utilService.callSnackBar(
            'Cloud service was successfully updated.'
          );
        },
        (error) => {
          console.log(error);
          this.utilService.callSnackBar(
            'Error! Could not update cloud service.'
          );
        }
      );
  }

  updateCloudServiceField(fieldUpdate: FieldUpdate): void {
    this.cloudService[fieldUpdate.field] = fieldUpdate.value;
    this.saveCloudService(this.cloudService, false);
  }
}
