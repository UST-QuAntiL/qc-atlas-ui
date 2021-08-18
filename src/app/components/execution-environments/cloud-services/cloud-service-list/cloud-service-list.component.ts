import { Component, Input, OnInit } from '@angular/core';
import { ExecutionEnvironmentsService } from 'api-atlas/services/execution-environments.service';
import { Router } from '@angular/router';
import { CloudServiceDto } from 'api-atlas/models/cloud-service-dto';
import { PageCloudServiceDto } from 'api-atlas/models/page-cloud-service-dto';
import { forkJoin } from 'rxjs';
import { UtilService } from '../../../../util/util.service';
import {
  SelectParams,
  QueryParams,
  UrlData,
} from '../../../generics/data-list/data-list.component';
import { CreateCloudServiceDialogComponent } from '../dialogs/create-cloud-service-dialog.component';
import { ConfirmDialogComponent } from '../../../generics/dialogs/confirm-dialog.component';
import { PaginatorConfig } from '../../../../util/paginatorConfig';
import { PagingInfo } from '../../../../util/PagingInfo';

@Component({
  selector: 'app-cloud-service-list',
  templateUrl: './cloud-service-list.component.html',
  styleUrls: ['./cloud-service-list.component.scss'],
})
export class CloudServiceListComponent implements OnInit {
  @Input() cloudServices: CloudServiceDto[];

  tableColumns = ['Name', 'Provider', 'Description', 'CostModel', 'URL'];
  variableNames = ['name', 'provider', 'description', 'costModel', 'url'];
  pagingInfo: PagingInfo = {};
  paginatorConfig: PaginatorConfig = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };
  externalLinkVariables = ['url'];

  constructor(
    private utilService: UtilService,
    private executionEnvironmentsService: ExecutionEnvironmentsService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  getCloudServices(params: QueryParams): void {
    this.executionEnvironmentsService.getCloudServices(params).subscribe(
      (data) => {
        this.prepareCloudServiceData(data);
      },
      () => {
        this.utilService.callSnackBar(
          'Error! Cloud services could not be retrieved.'
        );
      }
    );
  }

  prepareCloudServiceData(data): void {
    if (data.content) {
      this.cloudServices = data.content;
    } else {
      this.cloudServices = [];
    }
    this.pagingInfo.totalPages = data.totalPages;
    this.pagingInfo.number = data.number;
    this.pagingInfo.sort = data.sort;
  }

  onCloudServiceClicked(cloudService: CloudServiceDto): void {
    this.router.navigate([
      'execution-environments',
      'cloud-services',
      cloudService.id,
    ]);
  }

  onUrlClicked(urlData: UrlData): void {
    // No check needed since publications have only one url-field called 'url'
    window.open(urlData.element['url'], '_blank');
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
            id: null,
            name: dialogResult.name,
          };
          this.executionEnvironmentsService
            .createCloudService({ body: cloudServiceDto })
            .subscribe(
              (cloudService: CloudServiceDto) => {
                this.router.navigate([
                  'execution-environments',
                  'cloud-services',
                  cloudService.id,
                ]);
                this.utilService.callSnackBar(
                  'Cloud service was successfully created.'
                );
              },
              () => {
                this.utilService.callSnackBar(
                  'Error! Could not create cloud service.'
                );
              }
            );
        }
      });
  }

  onDeleteCloudServices(deleteParams: SelectParams): void {
    this.utilService
      .createDialog(ConfirmDialogComponent, {
        title: 'Confirm Deletion',
        message:
          'Are you sure you want to delete the following cloud service(s): ',
        data: deleteParams.elements,
        variableName: 'name',
        yesButtonText: 'yes',
        noButtonText: 'no',
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          const deletionTasks = [];
          const snackbarMessages = [];
          let successfulDeletions = 0;
          for (const cloudService of deleteParams.elements) {
            deletionTasks.push(
              this.executionEnvironmentsService
                .deleteCloudService({ cloudServiceId: cloudService.id })
                .toPromise()
                .then(
                  () => {
                    successfulDeletions++;
                    snackbarMessages.push(
                      'Successfully deleted cloud service "' +
                        cloudService.name +
                        '".'
                    );
                  },
                  () => {
                    snackbarMessages.push(
                      'Error! Could not delete cloud service "' +
                        cloudService.name +
                        '".'
                    );
                  }
                )
            );
          }
          forkJoin(deletionTasks).subscribe(() => {
            if (
              this.utilService.isLastPageEmptyAfterDeletion(
                successfulDeletions,
                this.cloudServices.length,
                this.pagingInfo
              )
            ) {
              deleteParams.queryParams.page--;
            }
            this.getCloudServices(deleteParams.queryParams);
            snackbarMessages.push(
              successfulDeletions,
              deleteParams.elements.length,
              'cloud services'
            );
            this.utilService.callSnackBarSequence(snackbarMessages);
          });
        }
      });
  }
}
