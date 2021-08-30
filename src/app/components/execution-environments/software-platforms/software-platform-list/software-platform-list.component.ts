import { Component, OnInit } from '@angular/core';
import { SoftwarePlatformDto } from 'api-atlas/models/software-platform-dto';
import { ExecutionEnvironmentsService } from 'api-atlas/services/execution-environments.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { SdksService } from 'api-nisq/services/sdks.service';
import { SdkDto } from 'api-nisq/models/sdk-dto';
import {
  SelectParams,
  QueryParams,
  UrlData,
} from '../../../generics/data-list/data-list.component';
import { UtilService } from '../../../../util/util.service';
import { CreateSoftwarePlatformDialogComponent } from '../dialogs/create-software-platform-dialog.component';
import { ConfirmDialogComponent } from '../../../generics/dialogs/confirm-dialog.component';
import { PaginatorConfig } from '../../../../util/paginatorConfig';
import { PagingInfo } from '../../../../util/PagingInfo';

@Component({
  selector: 'app-software-platform-list',
  templateUrl: './software-platform-list.component.html',
  styleUrls: ['./software-platform-list.component.scss'],
})
export class SoftwarePlatformListComponent implements OnInit {
  softwarePlatforms: SoftwarePlatformDto[] = [];

  tableColumns = ['Name', 'Version', 'Licence', 'Link'];
  variableNames = ['name', 'version', 'licence', 'link'];
  pagingInfo: PagingInfo<SoftwarePlatformDto> = {};
  paginatorConfig: PaginatorConfig = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };
  externalLinkVariables = ['link'];

  constructor(
    private utilService: UtilService,
    private executionEnvironmentsService: ExecutionEnvironmentsService,
    private sdksService: SdksService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  getSoftwarePlatforms(params: QueryParams): void {
    this.executionEnvironmentsService.getSoftwarePlatforms(params).subscribe(
      (data) => {
        this.prepareSoftwarePlatformData(data);
      },
      () => {
        this.utilService.callSnackBar(
          'Error! Software platforms could not be retrieved.'
        );
      }
    );
  }

  prepareSoftwarePlatformData(data): void {
    if (data.content) {
      this.softwarePlatforms = data.content;
    } else {
      this.softwarePlatforms = [];
    }
    this.pagingInfo.totalPages = data.totalPages;
    this.pagingInfo.number = data.number;
    this.pagingInfo.sort = data.sort;
  }

  onSoftwarePlatformClicked(softwarePlatform: SoftwarePlatformDto): void {
    this.router.navigate([
      'execution-environments',
      'software-platforms',
      softwarePlatform.id,
    ]);
  }

  onUrlClicked(urlData: UrlData): void {
    // No check needed since software platforms have only one url-field called 'link'
    window.open(urlData.element['link'], '_blank');
  }

  onCreateSoftwarePlatform(): void {
    this.utilService
      .createDialog(CreateSoftwarePlatformDialogComponent, {
        title: 'Create a new software platform',
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          const sdkDto: SdkDto = {
            id: null,
            name: dialogResult.name,
          };
          this.sdksService.createSdk({ body: sdkDto }).subscribe();
          const softwarePlatformDto: SoftwarePlatformDto = {
            id: null,
            name: dialogResult.name,
          };
          this.executionEnvironmentsService
            .createSoftwarePlatform({ body: softwarePlatformDto })
            .subscribe(
              (softwarePlatform: SoftwarePlatformDto) => {
                this.router.navigate([
                  'execution-environments',
                  'software-platforms',
                  softwarePlatform.id,
                ]);
                this.utilService.callSnackBar(
                  'Successfully created software platform "' +
                    softwarePlatform.name +
                    '".'
                );
              },
              () => {
                this.utilService.callSnackBar(
                  'Error! Software platform could not be created.'
                );
              }
            );
        }
      });
  }

  onDeleteSoftwarePlatforms(deleteParams: SelectParams): void {
    this.utilService
      .createDialog(ConfirmDialogComponent, {
        title: 'Confirm Deletion',
        message:
          'Are you sure you want to delete the following software platform(s): ',
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
          for (const softwarePlatform of deleteParams.elements) {
            deletionTasks.push(
              this.executionEnvironmentsService
                .deleteSoftwarePlatform({
                  softwarePlatformId: softwarePlatform.id,
                })
                .toPromise()
                .then(() => {
                  successfulDeletions++;
                  snackbarMessages.push(
                    'Successfully deleted software platform "' +
                      softwarePlatform.name +
                      '".'
                  );
                })
                .catch(() => {
                  snackbarMessages.push(
                    'Could not delete software platform "' +
                      softwarePlatform.name +
                      '".'
                  );
                })
            );
          }
          forkJoin(deletionTasks).subscribe(() => {
            if (
              this.utilService.isLastPageEmptyAfterDeletion(
                successfulDeletions,
                this.softwarePlatforms.length,
                this.pagingInfo
              )
            ) {
              deleteParams.queryParams.page--;
            }
            this.getSoftwarePlatforms(deleteParams.queryParams);
            this.utilService.callSnackBar(
              'Successfully deleted ' +
                successfulDeletions +
                '/' +
                dialogResult.data.length +
                ' software platforms.'
            );
            this.utilService.callSnackBarSequence(snackbarMessages);
          });
        }
      });
  }
}
