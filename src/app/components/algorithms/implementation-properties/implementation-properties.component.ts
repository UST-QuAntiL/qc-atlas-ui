import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImplementationDto } from 'api-atlas/models/implementation-dto';
import { EntityModelComputeResourcePropertyDto } from 'api-atlas/models/entity-model-compute-resource-property-dto';

@Component({
  selector: 'app-implementation-properties',
  templateUrl: './implementation-properties.component.html',
  styleUrls: ['./implementation-properties.component.scss'],
})
export class ImplementationPropertiesComponent implements OnInit {
  @Input() implementation: ImplementationDto;
  @Input() frontendImplementation: ImplementationDto;
  @Input()
  computeResourceProperties: EntityModelComputeResourcePropertyDto[] = [];
  @Output() addComputeResourceProperty: EventEmitter<
    EntityModelComputeResourcePropertyDto
  > = new EventEmitter<EntityModelComputeResourcePropertyDto>();
  @Output() deleteComputeResourceProperty: EventEmitter<
    EntityModelComputeResourcePropertyDto
  > = new EventEmitter<EntityModelComputeResourcePropertyDto>();
  @Output() updateComputeResourceProperty: EventEmitter<
    EntityModelComputeResourcePropertyDto
  > = new EventEmitter<EntityModelComputeResourcePropertyDto>();
  @Output() updateImplementationField: EventEmitter<{
    field;
    value;
  }> = new EventEmitter<{ field; value }>();
  constructor() {}

  ngOnInit(): void {}

  onChangesSaved(value: any, field: string): void {
    this.updateImplementationField.emit({ field, value });
  }

  onPropertyChanged(value: any, field: string): void {
    this.frontendImplementation[field] = value;
  }

  onAddComputeResourceProperty(
    property: EntityModelComputeResourcePropertyDto
  ): void {
    this.addComputeResourceProperty.emit(property);
  }
  onDeleteComputeResourceProperty(
    property: EntityModelComputeResourcePropertyDto
  ): void {
    this.deleteComputeResourceProperty.emit(property);
  }
  onUpdateComputeResourceProperty(
    property: EntityModelComputeResourcePropertyDto
  ): void {
    this.updateComputeResourceProperty.emit(property);
  }
}
