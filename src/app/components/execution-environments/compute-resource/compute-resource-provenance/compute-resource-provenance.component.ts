import { Subscription } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { ComputeResourceDto } from 'api-atlas/models/compute-resource-dto';
import { UpdateFieldEventService } from '../../../../services/update-field-event.service';
import { quantumComputationModelOptions } from '../../../../util/options';
import { ExecutionEnvironmentsService } from 'api-atlas/services';
import { EntityModelComputeResourcePropertyDto } from 'api-atlas/models/entity-model-compute-resource-property-dto';

@Component({
  selector: 'app-compute-resource-provenance',
  templateUrl: './compute-resource-provenance.component.html',
  styleUrls: ['./compute-resource-provenance.component.scss'],
})
export class ComputeResourceProvenanceComponent implements OnInit {
  @Input() computeResource: ComputeResourceDto;
  @Input() frontendComputeResource: ComputeResourceDto;

  private fieldUpdateSubscription: Subscription;

  computeResourceProperties: EntityModelComputeResourcePropertyDto[] = [];

  availableQuantumComputationModelOptions = quantumComputationModelOptions;

  constructor(
    private executionEnvironmentService: ExecutionEnvironmentsService,
    private updateFieldService: UpdateFieldEventService
  ) { }

  ngOnInit(): void {
    this.fieldUpdateSubscription = this.updateFieldService.updateComputeResourceFieldChannel.subscribe(
      () => {
        this.updateComputeResourceField();
      }
    );
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

  ngOnDestroy(): void {
    this.fieldUpdateSubscription.unsubscribe();
  }

  updateComputeResourceField() {
    throw new Error('Method noXt implemented.');
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
