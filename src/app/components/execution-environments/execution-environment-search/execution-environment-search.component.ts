import { Component, OnInit } from '@angular/core';
import { SoftwarePlatformDto } from 'api-atlas/models/software-platform-dto';
import { CloudServiceDto } from 'api-atlas/models/cloud-service-dto';
import { ComputeResourceDto } from 'api-atlas/models/compute-resource-dto';
import { ExecutionEnvironmentsService } from 'api-atlas/services/execution-environments.service';
import { Router } from '@angular/router';
import { QueryParams } from '../../generics/data-list/data-list.component';

@Component({
  selector: 'app-execution-environment-search',
  templateUrl: './execution-environment-search.component.html',
  styleUrls: ['./execution-environment-search.component.scss'],
})
export class ExecutionEnvironmentSearchComponent implements OnInit {
  softwarePlatforms: SoftwarePlatformDto[] = [];
  tableColumnsSoftwarePlatform = ['Name', 'Version', 'Licence', 'Link'];
  variableNamesSoftwarePlatform = ['name', 'version', 'licence', 'link'];
  pagingInfoSoftwarePlatforms: any = {};

  cloudServices: CloudServiceDto[] = [];
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

  computeResources: ComputeResourceDto[] = [];
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

  prepareSoftwarePlatformData(data): void {
    if (data.content) {
      this.softwarePlatforms = data.content;
    } else {
      this.softwarePlatforms = [];
    }
    this.pagingInfoSoftwarePlatforms.totalPages = data.totalPages;
    this.pagingInfoSoftwarePlatforms.number = data.number;
    this.pagingInfoSoftwarePlatforms.sort = data.sort;
  }

  onSoftwarePlatformClicked(softwarePlatform: SoftwarePlatformDto): void {
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

  prepareCloudServiceData(data): void {
    if (data.content) {
      this.cloudServices = data.content;
    } else {
      this.cloudServices = [];
    }
    this.pagingInfoCloudServices.totalPages = data.totalPages;
    this.pagingInfoCloudServices.number = data.number;
    this.pagingInfoCloudServices.sort = data.sort;
  }

  onCloudServiceClicked(cloudService: CloudServiceDto): void {
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

  prepareComputeResourceData(data): void {
    if (data.content) {
      this.computeResources = data.content;
    } else {
      this.computeResources = [];
    }
    this.pagingInfoComputeResources.totalPages = data.totalPages;
    this.pagingInfoComputeResources.number = data.number;
    this.pagingInfoComputeResources.sort = data.sort;
  }

  onComputeResourceClicked(computeResource: ComputeResourceDto): void {
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
