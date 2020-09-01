import { Component, Input, OnInit } from '@angular/core';
import { EntityModelCloudServiceDto } from 'api/models/entity-model-cloud-service-dto';
import { ExecutionEnvironmentsService } from 'api/services/execution-environments.service';
import { Router } from '@angular/router';
import { EntityModelComputeResourceDto } from 'api/models/entity-model-compute-resource-dto';
import { ComputeResourceDto } from 'api/models/compute-resource-dto';
import {
  SelectParams,
  LinkObject,
} from '../../../generics/data-list/data-list.component';
import { UtilService } from '../../../../util/util.service';

@Component({
  selector: 'app-cloud-service-compute-resource-list',
  templateUrl: './cloud-service-compute-resource-list.component.html',
  styleUrls: ['./cloud-service-compute-resource-list.component.scss'],
})
export class CloudServiceComputeResourceListComponent implements OnInit {
  @Input() cloudService: EntityModelCloudServiceDto;
  computeResources: EntityModelComputeResourceDto[];
  linkedComputeResources: EntityModelComputeResourceDto[] = [];

  tableColumns = ['Name', 'Vendor', 'Technology', 'Quantum Computation Model'];
  variableNames = ['name', 'vendor', 'technology', 'quantumComputationModel'];
  linkObject: LinkObject = {
    title: 'Link compute resource with ',
    subtitle: 'Search compute resources by name',
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
    this.getComputeResources();
    this.getLinkedComputeResources({ id: this.cloudService.id });
  }

  getComputeResources(): void {
    this.executionEnvironmentsService
      .getComputeResources({ page: -1 })
      .subscribe((computeResources) => {
        if (computeResources._embedded) {
          this.computeResources = computeResources._embedded.computeResources;
        } else {
          this.computeResources = [];
        }
      });
  }

  getLinkedComputeResources(params: any): void {
    this.executionEnvironmentsService
      .getComputeResourcesForCloudService(params)
      .subscribe((computeResource) => {
        if (computeResource._embedded) {
          this.linkedComputeResources =
            computeResource._embedded.computeResources;
        } else {
          this.linkedComputeResources = [];
        }
      });
  }

  searchUnlinkedComputeResources(search: string): void {
    if (search) {
      search = search.toLocaleLowerCase();
      this.linkObject.data = this.computeResources.filter(
        (computeResource: EntityModelComputeResourceDto) =>
          computeResource.name.toLocaleLowerCase().startsWith(search) &&
          !this.linkedComputeResources.includes(computeResource)
      );
    } else {
      this.linkObject.data = [];
    }
  }

  linkComputeResource(computeResource: ComputeResourceDto): void {
    this.linkObject.data = [];
    this.executionEnvironmentsService
      .addComputeResourceReferenceToCloudService({
        id: this.cloudService.id,
        crId: computeResource.id,
      })
      .subscribe((data) => {
        this.getLinkedComputeResources({ id: this.cloudService.id });
        this.utilService.callSnackBar('Successfully linked compute resource');
      });
  }

  async unlinkComputeResources(event: SelectParams): Promise<void> {
    for (const computeResource of event.elements) {
      await this.executionEnvironmentsService
        .deleteComputeResourceReferenceFromCloudService({
          id: this.cloudService.id,
          crId: computeResource.id,
        })
        .toPromise();
      this.getLinkedComputeResources({ id: this.cloudService.id });
      this.utilService.callSnackBar('Successfully unlinked compute resource');
    }
  }

  onAddElement(): void {}

  onDatalistConfigChanged(): void {
    this.getLinkedComputeResources({ id: this.cloudService.id });
  }

  onElementClicked(computeResource: ComputeResourceDto): void {
    this.router.navigate([
      'execution-environments',
      'compute-resources',
      computeResource.id,
    ]);
  }

  onToggleLink(): void {
    this.isLinkingEnabled = !this.isLinkingEnabled;
    this.tableAddAllowed = !this.tableAddAllowed;
  }
}
