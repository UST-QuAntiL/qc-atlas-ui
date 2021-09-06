import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  QcAtlasUiConfiguration,
  QcAtlasUiRepositoryConfigurationService,
  UiFeatures,
} from '../../../directives/qc-atlas-ui-repository-configuration.service';

@Component({
  selector: 'app-link-input',
  templateUrl: './link-input.component.html',
  styleUrls: ['./link-input.component.scss'],
})
export class LinkInputComponent implements OnInit {
  @Input() linkObject: any;
  @Input() isDisableable: boolean;
  @Output() linkElement = new EventEmitter<any>();
  @Output() searchTextChanged = new EventEmitter<string>();
  @Output() disable = new EventEmitter<void>();
  linkSearchText = '';

  readonly UiFeatures = UiFeatures;
  uiConfig: QcAtlasUiConfiguration;

  constructor(private configService: QcAtlasUiRepositoryConfigurationService) {}

  ngOnInit(): void {
    this.uiConfig = this.configService.configuration;
  }

  onLinkElement(element: any): void {
    this.linkElement.emit(element);
    this.linkSearchText = '';
  }

  onLinkSearchChange(): void {
    this.searchTextChanged.emit(this.linkSearchText);
  }

  onDisable(): void {
    this.disable.emit();
  }
}
