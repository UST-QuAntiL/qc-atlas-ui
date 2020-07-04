import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent {
  @Output() onSaveChanges: EventEmitter<string> = new EventEmitter<string>();

  @Input() name = '';
  @Input() value = '';
  @Input() multiline = false;

  isBeingEdited = false;

  constructor() {}

  toggleEdit(): void {
    if (this.isBeingEdited) {
      this.onSaveChanges.emit(this.value);
    }
    this.isBeingEdited = !this.isBeingEdited;
  }
}
