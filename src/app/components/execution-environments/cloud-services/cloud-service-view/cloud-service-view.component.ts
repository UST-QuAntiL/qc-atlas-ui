import { Component, OnInit } from '@angular/core';
import { EntityModelCloudServiceDto } from 'api/models/entity-model-cloud-service-dto';
import { ExecutionEnvironmentsService } from 'api/services/execution-environments.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BreadcrumbLink } from '../../../generics/navigation-breadcrumb/navigation-breadcrumb.component';
import { UpdateFieldEventService } from '../../../../services/update-field-event.service';
import { FieldUpdate } from '../../../../util/FieldUpdate';

@Component({
  selector: 'app-cloud-service-view',
  templateUrl: './cloud-service-view.component.html',
  styleUrls: ['./cloud-service-view.component.scss'],
})
export class CloudServiceViewComponent implements OnInit {
  cloudService: EntityModelCloudServiceDto;

  links: BreadcrumbLink[] = [{ heading: '', subHeading: '' }];

  private routeSub: Subscription;
  private fieldUpdateSubscription: Subscription;

  constructor(
    private executionEnvironmentsService: ExecutionEnvironmentsService,
    private updateFieldService: UpdateFieldEventService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(({ csId }) => {
      this.executionEnvironmentsService.getCloudService({ id: csId }).subscribe(
        (cloudService: EntityModelCloudServiceDto) => {
          this.cloudService = cloudService;
          this.links[0] = {
            heading: this.cloudService.name,
            subHeading: '',
          };
        },
        (error) => {
          console.log(error);
        }
      );
    });

    this.fieldUpdateSubscription = this.updateFieldService.updateCloudServiceFieldChannel.subscribe(
      (fieldUpdate: FieldUpdate) => {
        this.updateCloudServiceField(fieldUpdate);
      }
    );
  }

  updateCloudServiceField(fieldUpdate: FieldUpdate): void {
    this.cloudService[fieldUpdate.field] = fieldUpdate.value;
    this.executionEnvironmentsService
      .updateCloudService({ id: this.cloudService.id, body: this.cloudService })
      .subscribe(
        (cloudSvc) => {
          this.cloudService = cloudSvc;
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
