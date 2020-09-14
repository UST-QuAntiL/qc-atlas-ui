import { Component, Input, OnInit } from '@angular/core';
import { EntityModelComputeResourceDto } from 'api-atlas/models/entity-model-compute-resource-dto';
import { EntityModelCloudServiceDto } from 'api-atlas/models/entity-model-cloud-service-dto';
import { ExecutionEnvironmentsService } from 'api-atlas/services/execution-environments.service';
import { Router } from '@angular/router';
import { CloudServiceDto } from 'api-atlas/models/cloud-service-dto';
import {
  SelectParams,
  LinkObject,
} from '../../../generics/data-list/data-list.component';
import { UtilService } from '../../../../util/util.service';

@Component({
  selector: 'app-compute-resource-cloud-service-list',
  templateUrl: './compute-resource-cloud-service-list.component.html',
  styleUrls: ['./compute-resource-cloud-service-list.component.scss'],
})
export class ComputeResourceCloudServiceListComponent implements OnInit {
  @Input() computeResource: EntityModelComputeResourceDto;
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
    this.linkObject.title += this.computeResource.name;
    this.getCloudServices();
    this.getLinkedCloudServices({ computeResourceId: this.computeResource.id });
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

  getLinkedCloudServices(params: {
    computeResourceId: string;
    search?: string;
    page?: number;
    size?: number;
    sort?: string[];
  }): void {
    this.executionEnvironmentsService
      .getCloudServicesOfComputeResource(params)
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
      .linkCloudServiceAndComputeResource({
        cloudServiceId: cloudService.id,
        body: this.computeResource,
      })
      .subscribe(() => {
        this.getLinkedCloudServices({
          computeResourceId: this.computeResource.id,
        });
        this.utilService.callSnackBar('Successfully linked cloud service');
      });
  }

  unlinkCloudServices(event: DeleteParams): void {
    const outputPromises: Array<Promise<void>> = [];
    for (const cloudService of event.elements) {
      outputPromises.push(
        this.executionEnvironmentsService
          .unlinkCloudServiceAndComputeResource({
            cloudServiceId: cloudService.id,
            computeResourceId: this.computeResource.id,
          })
          .toPromise()
      );
    }
    Promise.all(outputPromises).then(() => {
      this.getLinkedCloudServices({
        computeResourceId: this.computeResource.id,
      });
      this.utilService.callSnackBar('Successfully unlinked cloud services');
    });
  }

  onAddElement(): void {}

  onDatalistConfigChanged(): void {
    this.getLinkedCloudServices({ computeResourceId: this.computeResource.id });
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
