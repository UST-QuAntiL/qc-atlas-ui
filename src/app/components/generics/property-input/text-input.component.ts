import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractValueAccessor, DoProvider } from './abstract-value-accessor';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [DoProvider(TextInputComponent)],
})
export class TextInputComponent extends AbstractValueAccessor {
  @Output() onSaveChanges: EventEmitter<string> = new EventEmitter<string>();

  @Input() name = '';
  @Input() multiline = false;
  @Input() maxLines = 1;

  isBeingEdited = false;

  toggleEdit(): void {
    if (this.isBeingEdited) {
      this.onSaveChanges.emit(this._value);
    }
    this.isBeingEdited = !this.isBeingEdited;
  }
}
