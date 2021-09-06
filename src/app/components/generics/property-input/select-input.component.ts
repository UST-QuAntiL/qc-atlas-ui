import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  QcAtlasUiConfiguration,
  QcAtlasUiRepositoryConfigurationService,
  UiFeatures,
} from '../../../directives/qc-atlas-ui-repository-configuration.service';
import { DoProvider } from './abstract-value-accessor';

export interface Option {
  value: string;
  label: string;
}

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
  providers: [DoProvider(SelectInputComponent)],
})
export class SelectInputComponent implements OnInit {
  @Output() onSaveChanges: EventEmitter<string> = new EventEmitter<string>();
  @Output() onChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() name = '';
  @Input() value: string;
  @Input() choices: Option[] = [];
  @Input() includeEmpty = false;
  @Input() editable = true;

  inputValue: string;

  readonly UiFeatures = UiFeatures;
  uiConfig: QcAtlasUiConfiguration;

  constructor(private configService: QcAtlasUiRepositoryConfigurationService) {}

  saveChanges(): void {
    this.onSaveChanges.emit(this.inputValue);
  }

  get selectedValue(): string {
    return this.choices.find((opt) => opt.value === this.value)?.label || 'n/a';
  }

  inputChanged(): void {
    this.onChange.emit(this.inputValue);
  }

  ngOnInit(): void {
    this.uiConfig = this.configService.configuration;
    this.inputValue = this.value;
  }
}
