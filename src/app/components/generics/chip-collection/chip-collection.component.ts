import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-chip-collection',
  templateUrl: './chip-collection.component.html',
  styleUrls: ['./chip-collection.component.scss'],
})
export class ChipCollectionComponent implements OnInit {
  @Output() onRemoveElement: EventEmitter<string> = new EventEmitter<string>();
  @Output() onAddElement: EventEmitter<string> = new EventEmitter<string>();
  @Input() title = '';
  @Input() elements: string[] = [];

  inputValue = '';

  constructor() {}

  ngOnInit(): void {}

  addElement(): void {
    if (this.inputValue.trim() !== '') {
      this.onAddElement.emit(this.inputValue);
    }
    this.inputValue = '';
  }

  removeElement(element: string): void {
    this.onRemoveElement.emit(element);
  }
}
