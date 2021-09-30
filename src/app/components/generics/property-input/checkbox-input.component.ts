import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  QcAtlasUiConfiguration,
  QcAtlasUiRepositoryConfigurationService,
  UiFeatures,
} from '../../../directives/qc-atlas-ui-repository-configuration.service';

@Component({
  selector: 'app-checkbox-input',
  templateUrl: './checkbox-input.component.html',
  styleUrls: ['./checkbox-input.component.scss'],
})
export class CheckboxInputComponent {
  @Output() onSaveChanges: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() name = '';
  @Input() value: boolean;
  @Input() baseValue: boolean;

  uiConfig: QcAtlasUiConfiguration;

  constructor(private configService: QcAtlasUiRepositoryConfigurationService) {}

  ngOnInit(): void {
    this.uiConfig = this.configService.configuration;
  }

  toggleValue(): void {
    this.onChange.emit(this.value);
  }

  saveChanges(): void {
    this.onSaveChanges.emit(this.value);
  }
}
