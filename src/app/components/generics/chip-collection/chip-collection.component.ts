import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LinkObject } from '../data-list/data-list.component';
import { UtilService } from '../../../util/util.service';
import {
  QcAtlasUiConfiguration,
  QcAtlasUiRepositoryConfigurationService,
  UiFeatures,
} from '../../../directives/qc-atlas-ui-repository-configuration.service';

@Component({
  selector: 'app-chip-collection',
  templateUrl: './chip-collection.component.html',
  styleUrls: ['./chip-collection.component.scss'],
})
export class ChipCollectionComponent implements OnInit {
  @Output() onUnlinkElement: EventEmitter<any> = new EventEmitter<any>();
  @Output() onLinkElement: EventEmitter<any> = new EventEmitter<any>();
  @Output() onElementsChanged: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSaveChanges: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSearchTextChanged: EventEmitter<string> = new EventEmitter<
    string
  >();
  @Input() title = '';
  @Input() elements: any[] = [];
  @Input() displayVariable = '';
  @Input() allowEmpty = true;
  @Input() useToAddLinks = false;
  @Input() linkObject: LinkObject;

  inputValue = '';
  inputElements: any[] = [];
  readonly UiFeatures = UiFeatures;
  uiConfig: QcAtlasUiConfiguration;

  constructor(
    public utilService: UtilService,
    private configService: QcAtlasUiRepositoryConfigurationService
  ) {}

  ngOnInit(): void {
    this.uiConfig = this.configService.configuration;
    this.inputElements = this.elements
      ? JSON.parse(JSON.stringify(this.elements))
      : [];
  }

  addElement(): void {
    if (this.inputValue.trim() !== '') {
      if (this.useToAddLinks) {
        this.onLinkElement.emit(this.inputValue);
      } else {
        this.inputElements.push(this.inputValue);
        this.onElementsChanged.emit(this.inputElements);
      }
    }
    this.inputValue = '';
  }

  removeElement(element: any): void {
    if (this.useToAddLinks) {
      this.onUnlinkElement.emit(element);
    } else {
      this.inputElements = this.inputElements.filter(
        (author) => author !== element
      );
      this.onElementsChanged.emit(this.inputElements);
    }
  }

  saveChanges(): void {
    this.onSaveChanges.emit(this.inputElements);
  }
}
