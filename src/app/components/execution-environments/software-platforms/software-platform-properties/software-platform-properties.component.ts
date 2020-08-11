import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EntityModelSoftwarePlatformDto } from 'api/models/entity-model-software-platform-dto';
import { UpdateFieldEventService } from '../../../../services/update-field-event.service';

@Component({
  selector: 'app-software-platform-properties',
  templateUrl: './software-platform-properties.component.html',
  styleUrls: ['./software-platform-properties.component.scss'],
})
export class SoftwarePlatformPropertiesComponent implements OnInit {
  @Input() softwarePlatform: EntityModelSoftwarePlatformDto;

  @Output() updateSoftwarePlatformField: EventEmitter<{
    field;
    value;
  }> = new EventEmitter<{ field; value }>();

  constructor(private updateFieldService: UpdateFieldEventService) {}

  ngOnInit(): void {}

  onChangesSaved(value: any, field: string): void {
    this.updateFieldService.updateSoftwarePlatformFieldChannel.emit({
      field,
      value,
    });
  }
}
