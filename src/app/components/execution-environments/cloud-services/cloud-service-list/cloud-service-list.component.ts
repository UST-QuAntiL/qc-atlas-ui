import { Component, Input, OnInit } from '@angular/core';
import { EntityModelCloudServiceDto } from 'api-atlas/models/entity-model-cloud-service-dto';
import { ExecutionEnvironmentsService } from 'api-atlas/services/execution-environments.service';
import { Router } from '@angular/router';
import { CloudServiceDto } from 'api-atlas/models/cloud-service-dto';
import { UtilService } from '../../../../util/util.service';
import {
  DeleteParams,
  QueryParams,
} from '../../../generics/data-list/data-list.component';
import { CreateCloudServiceDialogComponent } from '../dialogs/create-cloud-service-dialog.component';
import { GenericDataService } from '../../../../util/generic-data.service';
import { ConfirmDialogComponent } from '../../../generics/dialogs/confirm-dialog.component';

@Component({
  selector: 'app-cloud-service-list',
  templateUrl: './cloud-service-list.component.html',
  styleUrls: ['./cloud-service-list.component.scss'],
})
export class CloudServiceListComponent implements OnInit {
  @Input() cloudServices: EntityModelCloudServiceDto[];

  tableColumns = ['Name', 'Provider', 'Description', 'CostModel', 'URL'];
  variableNames = ['name', 'provider', 'description', 'costModel', 'URL'];
  pagingInfo: any = {};
  paginatorConfig: any = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };
  externalLinkVariables = ['link'];

  constructor(
    private utilService: UtilService,
    private executionEnvironmentsService: ExecutionEnvironmentsService,
    private genericDataService: GenericDataService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  getCloudServices(params: QueryParams): void {
    this.executionEnvironmentsService
      .getCloudServices(params)
      .subscribe((data) => {
        this.prepareCloudServiceData(data);
      });
  }

  getCloudServicesHateoas(url: string): void {
    this.genericDataService.getData(url).subscribe((data) => {
      this.prepareCloudServiceData(data);
    });
  }

  prepareCloudServiceData(data): void {
    if (data._embedded) {
      this.cloudServices = data._embedded.cloudServices;
    } else {
      this.cloudServices = [];
    }
    this.pagingInfo.page = data.page;
    this.pagingInfo._links = data._links;
  }

  onCloudServiceClicked(cloudService: EntityModelCloudServiceDto): void {
    this.router.navigate([
      'execution-environments',
      'cloud-services',
      cloudService.id,
    ]);
  }

  onCreateCloudService(): void {
    this.utilService
      .createDialog(CreateCloudServiceDialogComponent, {
        title: 'Create a new cloud service',
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          const cloudServiceDto: CloudServiceDto = {
            name: dialogResult.name,
          };
          this.executionEnvironmentsService
            .createCloudService({ body: cloudServiceDto })
            .subscribe((cloudService: EntityModelCloudServiceDto) => {
              this.router.navigate([
                'execution-environments',
                'cloud-services',
                cloudService.id,
              ]);
              this.utilService.callSnackBar(
                'Successfully created cloud service "' + cloudService.name + '"'
              );
            });
        }
      });
  }

  onDeleteCloudServices(deleteParams: DeleteParams): void {
    this.utilService
      .createDialog(ConfirmDialogComponent, {
        title: 'Confirm Deletion',
        message:
          'Are you sure you want to delete the following cloud service(s): ',
        data: deleteParams.elements,
        variableName: 'title',
        yesButtonText: 'yes',
        noButtonText: 'no',
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          for (const cloudService of deleteParams.elements) {
            this.executionEnvironmentsService
              .deleteCloudService({ id: cloudService.id })
              .subscribe(() => {
                // Refresh Algorithms after delete
                this.getCloudServices(deleteParams.queryParams);
                this.utilService.callSnackBar(
                  'Successfully deleted cloud service(s)'
                );
              });
          }
        }
      });
  }
}
