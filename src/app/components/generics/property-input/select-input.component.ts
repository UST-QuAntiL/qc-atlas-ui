import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractValueAccessor } from './abstract-value-accessor';

export interface Option {
  value: string;
  label: string;
}

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
})
export class SelectInputComponent extends AbstractValueAccessor {
  @Output() onSaveChanges: EventEmitter<string> = new EventEmitter<string>();

  @Input() name = '';
  @Input() choices: Option[] = [];
  @Input() includeEmpty = false;
  @Input() editable = true;

  isBeingEdited = false;

  toggleEdit(): void {
    if (!this.editable) {
      return;
    }
    if (this.isBeingEdited) {
      this.onSaveChanges.emit(this.value);
    }
    this.isBeingEdited = !this.isBeingEdited;
  }

  get selectedValue() {
    return this.choices.find((opt) => opt.value === this.value)?.label || 'n/a';
  }
}
