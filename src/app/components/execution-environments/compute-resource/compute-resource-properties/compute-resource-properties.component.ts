import { Component, Input, OnInit } from '@angular/core';
import { ExecutionEnvironmentsService } from 'api-atlas/services/execution-environments.service';
import { ComputeResourceDto } from 'api-atlas/models/compute-resource-dto';
import { EntityModelComputeResourcePropertyDto } from 'api-atlas/models/entity-model-compute-resource-property-dto';
import { quantumComputationModelOptions } from '../../../../util/options';
import { UpdateFieldEventService } from '../../../../services/update-field-event.service';
import { UtilService } from '../../../../util/util.service';

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
    private updateFieldService: UpdateFieldEventService,
    private utilService: UtilService
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
    this.executionEnvironmentService
      .createComputeResourcePropertyForComputeResource({
        computeResourceId: this.computeResource.id,
        body: property,
      })
      .subscribe(
        () => {
          this.utilService.callSnackBar(
            'Compute resource property was successfully added.'
          );
          this.fetchComputeResourceProperties();
        },
        () => {
          this.utilService.callSnackBar(
            'Error! Could not add compute resource property.'
          );
        }
      );
  }

  updateComputeResourceProperty(
    property: EntityModelComputeResourcePropertyDto
  ): void {
    this.executionEnvironmentService
      .updateComputeResourcePropertyOfComputeResource({
        computeResourceId: this.computeResource.id,
        computeResourcePropertyId: property.id,
        body: property,
      })
      .subscribe(
        () => {
          this.utilService.callSnackBar(
            'Compute resource property was successfully updated.'
          );
          this.fetchComputeResourceProperties();
        },
        () => {
          this.utilService.callSnackBar(
            'Error! Could not update compute resource property.'
          );
        }
      );
  }

  deleteComputeResourceProperty(
    property: EntityModelComputeResourcePropertyDto
  ): void {
    this.executionEnvironmentService
      .deleteComputeResourcePropertyOfComputeResource({
        computeResourceId: this.computeResource.id,
        computeResourcePropertyId: property.id,
      })
      .subscribe(
        () => {
          this.utilService.callSnackBar(
            'Compute resource property was successfully deleted.'
          );
          this.computeResourceProperties = this.computeResourceProperties.filter(
            (elem: EntityModelComputeResourcePropertyDto) =>
              elem.id !== property.id
          );
          this.fetchComputeResourceProperties();
        },
        () => {
          this.utilService.callSnackBar(
            'Error! Could not delete compute resource property.'
          );
        }
      );
  }

  fetchComputeResourceProperties(): void {
    this.executionEnvironmentService
      .getComputeResourcePropertiesOfComputeResource({
        computeResourceId: this.computeResource.id,
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
