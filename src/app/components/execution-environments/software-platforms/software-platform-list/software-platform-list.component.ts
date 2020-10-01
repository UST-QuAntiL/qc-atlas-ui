import { Component, OnInit } from '@angular/core';
import { EntityModelSoftwarePlatformDto } from 'api-atlas/models/entity-model-software-platform-dto';
import { SoftwarePlatformDto } from 'api-atlas/models/software-platform-dto';
import { ExecutionEnvironmentsService } from 'api-atlas/services/execution-environments.service';
import { Router } from '@angular/router';
import {
  SelectParams,
  QueryParams,
  UrlData,
} from '../../../generics/data-list/data-list.component';
import { UtilService } from '../../../../util/util.service';
import { CreateSoftwarePlatformDialogComponent } from '../dialogs/create-software-platform-dialog.component';
import { GenericDataService } from '../../../../util/generic-data.service';
import { ConfirmDialogComponent } from '../../../generics/dialogs/confirm-dialog.component';

@Component({
  selector: 'app-software-platform-list',
  templateUrl: './software-platform-list.component.html',
  styleUrls: ['./software-platform-list.component.scss'],
})
export class SoftwarePlatformListComponent implements OnInit {
  softwarePlatforms: EntityModelSoftwarePlatformDto[] = [];

  tableColumns = ['Name', 'Version', 'Licence', 'Link'];
  variableNames = ['name', 'version', 'licence', 'link'];
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

  getSoftwarePlatforms(params: QueryParams): void {
    this.executionEnvironmentsService
      .getSoftwarePlatforms(params)
      .subscribe((data) => {
        this.prepareSoftwarePlatformData(data);
      });
  }

  getSoftwarePlatformsHateoas(url: string): void {
    this.genericDataService.getData(url).subscribe((data) => {
      this.prepareSoftwarePlatformData(data);
    });
  }

  prepareSoftwarePlatformData(data): void {
    if (data._embedded) {
      this.softwarePlatforms = data._embedded.softwarePlatforms;
    } else {
      this.softwarePlatforms = [];
    }
    this.pagingInfo.page = data.page;
    this.pagingInfo._links = data._links;
  }

  onSoftwarePlatformClicked(
    softwarePlatform: EntityModelSoftwarePlatformDto
  ): void {
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
          const softwarePlatformDto: SoftwarePlatformDto = {
            id: null,
            name: dialogResult.name,
          };
          this.executionEnvironmentsService
            .createSoftwarePlatform({ body: softwarePlatformDto })
            .subscribe((softwarePlatform: EntityModelSoftwarePlatformDto) => {
              this.router.navigate([
                'execution-environments',
                'software-platforms',
                softwarePlatform.id,
              ]);
              this.utilService.callSnackBar(
                'Successfully created software platform "' +
                  softwarePlatform.name +
                  '"'
              );
            });
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
        variableName: 'title',
        yesButtonText: 'yes',
        noButtonText: 'no',
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          const promises: Array<Promise<void>> = [];
          for (const softwarePlatform of deleteParams.elements) {
            promises.push(
              this.executionEnvironmentsService
                .deleteSoftwarePlatform({
                  softwarePlatformId: softwarePlatform.id,
                })
                .toPromise()
            );
          }
          Promise.all(promises).then(() => {
            this.getSoftwarePlatforms(deleteParams.queryParams);
            this.utilService.callSnackBar(
              'Successfully deleted software platform(s)'
            );
          });
        }
      });
  }
}
