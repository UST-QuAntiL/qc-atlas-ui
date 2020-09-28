import { Component, OnInit } from '@angular/core';
import { EntityModelSoftwarePlatformDto } from 'api-atlas/models/entity-model-software-platform-dto';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ExecutionEnvironmentsService } from 'api-atlas/services/execution-environments.service';
import { BreadcrumbLink } from '../../../generics/navigation-breadcrumb/navigation-breadcrumb.component';
import { UpdateFieldEventService } from '../../../../services/update-field-event.service';
import { FieldUpdate } from '../../../../util/FieldUpdate';
import { ChangePageGuard } from '../../../../services/deactivation-guard';

@Component({
  selector: 'app-software-platform-view',
  templateUrl: './software-platform-view.component.html',
  styleUrls: ['./software-platform-view.component.scss'],
})
export class SoftwarePlatformViewComponent implements OnInit {
  softwarePlatform: EntityModelSoftwarePlatformDto;
  frontendSoftwarePlatform: EntityModelSoftwarePlatformDto;

  links: BreadcrumbLink[] = [{ heading: '', subHeading: '' }];

  private routeSub: Subscription;
  private fieldUpdateSubscription: Subscription;

  constructor(
    private executionEnvironmentsService: ExecutionEnvironmentsService,
    private updateFieldService: UpdateFieldEventService,
    private route: ActivatedRoute,
    public guard: ChangePageGuard
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(({ spId }) => {
      this.executionEnvironmentsService
        .getSoftwarePlatform({ softwarePlatformId: spId })
        .subscribe(
          (softwarePlatform: EntityModelSoftwarePlatformDto) => {
            this.softwarePlatform = softwarePlatform;
            this.frontendSoftwarePlatform = JSON.parse(
              JSON.stringify(softwarePlatform)
            ) as EntityModelSoftwarePlatformDto;
            this.links[0] = {
              heading: this.softwarePlatform.name,
              subHeading: '',
            };
          },
          (error) => {
            console.log(error);
          }
        );
    });

    this.fieldUpdateSubscription = this.updateFieldService.updateSoftwarePlatformFieldChannel.subscribe(
      (fieldUpdate: FieldUpdate) => {
        this.updateSoftwarePlatformField(fieldUpdate);
      }
    );
  }

  ngOnDestroy(): void {
    this.fieldUpdateSubscription.unsubscribe();
  }

  savePlatform(
    updatedPlatform: EntityModelSoftwarePlatformDto,
    updateFrontendPlatform: boolean
  ): void {
    this.executionEnvironmentsService
      .updateSoftwarePlatform({
        softwarePlatformId: this.softwarePlatform.id,
        body: this.softwarePlatform,
      })
      .subscribe(
        (sp) => {
          this.softwarePlatform = sp;
          if (updateFrontendPlatform) {
            this.frontendSoftwarePlatform = JSON.parse(
              JSON.stringify(sp)
            ) as EntityModelSoftwarePlatformDto;
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }

  updateSoftwarePlatformField(fieldUpdate: FieldUpdate): void {
    this.softwarePlatform[fieldUpdate.field] = fieldUpdate.value;
    this.savePlatform(this.softwarePlatform, false);
  }
}
