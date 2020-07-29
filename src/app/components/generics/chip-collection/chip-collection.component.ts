import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LinkObject } from '../data-list/data-list.component';

@Component({
  selector: 'app-chip-collection',
  templateUrl: './chip-collection.component.html',
  styleUrls: ['./chip-collection.component.scss'],
})
export class ChipCollectionComponent implements OnInit {
  @Output() onRemoveElement: EventEmitter<any> = new EventEmitter<any>();
  @Output() onAddElement: EventEmitter<any> = new EventEmitter<any>();
  @Output() onSearchTextChanged: EventEmitter<string> = new EventEmitter<
    string
  >();
  @Input() title = '';
  @Input() elements: any[] = [];
  @Input() displayVariable = '';
  @Input() allowEmpty = true;
  @Input() useToAddLinks = false;
  @Input() linkTitle = '';
  @Input() linkSubtitle = '';
  @Input() linkObject: LinkObject;

  inputValue = '';

  constructor() {}

  ngOnInit(): void {}

  addElement(): void {
    if (this.inputValue.trim() !== '') {
      this.onAddElement.emit(this.inputValue);
    }
    this.inputValue = '';
  }

  removeElement(element: any): void {
    this.onRemoveElement.emit(element);
  }
}
