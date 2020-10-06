import { Component, Input, OnInit } from '@angular/core';
import { EntityModelCloudServiceDto } from 'api-atlas/models/entity-model-cloud-service-dto';
import { ExecutionEnvironmentsService } from 'api-atlas/services/execution-environments.service';
import { Router } from '@angular/router';
import { SoftwarePlatformDto } from 'api-atlas/models/software-platform-dto';
import { MatDialog } from '@angular/material/dialog';
import { ComputeResourceDto } from 'api-atlas/models/compute-resource-dto';
import {
  SelectParams,
  LinkObject,
  QueryParams,
  UrlData,
} from '../../../generics/data-list/data-list.component';
import { UtilService } from '../../../../util/util.service';
import { GenericDataService } from '../../../../util/generic-data.service';
import { LinkItemListDialogComponent } from '../../../generics/dialogs/link-item-list-dialog.component';

@Component({
  selector: 'app-cloud-service-software-platform-list',
  templateUrl: './cloud-service-software-platform-list.component.html',
  styleUrls: ['./cloud-service-software-platform-list.component.scss'],
})
export class CloudServiceSoftwarePlatformListComponent implements OnInit {
  @Input() cloudService: EntityModelCloudServiceDto;

  tableColumns = ['Name', 'Version', 'Licence', 'Link'];
  variableNames = ['name', 'version', 'licence', 'link'];
  externalLinkVariables = ['link'];
  linkObject: LinkObject = {
    title: 'Link software platform with ',
    subtitle: 'Search software platform by name',
    displayVariable: 'name',
    data: [],
    linkedData: [],
  };
  tableAddAllowed = true;
  pagingInfo: any = {};
  paginatorConfig: any = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };

  constructor(
    private executionEnvironmentsService: ExecutionEnvironmentsService,
    private genericDataService: GenericDataService,
    private router: Router,
    private utilService: UtilService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.linkObject.title += this.cloudService.name;
    this.getSoftwarePlatforms();
    this.getLinkedSoftwarePlatforms({ cloudServiceId: this.cloudService.id });
  }

  getSoftwarePlatforms(): void {
    this.executionEnvironmentsService
      .getSoftwarePlatforms({})
      .subscribe((softwarePlatforms) => {
        this.linkObject.data = [];
        if (softwarePlatforms._embedded) {
          this.linkObject.data = softwarePlatforms._embedded.softwarePlatforms;
        }
      });
  }

  updateSoftwarePlatformData(data): void {
    // clear link object data
    this.linkObject.data = [];
    // If software platforms found
    if (data._embedded) {
      this.linkObject.data = data._embedded.softwarePlatforms;
    }
    this.pagingInfo.page = data.page;
    this.pagingInfo._links = data._links;
  }

  getLinkedSoftwarePlatforms(params: {
    cloudServiceId: string;
    search?: string;
    page?: number;
    size?: number;
    sort?: string[];
  }): void {
    this.executionEnvironmentsService
      .getSoftwarePlatformsOfCloudService(params)
      .subscribe((softwarePlatforms) => {
        this.linkObject.linkedData = [];
        if (softwarePlatforms._embedded) {
          this.linkObject.linkedData =
            softwarePlatforms._embedded.softwarePlatforms;
        }
      });
  }

  openLinkSoftwarePlatformDialog(): void {
    this.executionEnvironmentsService
      .getSoftwarePlatforms()
      .subscribe((data) => {
        this.updateSoftwarePlatformData(data);
        const dialogRef = this.dialog.open(LinkItemListDialogComponent, {
          width: '800px',
          data: {
            title: 'Link existing software platforms',
            linkObject: this.linkObject,
            tableColumns: ['Name', 'Version', 'Licence'],
            variableNames: ['name', 'version', 'licence'],
            pagingInfo: this.pagingInfo,
            paginatorConfig: this.paginatorConfig,
            noButtonText: 'Cancel',
          },
        });
        const searchTextSub = dialogRef.componentInstance.onDataListConfigChanged.subscribe(
          (search: QueryParams) => {
            this.executionEnvironmentsService
              .getSoftwarePlatforms(search)
              .subscribe((updatedData) => {
                this.updateSoftwarePlatformData(updatedData);
                dialogRef.componentInstance.data.linkObject = this.linkObject;
              });
          }
        );
        const pagingSub = dialogRef.componentInstance.onPageChanged.subscribe(
          (page: string) => {
            this.genericDataService.getData(page).subscribe((pageData) => {
              this.updateSoftwarePlatformData(pageData);
              dialogRef.componentInstance.data.linkObject = this.linkObject;
            });
          }
        );
        const elementClickedSub = dialogRef.componentInstance.onElementClicked.subscribe(
          (element: ComputeResourceDto) => {
            this.routeToSoftwarePlatform(element);
            dialogRef.close();
          }
        );

        dialogRef.afterClosed().subscribe((dialogResult) => {
          searchTextSub.unsubscribe();
          pagingSub.unsubscribe();
          elementClickedSub.unsubscribe();
          if (dialogResult) {
            for (const computeResource of dialogResult.selectedItems) {
              this.linkSoftwarePlatform(computeResource);
            }
          }
        });
      });
  }

  linkSoftwarePlatform(softwarePlatform: SoftwarePlatformDto): void {
    this.linkObject.data = [];
    this.executionEnvironmentsService
      .linkSoftwarePlatformAndCloudService({
        softwarePlatformId: softwarePlatform.id,
        body: this.cloudService,
      })
      .subscribe(() => {
        this.getLinkedSoftwarePlatforms({
          cloudServiceId: this.cloudService.id,
        });
        this.utilService.callSnackBar('Successfully linked software platform');
      });
  }

  unlinkSoftwarePlatforms(event: SelectParams): void {
    const promises: Array<Promise<void>> = [];
    for (const softwarePlatform of event.elements) {
      promises.push(
        this.executionEnvironmentsService
          .unlinkSoftwarePlatformAndCloudService({
            softwarePlatformId: softwarePlatform.id,
            cloudServiceId: this.cloudService.id,
          })
          .toPromise()
      );
    }
    Promise.all(promises).then(() => {
      this.getLinkedSoftwarePlatforms({ cloudServiceId: this.cloudService.id });
      this.utilService.callSnackBar('Successfully unlinked software platform');
    });
  }

  onDatalistConfigChanged(): void {
    this.getLinkedSoftwarePlatforms({ cloudServiceId: this.cloudService.id });
  }

  onElementClicked(softwarePlatform: SoftwarePlatformDto): void {
    this.routeToSoftwarePlatform(softwarePlatform);
  }

  onUrlClicked(urlData: UrlData): void {
    // No check needed since publications have only one url-field called 'link'
    window.open(urlData.element['link'], '_blank');
  }

  routeToSoftwarePlatform(softwarePlatform: SoftwarePlatformDto): void {
    this.router.navigate([
      'execution-environments',
      'software-platforms',
      softwarePlatform.id,
    ]);
  }
}
