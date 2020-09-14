import { Component, Input, OnInit } from '@angular/core';
import { EntityModelSoftwarePlatformDto } from 'api-atlas/models/entity-model-software-platform-dto';
import { ExecutionEnvironmentsService } from 'api-atlas/services/execution-environments.service';
import { ImplementationDto } from 'api-atlas/models/implementation-dto';
import { AlgorithmService } from 'api-atlas/services/algorithm.service';
import { Router } from '@angular/router';
import { SoftwarePlatformDto } from 'api-atlas/models/software-platform-dto';
import { LinkObject } from '../../../generics/data-list/data-list.component';
import { UtilService } from '../../../../util/util.service';
import { GenericDataService } from '../../../../util/generic-data.service';

@Component({
  selector: 'app-implementation-softwareplatform-list',
  templateUrl: './implementation-softwareplatform-list.component.html',
  styleUrls: ['./implementation-softwareplatform-list.component.scss'],
})
export class ImplementationSoftwareplatformListComponent implements OnInit {
  @Input() implementation: ImplementationDto;
  @Input() linkedPlatforms: EntityModelSoftwarePlatformDto[] = [];
  allLinkedPlatforms: EntityModelSoftwarePlatformDto[] = [];

  publications: EntityModelSoftwarePlatformDto[];
  variableNames: string[] = ['name', 'link', 'license', 'version'];
  tableColumns: string[] = ['Name', 'Link', 'License', 'Version'];
  linkObject: LinkObject = {
    title: 'Link software platform with ',
    subtitle: 'Search software platform by name',
    displayVariable: 'name',
    data: [],
  };
  pagingInfo: any = {};
  paginatorConfig: any = {
    amountChoices: [10, 25, 50],
    selectedAmount: 10,
  };
  tableAddAllowed = true;
  isLinkingEnabled = false;

  constructor(
    private executionEnvironmentsService: ExecutionEnvironmentsService,
    private algorithmService: AlgorithmService,
    private genericDataService: GenericDataService,
    private router: Router,
    private utilService: UtilService
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
      .subscribe((data) => {
        // Read all incoming data
        if (data._embedded) {
          this.allLinkedPlatforms = data._embedded.softwarePlatforms;
        } else {
          this.allLinkedPlatforms = [];
        }
      });
  }

  getLinkedPlatforms(params: {
    algorithmId: string;
    implementationId: string;
    softwarePlatformId: string;
  }): void {
    this.algorithmService
      .getSoftwarePlatformOfImplementation(params)
      .subscribe((data) => {
        this.prepareLinkedPlatformsData(data);
      });
  }

  getLinkedPlatformsHateoas(url: string): void {
    this.genericDataService.getData(url).subscribe((data) => {
      this.prepareLinkedPlatformsData(data);
    });
  }

  prepareLinkedPlatformsData(data): void {
    // Read all incoming data
    if (data._embedded) {
      this.linkedPlatforms = data._embedded.softwarePlatforms;
    } else {
      this.linkedPlatforms = [];
    }
    this.pagingInfo.page = data.page;
    this.pagingInfo._links = data._links;
  }

  searchUnlinkedPlatforms(search: string): void {
    if (search) {
      this.executionEnvironmentsService
        .getSoftwarePlatforms({ search })
        .subscribe((data) => {
          this.updateLinkablePlatforms(data._embedded);
        });
    } else {
      this.linkObject.data = [];
    }
  }

  updateLinkablePlatforms(platformData): void {
    // Clear list of linkable platforms
    this.linkObject.data = [];
    // If linkable platforms found
    if (platformData) {
      // Search platforms and filter only those that are not already linked
      for (const platform of platformData.softwarePlatforms) {
        if (!this.allLinkedPlatforms.some((plat) => plat.id === platform.id)) {
          this.linkObject.data.push(platform);
        }
      }
    }
  }

  linkPlatform(platform: SoftwarePlatformDto): void {
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

  unlinkPlatforms(event): void {
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
    this.router.navigate([
      'execution-environments',
      'software-platforms',
      platform.id,
    ]);
  }

  onPageChanged(event): void {
    this.getLinkedPlatformsHateoas(event);
  }

  onToggleLink(): void {
    this.isLinkingEnabled = !this.isLinkingEnabled;
    this.tableAddAllowed = !this.tableAddAllowed;
  }

  /**
   * This method is used to load the correct page if elements are
   * deleted since deleting objects can lead to a decrease of the amount of pages.
   *
   * @param deletedElements
   */
  loadCorrectPageAfterDelete(deletedElements: number): void {
    if (
      this.linkedPlatforms.length === deletedElements &&
      this.pagingInfo.page.number !== 0
    ) {
      this.getLinkedPlatformsHateoas(this.pagingInfo._links.prev.href);
    } else {
      this.getLinkedPlatformsHateoas(this.pagingInfo._links.self.href);
    }
  }
}
