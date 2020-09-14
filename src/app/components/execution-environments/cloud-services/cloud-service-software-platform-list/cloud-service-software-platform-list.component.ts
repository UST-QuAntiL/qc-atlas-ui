import { Component, Input, OnInit } from '@angular/core';
import { EntityModelCloudServiceDto } from 'api-atlas/models/entity-model-cloud-service-dto';
import { ExecutionEnvironmentsService } from 'api-atlas/services/execution-environments.service';
import { Router } from '@angular/router';
import { EntityModelSoftwarePlatformDto } from 'api-atlas/models/entity-model-software-platform-dto';
import { SoftwarePlatformDto } from 'api-atlas/models/software-platform-dto';
import {
  SelectParams,
  LinkObject,
} from '../../../generics/data-list/data-list.component';
import { UtilService } from '../../../../util/util.service';

@Component({
  selector: 'app-cloud-service-software-platform-list',
  templateUrl: './cloud-service-software-platform-list.component.html',
  styleUrls: ['./cloud-service-software-platform-list.component.scss'],
})
export class CloudServiceSoftwarePlatformListComponent implements OnInit {
  @Input() cloudService: EntityModelCloudServiceDto;
  softwarePlatforms: EntityModelSoftwarePlatformDto[];
  linkedSoftwarePlatforms: EntityModelSoftwarePlatformDto[] = [];

  tableColumns = ['Name', 'Version', 'Licence', 'Link'];
  variableNames = ['name', 'version', 'licence', 'link'];
  linkObject: LinkObject = {
    title: 'Link software platform with ',
    subtitle: 'Search software platform by name',
    displayVariable: 'name',
    data: [],
  };
  tableAddAllowed = true;
  isLinkingEnabled = false;

  constructor(
    private executionEnvironmentsService: ExecutionEnvironmentsService,
    private utilService: UtilService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.linkObject.title += this.cloudService.name;
    this.getSoftwarePlatforms();
    this.getLinkedSoftwarePlatforms({ cloudServiceId: this.cloudService.id });
  }

  getSoftwarePlatforms(): void {
    this.executionEnvironmentsService
      .getSoftwarePlatforms({ page: -1 })
      .subscribe((softwarePlatforms) => {
        if (softwarePlatforms._embedded) {
          this.softwarePlatforms =
            softwarePlatforms._embedded.softwarePlatforms;
        } else {
          this.softwarePlatforms = [];
        }
      });
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
        if (softwarePlatforms._embedded) {
          this.linkedSoftwarePlatforms =
            softwarePlatforms._embedded.softwarePlatforms;
        } else {
          this.linkedSoftwarePlatforms = [];
        }
      });
  }

  searchUnlinkedSoftwarePlatforms(search: string): void {
    if (search) {
      search = search.toLocaleLowerCase();
      this.linkObject.data = this.softwarePlatforms.filter(
        (softwarePlatform: EntityModelSoftwarePlatformDto) =>
          softwarePlatform.name.toLocaleLowerCase().startsWith(search) &&
          !this.linkedSoftwarePlatforms.includes(softwarePlatform)
      );
    } else {
      this.linkObject.data = [];
    }
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

  unlinkSoftwarePlatforms(event: DeleteParams): void {
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

  onAddElement(): void {}

  onDatalistConfigChanged(): void {
    this.getLinkedSoftwarePlatforms({ cloudServiceId: this.cloudService.id });
  }

  onElementClicked(softwarePlatform: SoftwarePlatformDto): void {
    this.router.navigate([
      'execution-environments',
      'software-platforms',
      softwarePlatform.id,
    ]);
  }

  onToggleLink(): void {
    this.isLinkingEnabled = !this.isLinkingEnabled;
    this.tableAddAllowed = !this.tableAddAllowed;
  }
}
