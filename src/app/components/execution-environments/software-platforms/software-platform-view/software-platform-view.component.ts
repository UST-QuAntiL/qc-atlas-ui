import { Component, OnInit } from '@angular/core';
import { EntityModelSoftwarePlatformDto } from 'api/models/entity-model-software-platform-dto';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ExecutionEnvironmentsService } from 'api/services/execution-environments.service';
import { BreadcrumbLink } from '../../../generics/navigation-breadcrumb/navigation-breadcrumb.component';
import { UpdateFieldEventService } from '../../../../services/update-field-event.service';
import { FieldUpdate } from '../../../../util/FieldUpdate';

@Component({
  selector: 'app-software-platform-view',
  templateUrl: './software-platform-view.component.html',
  styleUrls: ['./software-platform-view.component.scss'],
})
export class SoftwarePlatformViewComponent implements OnInit {
  softwarePlatform: EntityModelSoftwarePlatformDto;

  links: BreadcrumbLink[] = [{ heading: '', subHeading: '' }];

  private routeSub: Subscription;
  private fieldUpdateSubscription: Subscription;

  constructor(
    private executionEnvironmentsService: ExecutionEnvironmentsService,
    private updateFieldService: UpdateFieldEventService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(({ spId }) => {
      this.executionEnvironmentsService
        .getSoftwarePlatform({ id: spId })
        .subscribe(
          (softwarePlatform: EntityModelSoftwarePlatformDto) => {
            this.softwarePlatform = softwarePlatform;
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

  updateSoftwarePlatformField(fieldUpdate: FieldUpdate): void {
    this.softwarePlatform[fieldUpdate.field] = fieldUpdate.value;
    this.executionEnvironmentsService
      .updateSoftwarePlatform({
        id: this.softwarePlatform.id,
        body: this.softwarePlatform,
      })
      .subscribe(
        (sp) => {
          this.softwarePlatform = sp;
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
