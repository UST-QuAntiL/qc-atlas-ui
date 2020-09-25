import { Component, Input, OnInit } from '@angular/core';
import { ExecutionEnvironmentsService } from 'api-atlas/services/execution-environments.service';
import { ComputeResourceDto } from 'api-atlas/models/compute-resource-dto';
import { EntityModelComputeResourcePropertyDto } from 'api-atlas/models/entity-model-compute-resource-property-dto';
import { quantumComputationModelOptions } from '../../../../util/options';
import { UpdateFieldEventService } from '../../../../services/update-field-event.service';

@Component({
  selector: 'app-compute-resource-properties',
  templateUrl: './compute-resource-properties.component.html',
  styleUrls: ['./compute-resource-properties.component.scss'],
})
export class ComputeResourcePropertiesComponent implements OnInit {
  @Input() computeResource: ComputeResourceDto;
  @Input() frontendComputeResource: ComputeResourceDto;

  computeResourceProperties: EntityModelComputeResourcePropertyDto[] = [];

  availableQuantumComputationModelOptions = quantumComputationModelOptions;

  constructor(
    private executionEnvironmentService: ExecutionEnvironmentsService,
    private updateFieldService: UpdateFieldEventService
  ) {}

  ngOnInit(): void {
    this.fetchComputeResourceProperties();
  }
  onPropertyChanged(value: any, field: string): void {
    this.frontendComputeResource[field] = value;
  }
  onChangesSaved(value: any, field: string): void {
    this.updateFieldService.updateComputeResourceFieldChannel.emit({
      field,
      value,
    });
  }

  addComputeResourceProperty(
    property: EntityModelComputeResourcePropertyDto
  ): void {
    console.log('add compute resource property');
    console.log(property);
    this.executionEnvironmentService
      .addComputingResourcePropertyToComputeResource({
        id: this.computeResource.id,
        body: property,
      })
      .subscribe((e) => {
        this.fetchComputeResourceProperties();
      });
  }

  updateComputeResourceProperty(
    property: EntityModelComputeResourcePropertyDto
  ): void {
    this.executionEnvironmentService
      .updateComputingResourceResourcePropertyOfComputeResource({
        crid: this.computeResource.id,
        resourceId: property.id,
        body: property,
      })
      .subscribe((e) => {
        this.fetchComputeResourceProperties();
      });
  }

  deleteComputeResourceProperty(
    property: EntityModelComputeResourcePropertyDto
  ): void {
    this.executionEnvironmentService
      .deleteComputingResourcePropertyFromComputeResource({
        crid: this.computeResource.id,
        resourceId: property.id,
      })
      .subscribe((e) => {
        this.computeResourceProperties = this.computeResourceProperties.filter(
          (elem: EntityModelComputeResourcePropertyDto) =>
            elem.id !== property.id
        );
        this.fetchComputeResourceProperties();
      });
  }

  fetchComputeResourceProperties(): void {
    this.executionEnvironmentService
      .getComputingResourcePropertiesForComputeResource({
        id: this.computeResource.id,
        size: -1,
      })
      .subscribe((e) => {
        if (e._embedded != null) {
          this.computeResourceProperties =
            e._embedded.computeResourceProperties;
        }
      });
  }
}
