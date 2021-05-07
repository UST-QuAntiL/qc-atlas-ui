import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SoftwarePlatformDto } from 'api-atlas/models/software-platform-dto';
import { UpdateFieldEventService } from '../../../../services/update-field-event.service';

@Component({
  selector: 'app-software-platform-properties',
  templateUrl: './software-platform-properties.component.html',
  styleUrls: ['./software-platform-properties.component.scss'],
})
export class SoftwarePlatformPropertiesComponent implements OnInit {
  @Input() softwarePlatform: SoftwarePlatformDto;
  @Input() frontendSoftwarePlatform: SoftwarePlatformDto;
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

  onPropertyChanged(value: any, field: string): void {
    this.frontendSoftwarePlatform[field] = value;
  }
}
