import { Component, Input, OnInit } from '@angular/core';
import { EntityModelSoftwarePlatformDto } from 'api-atlas/models/entity-model-software-platform-dto';
import { ExecutionEnvironmentsService } from 'api-atlas/services/execution-environments.service';
import { ImplementationDto } from 'api-atlas/models/implementation-dto';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import { Router } from '@angular/router';
import { SoftwarePlatformDto } from 'api-atlas/models/software-platform-dto';
import { MatDialog } from '@angular/material/dialog';
import { ComputeResourceDto } from 'api-atlas/models/compute-resource-dto';
import {
  LinkObject,
  QueryParams,
} from '../../../generics/data-list/data-list.component';
import { UtilService } from '../../../../util/util.service';
import { GenericDataService } from '../../../../util/generic-data.service';
import { LinkItemListDialogComponent } from '../../../generics/dialogs/link-item-list-dialog.component';

@Component({
  selector: 'app-implementation-softwareplatform-list',
  templateUrl: './implementation-softwareplatform-list.component.html',
  styleUrls: ['./implementation-softwareplatform-list.component.scss'],
})
export class ImplementationSoftwareplatformListComponent implements OnInit {
  @Input() implementation: ImplementationDto;

  publications: EntityModelSoftwarePlatformDto[];
  variableNames: string[] = ['name', 'link', 'license', 'version'];
  tableColumns: string[] = ['Name', 'Link', 'License', 'Version'];
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
    private algorithmService: AlgorithmService,
    private genericDataService: GenericDataService,
    private router: Router,
    private utilService: UtilService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.linkObject.title += this.implementation.name;
    this.getAllLinkedPlatforms();
  }

  getAllLinkedPlatforms(): void {
    this.algorithmService
      .getSoftwarePlatformsOfImplementation({
        implementationId: this.implementation.id,
        algorithmId: this.implementation.implementedAlgorithmId,
      })
      .subscribe((softwarePlatforms) => {
        this.linkObject.linkedData = [];
        if (softwarePlatforms._embedded) {
          this.linkObject.linkedData =
            softwarePlatforms._embedded.softwarePlatforms;
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

  getLinkedPlatforms(params: {
    algorithmId: string;
    implementationId: string;
    softwarePlatformId: string;
  }): void {
    this.algorithmService
      .getSoftwarePlatformOfImplementation(params)
      .subscribe((data) => {
        this.updateSoftwarePlatformData(data);
      });
  }

  getLinkedPlatformsHateoas(url: string): void {
    this.genericDataService.getData(url).subscribe((data) => {
      this.updateSoftwarePlatformData(data);
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

  linkSoftwarePlatform(platform: SoftwarePlatformDto): void {
    // Empty unlinked algorithms
    this.linkObject.data = [];
    this.executionEnvironmentsService
      .linkSoftwarePlatformAndImplementation({
        softwarePlatformId: platform.id,
        body: this.implementation,
      })
      .subscribe((data) => {
        this.getLinkedPlatformsHateoas(this.pagingInfo._links.self.href);
        this.getAllLinkedPlatforms();
        this.utilService.callSnackBar('Successfully linked software platform');
      });
  }

  unlinkSoftwarePlatforms(event): void {
    const promises: Array<Promise<void>> = [];
    for (const platform of event.elements) {
      promises.push(
        this.executionEnvironmentsService
          .unlinkSoftwarePlatformAndImplementation({
            softwarePlatformId: platform.id,
            implementationId: this.implementation.id,
          })
          .toPromise()
      );
    }
    Promise.all(promises).then(() => {
      this.utilService.callSnackBar(
        'Successfully unlinked software platform(s)'
      );
      this.loadCorrectPageAfterDelete(event.elements.length);
      this.getAllLinkedPlatforms();
    });
  }

  onDatalistConfigChanged(event): void {
    event.algorithmId = this.implementation.implementedAlgorithmId;
    event.implementationId = this.implementation.id;
    this.getLinkedPlatforms(event);
  }

  onElementClicked(platform: any): void {
    this.routeToSoftwarePlatform(platform);
  }

  routeToSoftwarePlatform(softwarePlatform: SoftwarePlatformDto): void {
    this.router.navigate([
      'execution-environments',
      'software-platforms',
      softwarePlatform.id,
    ]);
  }

  onPageChanged(event): void {
    this.getLinkedPlatformsHateoas(event);
  }

  /**
   * This method is used to load the correct page if elements are
   * deleted since deleting objects can lead to a decrease of the amount of pages.
   *
   * @param deletedElements
   */
  loadCorrectPageAfterDelete(deletedElements: number): void {
    if (
      this.linkObject.linkedData.length === deletedElements &&
      this.pagingInfo.page.number !== 0
    ) {
      this.getLinkedPlatformsHateoas(this.pagingInfo._links.prev.href);
    } else {
      this.getLinkedPlatformsHateoas(this.pagingInfo._links.self.href);
    }
  }
}
