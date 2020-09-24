import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApplicationAreasService } from 'api-atlas/services/application-areas.service';
import { EntityModelApplicationAreaDto } from 'api-atlas/models/entity-model-application-area-dto';
import { GenericDataService } from '../../../util/generic-data.service';
import { AddApplicationAreaDialogComponent } from '../dialogs/add-application-area-dialog.component';

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
    private router: Router
  ) {}

  ngOnInit(): void {}

  getApplicationAreas(params: any): void {
    this.applicationAreasService
      .getApplicationAreas(params)
      .subscribe((data) => {
        this.prepareApplicationAreaData(JSON.parse(JSON.stringify(data)));
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

  onElementClicked(applicationArea: any): void {
    console.log(applicationArea);
    this.router.navigate(['application-areas', applicationArea.id]);
  }

  onAddElement(): void {
    const params: any = {};
    const dialogRef = this.dialog.open(AddApplicationAreaDialogComponent, {
      width: '400px',
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
            this.router.navigate(['application-areas', data.id]);
          });
      }
    });
  }

  onDeleteElements(event): void {
    // Iterate all selected algorithms and delete them
    for (const applicationArea of event.elements) {
      this.applicationAreasService
        .deleteApplicationArea(this.generateDeleteParams(applicationArea.id))
        .subscribe(() => {
          // Refresh application areas after delete
          this.getApplicationAreas(event.queryParams);
        });
    }
  }

  generateDeleteParams(applicationAreaId: string): any {
    const params: any = {};
    params.id = applicationAreaId;
    return params;
  }
}
