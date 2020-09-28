import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApplicationAreasService } from 'api-atlas/services/application-areas.service';
import { EntityModelApplicationAreaDto } from 'api-atlas/models/entity-model-application-area-dto';
import { forkJoin } from 'rxjs';
import { GenericDataService } from '../../../util/generic-data.service';
import { AddApplicationAreaDialogComponent } from '../dialogs/add-application-area/add-application-area-dialog.component';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../generics/dialogs/confirm-dialog.component';
import { UtilService } from '../../../util/util.service';
import { EditApplicationAreaDialogComponent } from '../dialogs/edit-application-area/edit-application-area-dialog.component';

@Component({
  selector: 'app-application-areas-list',
  templateUrl: './application-areas-list.component.html',
  styleUrls: ['./application-areas-list.component.scss'],
})
export class ApplicationAreasListComponent implements OnInit {
  applicationAreas: any[] = [];
  tableColumns = ['Name'];
  variableNames = ['name'];
  pagingInfo: any = {};
  paginatorConfig: any = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };

  constructor(
    private applicationAreasService: ApplicationAreasService,
    private genericDataService: GenericDataService,
    private dialog: MatDialog,
    private router: Router,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {}

  getApplicationAreas(params: any): void {
    this.applicationAreasService
      .getApplicationAreas(params)
      .subscribe((data) => {
        this.prepareApplicationAreaData(data);
      });
  }

  getApplicationAreasHateoas(url: string): void {
    this.genericDataService.getData(url).subscribe((data) => {
      this.prepareApplicationAreaData(data);
    });
  }

  prepareApplicationAreaData(data): void {
    // Read all incoming data
    if (data._embedded) {
      this.applicationAreas = data._embedded.applicationAreas;
    } else {
      this.applicationAreas = [];
    }
    this.pagingInfo.page = data.page;
    this.pagingInfo._links = data._links;
  }

  onAddElement(): void {
    const params: any = {};
    const dialogRef = this.dialog.open(AddApplicationAreaDialogComponent, {
      data: { title: 'Add new application area' },
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        const applicationAreaDtoDto: EntityModelApplicationAreaDto = {
          id: dialogResult.id,
          name: dialogResult.name,
        };

        params.body = applicationAreaDtoDto;
        this.applicationAreasService
          .createApplicationArea(params)
          .subscribe((data) => {
            this.getApplicationAreas({});
            this.utilService.callSnackBar(
              'Successfully added application area'
            );
          });
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
          for (const applicationArea of event.elements) {
            deletionTasks.push(
              this.applicationAreasService
                .deleteApplicationArea({
                  applicationAreaId: applicationArea.id,
                })
                .toPromise()
            );
          }
          forkJoin(deletionTasks).subscribe(
            () => {
              this.getApplicationAreas(event.queryParams);
              this.utilService.callSnackBar(
                'Successfully deleted application area(s)'
              );
            },
            () => {
              this.getApplicationAreas(event.queryParams);
              this.utilService.callSnackBar(
                'Delete rejected! Application area is used in other places.'
              );
            }
          );
        }
      });
  }

  onEditElement(event: any): void {
    const dialogRef = this.dialog.open(EditApplicationAreaDialogComponent, {
      data: {
        title: 'Edit application area',
        name: event.name,
      },
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        if (dialogResult.newName !== event.name) {
          const newApplicationAreaDto: EntityModelApplicationAreaDto = {
            id: event.id,
            name: dialogResult.newName,
          };
          const params: any = {
            applicationAreaId: newApplicationAreaDto.id,
            body: newApplicationAreaDto,
          };
          this.applicationAreasService
            .updateApplicationArea(params)
            .subscribe((data) => {
              this.getApplicationAreas(event.queryParams);
              this.utilService.callSnackBar(
                'Successfully edited application area'
              );
            });
        }
      }
    });
  }
}
