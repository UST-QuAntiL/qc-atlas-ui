import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExecutionEnvironmentsService } from 'api/services/execution-environments.service';
import { EntityModelSoftwarePlatformDto } from 'api/models/entity-model-software-platform-dto';
import { EntityModelCloudServiceDto } from 'api/models/entity-model-cloud-service-dto';
import { CloudServiceDto } from 'api/models/cloud-service-dto';
import {
  DeleteParams,
  LinkObject,
} from '../../../generics/data-list/data-list.component';
import { UtilService } from '../../../../util/util.service';

@Component({
  selector: 'app-software-platform-cloud-service-list',
  templateUrl: './software-platform-cloud-service-list.component.html',
  styleUrls: ['./software-platform-cloud-service-list.component.scss'],
})
export class SoftwarePlatformCloudServiceListComponent implements OnInit {
  @Input() softwarePlatform: EntityModelSoftwarePlatformDto;
  cloudServices: EntityModelCloudServiceDto[];
  linkedCloudServices: EntityModelCloudServiceDto[] = [];

  tableColumns = ['Name', 'Provider', 'Description', 'CostModel', 'URL'];
  variableNames = ['name', 'provider', 'description', 'costModel', 'URL'];
  linkObject: LinkObject = {
    title: 'Link cloud service with ',
    subtitle: 'Search cloud services by name',
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
    this.linkObject.title += this.softwarePlatform.name;
    this.getCloudServices();
    this.getLinkedCloudServices({ id: this.softwarePlatform.id });
  }

  getCloudServices(): void {
    this.executionEnvironmentsService
      .getCloudServices({ page: -1 })
      .subscribe((cloudServices) => {
        if (cloudServices._embedded) {
          this.cloudServices = cloudServices._embedded.cloudServices;
        } else {
          this.cloudServices = [];
        }
      });
  }

  getLinkedCloudServices(params: any): void {
    this.executionEnvironmentsService
      .getCloudServicesForSoftwarePlatform(params)
      .subscribe((cloudServices) => {
        if (cloudServices._embedded) {
          this.linkedCloudServices = cloudServices._embedded.cloudServices;
        } else {
          this.linkedCloudServices = [];
        }
      });
  }

  searchUnlinkedCloudServices(search: string): void {
    if (search) {
      search = search.toLocaleLowerCase();
      this.linkObject.data = this.cloudServices.filter(
        (cloudService: EntityModelCloudServiceDto) =>
          cloudService.name.toLocaleLowerCase().startsWith(search) &&
          !this.linkedCloudServices.includes(cloudService)
      );
    } else {
      this.linkObject.data = [];
    }
  }

  linkCloudService(cloudService: CloudServiceDto): void {
    this.linkObject.data = [];
    this.executionEnvironmentsService
      .addCloudServiceReferenceToSoftwarePlatform({
        id: this.softwarePlatform.id,
        csId: cloudService.id,
      })
      .subscribe((data) => {
        this.getLinkedCloudServices({ id: this.softwarePlatform.id });
        this.utilService.callSnackBar('Successfully linked compute resource');
      });
  }

  async unlinkCloudServices(event: DeleteParams): Promise<void> {
    for (const cloudService of event.elements) {
      await this.executionEnvironmentsService
        .deleteCloudServiceReferenceFromSoftwarePlatform({
          id: this.softwarePlatform.id,
          csId: cloudService.id,
        })
        .toPromise();
      this.getLinkedCloudServices({ id: this.softwarePlatform.id });
      this.utilService.callSnackBar('Successfully unlinked compute resource');
    }
  }

  onAddElement(): void {}

  onDatalistConfigChanged(): void {
    this.getLinkedCloudServices({ id: this.softwarePlatform.id });
  }

  onElementClicked(cloudService: CloudServiceDto): void {
    this.router.navigate([
      'execution-environments',
      'cloud-services',
      cloudService.id,
    ]);
  }

  onToggleLink(): void {
    this.isLinkingEnabled = !this.isLinkingEnabled;
    this.tableAddAllowed = !this.tableAddAllowed;
  }
}
