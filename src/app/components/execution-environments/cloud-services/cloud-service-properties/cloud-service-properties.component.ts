import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CloudServiceDto } from 'api-atlas/models/cloud-service-dto';
import { UpdateFieldEventService } from '../../../../services/update-field-event.service';

@Component({
  selector: 'app-cloud-service-properties',
  templateUrl: './cloud-service-properties.component.html',
  styleUrls: ['./cloud-service-properties.component.scss'],
})
export class CloudServicePropertiesComponent implements OnInit {
  @Input()
  public cloudService: CloudServiceDto;
  @Input() frontendCloudService: CloudServiceDto;
  @Output() updateCloudServiceField: EventEmitter<{
    field;
    value;
  }> = new EventEmitter<{ field; value }>();

  constructor(private updateFieldService: UpdateFieldEventService) {}

  ngOnInit(): void {}

  onChangesSaved(value: any, field: string): void {
    this.updateFieldService.updateCloudServiceFieldChannel.emit({
      field,
      value,
    });
  }
  onPropertyChanged(value: any, field: string): void {
    this.frontendCloudService[field] = value;
  }
}
