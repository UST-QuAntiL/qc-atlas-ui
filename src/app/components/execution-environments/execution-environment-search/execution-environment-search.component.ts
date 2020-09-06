import { Component, OnInit } from '@angular/core';
import { EntityModelSoftwarePlatformDto } from 'api-atlas/models/entity-model-software-platform-dto';
import { EntityModelCloudServiceDto } from 'api-atlas/models/entity-model-cloud-service-dto';
import { EntityModelComputeResourceDto } from 'api-atlas/models/entity-model-compute-resource-dto';
import { ExecutionEnvironmentsService } from 'api-atlas/services/execution-environments.service';
import { Router } from '@angular/router';
import { QueryParams } from '../../generics/data-list/data-list.component';
import { GenericDataService } from '../../../util/generic-data.service';

@Component({
  selector: 'app-execution-environment-search',
  templateUrl: './execution-environment-search.component.html',
  styleUrls: ['./execution-environment-search.component.scss'],
})
export class ExecutionEnvironmentSearchComponent implements OnInit {
  softwarePlatforms: EntityModelSoftwarePlatformDto[] = [];
  tableColumnsSoftwarePlatform = ['Name', 'Version', 'Licence', 'Link'];
  variableNamesSoftwarePlatform = ['name', 'version', 'licence', 'link'];
  pagingInfoSoftwarePlatforms: any = {};

  cloudServices: EntityModelCloudServiceDto[] = [];
  tableColumnsCloudServices = [
    'Name',
    'Provider',
    'Description',
    'CostModel',
    'URL',
  ];
  variableNamesCloudServices = [
    'name',
    'provider',
    'description',
    'costModel',
    'URL',
  ];
  pagingInfoCloudServices: any = {};

  computeResources: EntityModelComputeResourceDto[] = [];
  tableColumnsComputeResources = [
    'Name',
    'Vendor',
    'Technology',
    'Quantum Computation Model',
  ];
  variableNamesComputeResources = [
    'name',
    'vendor',
    'technology',
    'quantumComputationModel',
  ];
  pagingInfoComputeResources: any = {};

  searchText = '';
  hasSearched = false;

  constructor(
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
    this.pagingInfoSoftwarePlatforms.page = data.page;
    this.pagingInfoSoftwarePlatforms._links = data._links;
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

  getCloudServices(params: QueryParams): void {
    this.executionEnvironmentsService
      .getCloudServices(params)
      .subscribe((data) => {
        this.prepareCloudServiceData(data);
      });
  }

  getCloudServicesHateoas(url: string): void {
    this.genericDataService.getData(url).subscribe((data) => {
      this.prepareCloudServiceData(data);
    });
  }

  prepareCloudServiceData(data): void {
    if (data._embedded) {
      this.cloudServices = data._embedded.cloudServices;
    } else {
      this.cloudServices = [];
    }
    this.pagingInfoCloudServices.page = data.page;
    this.pagingInfoCloudServices._links = data._links;
  }

  onCloudServiceClicked(cloudService: EntityModelCloudServiceDto): void {
    this.router.navigate([
      'execution-environments',
      'cloud-services',
      cloudService.id,
    ]);
  }

  getComputeResources(params: QueryParams): void {
    this.executionEnvironmentsService
      .getComputeResources(params)
      .subscribe((data) => {
        this.prepareComputeResourceData(data);
      });
  }

  getComputeResourcesHateoas(url: string): void {
    this.genericDataService.getData(url).subscribe((data) => {
      this.prepareComputeResourceData(data);
    });
  }

  prepareComputeResourceData(data): void {
    if (data._embedded) {
      this.computeResources = data._embedded.computeResources;
    } else {
      this.computeResources = [];
    }
    this.pagingInfoComputeResources.page = data.page;
    this.pagingInfoComputeResources._links = data._links;
  }

  onComputeResourceClicked(
    computeResource: EntityModelComputeResourceDto
  ): void {
    this.router.navigate([
      'execution-environments',
      'compute-resources',
      computeResource.id,
    ]);
  }

  onDatalistConfigChanged(event): void {
    console.log(event);
  }

  onSearch(): void {
    this.searchText = this.searchText.trim();
    if (this.searchText === '') {
      return;
    }
    this.hasSearched = true;
    this.getSoftwarePlatforms({
      page: 0,
      size: 10,
      search: this.searchText,
    });
    this.getCloudServices({
      page: 0,
      size: 10,
      search: this.searchText,
    });
    this.getComputeResources({
      page: 0,
      size: 10,
      search: this.searchText,
    });
  }
}
