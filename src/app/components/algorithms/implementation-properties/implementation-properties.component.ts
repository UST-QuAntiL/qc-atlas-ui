import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { ImplementationDto } from 'api-atlas/models/implementation-dto';
import { EntityModelComputeResourcePropertyDto } from 'api-atlas/models/entity-model-compute-resource-property-dto';
import { EntityModelRevisionDto } from 'api-atlas/models/entity-model-revision-dto';
import { ImplementationsService } from 'api-atlas/services/implementations.service';
import { QueryParams } from '../../generics/data-list/data-list.component';
import { GenericDataService } from '../../../util/generic-data.service';
import { UtilService } from '../../../util/util.service';
import {
  ConfirmDialogComponent,
  ConfirmDialogData,
} from '../../generics/dialogs/confirm-dialog.component';

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
  @Output() onRevisionClicked: EventEmitter<
    EntityModelRevisionDto
  > = new EventEmitter<EntityModelRevisionDto>();

  revisions: any[] = [];

  constructor(
    private implementationService: ImplementationsService,
    private genericDataService: GenericDataService,
    private utilService: UtilService
  ) {}

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
