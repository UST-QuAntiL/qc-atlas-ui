import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationAreasService } from 'api-atlas/services/application-areas.service';
import { ApplicationAreaDto } from 'api-atlas/models/application-area-dto';
import { forkJoin } from 'rxjs';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../generics/dialogs/confirm-dialog.component';
import { UtilService } from '../../../util/util.service';
import { AddOrEditApplicationAreaDialogComponent } from '../dialogs/add-or-edit-application-area/add-or-edit-application-area-dialog.component';
import { PaginatorConfig } from '../../../util/paginatorConfig';
import { QueryParams } from '../../generics/data-list/data-list.component';
import { PagingInfo } from '../../../util/PagingInfo';

@Component({
  selector: 'app-application-areas-list',
  templateUrl: './application-areas-list.component.html',
  styleUrls: ['./application-areas-list.component.scss'],
})
export class ApplicationAreasListComponent implements OnInit {
  applicationAreas: ApplicationAreaDto[] = [];
  tableColumns = ['Name'];
  variableNames = ['name'];
  pagingInfo: PagingInfo<ApplicationAreaDto> = {};
  paginatorConfig: PaginatorConfig = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };

  constructor(
    private applicationAreasService: ApplicationAreasService,
    private router: Router,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {}

  getApplicationAreas(params: QueryParams): void {
    this.applicationAreasService.getApplicationAreas(params).subscribe(
      (data) => {
        this.prepareApplicationAreaData(data);
      },
      () => {
        this.utilService.callSnackBar(
          'Error! Application areas could not be retrieved.'
        );
      }
    );
  }

  prepareApplicationAreaData(data): void {
    // Read all incoming data
    if (data.content) {
      this.applicationAreas = data.content;
    } else {
      this.applicationAreas = [];
    }
    this.pagingInfo.totalPages = data.totalPages;
    this.pagingInfo.totalElements = data.totalElements;
    this.pagingInfo.number = data.number;
    this.pagingInfo.size = data.size;
    this.pagingInfo.sort = data.sort;
  }

  onAddElement(): void {
    const dialogRef = this.utilService.createDialog(
      AddOrEditApplicationAreaDialogComponent,
      {
        title: 'Create application area',
      }
    );

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        const applicationAreaDto: ApplicationAreaDto = {
          id: dialogResult.id,
          name: dialogResult.name,
        };

        this.applicationAreasService
          .createApplicationArea({ body: applicationAreaDto })
          .subscribe(
            () => {
              const correctPage = this.utilService.getLastPageAfterCreation(
                this.pagingInfo,
                1
              );
              this.getApplicationAreas({
                size: this.pagingInfo.size,
                page: correctPage,
                sort: this.pagingInfo.sort,
              });
              this.utilService.callSnackBar(
                'Application area was successfully added.'
              );
            },
            () => {
              this.utilService.callSnackBar(
                'Error! Could not add application area.'
              );
            }
          );
      }
    });
  }

  onDeleteElements(event): void {
    const dialogData: ConfirmDialogData = {
      title: 'Confirm Deletion',
      message:
        'Are you sure you want to delete the following application area(s):',
      data: event.elements,
      variableName: 'name',
      yesButtonText: 'yes',
      noButtonText: 'no',
    };
    this.utilService
      .createDialog(ConfirmDialogComponent, dialogData)
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          const deletionTasks = [];
          const snackbarMessages = [];
          let successfulDeletions = 0;
          for (const applicationArea of event.elements) {
            deletionTasks.push(
              this.applicationAreasService
                .deleteApplicationArea({
                  applicationAreaId: applicationArea.id,
                })
                .toPromise()
                .then(() => {
                  successfulDeletions++;
                  snackbarMessages.push(
                    'Successfully deleted application area "' +
                      applicationArea.name +
                      '".'
                  );
                })
                .catch((errorResponse) =>
                  snackbarMessages.push(JSON.parse(errorResponse.error).message)
                )
            );
          }
          forkJoin(deletionTasks).subscribe(() => {
            if (
              this.utilService.isLastPageEmptyAfterDeletion(
                successfulDeletions,
                this.applicationAreas.length,
                this.pagingInfo
              )
            ) {
              event.queryParams.page--;
            }
            this.getApplicationAreas(event.queryParams);
            snackbarMessages.push(
              this.utilService.generateFinishingSnackbarMessage(
                successfulDeletions,
                dialogResult.data.length,
                'application areas'
              )
            );
            this.utilService.callSnackBarSequence(snackbarMessages);
          });
        }
      });
  }

  onEditElement(event: ApplicationAreaDto): void {
    const dialogRef = this.utilService.createDialog(
      AddOrEditApplicationAreaDialogComponent,
      {
        title: 'Edit application area',
        name: event.name,
      }
    );

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        const newApplicationAreaDto: ApplicationAreaDto = {
          id: event.id,
          name: dialogResult.name,
        };
        this.applicationAreasService
          .updateApplicationArea({
            applicationAreaId: newApplicationAreaDto.id,
            body: newApplicationAreaDto,
          })
          .subscribe(
            () => {
              this.getApplicationAreas({
                size: this.pagingInfo.size,
                page: this.pagingInfo.number,
                sort: this.pagingInfo.sort,
              });
              this.utilService.callSnackBar(
                'Application area was successfully edited.'
              );
            },
            () => {
              this.utilService.callSnackBar(
                'Error! Could not update application area.'
              );
            }
          );
      }
    });
  }
}
