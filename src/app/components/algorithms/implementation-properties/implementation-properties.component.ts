import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImplementationDto } from 'api-atlas/models/implementation-dto';
import { ComputeResourcePropertyDto } from 'api-atlas/models/compute-resource-property-dto';
import { EntityModelRevisionDto } from 'api-atlas/models/entity-model-revision-dto';

@Component({
  selector: 'app-implementation-properties',
  templateUrl: './implementation-properties.component.html',
  styleUrls: ['./implementation-properties.component.scss'],
})
export class ImplementationPropertiesComponent implements OnInit {
  @Input() implementation: ImplementationDto;
  @Input() frontendImplementation: ImplementationDto;
  @Input()
  computeResourceProperties: ComputeResourcePropertyDto[] = [];
  @Output() addComputeResourceProperty: EventEmitter<
    ComputeResourcePropertyDto
  > = new EventEmitter<ComputeResourcePropertyDto>();
  @Output() deleteComputeResourceProperty: EventEmitter<
    ComputeResourcePropertyDto
  > = new EventEmitter<ComputeResourcePropertyDto>();
  @Output() updateComputeResourceProperty: EventEmitter<
    ComputeResourcePropertyDto
  > = new EventEmitter<ComputeResourcePropertyDto>();
  @Output() updateImplementationField: EventEmitter<{
    field;
    value;
  }> = new EventEmitter<{ field; value }>();
  @Output() onRevisionClicked: EventEmitter<
    EntityModelRevisionDto
  > = new EventEmitter<EntityModelRevisionDto>();

  constructor() {}

  ngOnInit(): void {}

  onChangesSaved(value: any, field: string): void {
    this.updateImplementationField.emit({ field, value });
  }

  onPropertyChanged(value: any, field: string): void {
    this.frontendImplementation[field] = value;
  }

  onAddComputeResourceProperty(property: ComputeResourcePropertyDto): void {
    this.addComputeResourceProperty.emit(property);
  }
  onDeleteComputeResourceProperty(property: ComputeResourcePropertyDto): void {
    this.deleteComputeResourceProperty.emit(property);
  }
  onUpdateComputeResourceProperty(property: ComputeResourcePropertyDto): void {
    this.updateComputeResourceProperty.emit(property);
  }
}
