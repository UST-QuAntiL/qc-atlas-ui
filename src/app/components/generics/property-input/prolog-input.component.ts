import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractValueAccessor, DoProvider } from './abstract-value-accessor';
import { CustomErrorStateMatcher } from './default.error-matcher';

@Component({
  selector: 'app-prolog-input',
  templateUrl: './prolog-input.component.html',
  styleUrls: ['./prolog-input.component.scss'],
  providers: [DoProvider(PrologInputComponent)],
})
export class PrologInputComponent extends AbstractValueAccessor {
  @Output() onSaveChanges: EventEmitter<string> = new EventEmitter<string>();

  @Input() name = '';
  @Input() multiline = false;
  @Input() maxLines = 1;

  isBeingEdited = false;

  matcher = new CustomErrorStateMatcher();

  toggleEdit(): void {
    if (this.isBeingEdited) {
      this.onSaveChanges.emit(this._value);
    }
    this.isBeingEdited = !this.isBeingEdited;
  }
}
