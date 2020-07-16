import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractValueAccessor, DoProvider } from './abstract-value-accessor';

@Component({
  selector: 'app-checkbox-input',
  templateUrl: './checkbox-input.component.html',
  styleUrls: ['./checkbox-input.component.scss'],
  providers: [DoProvider(CheckboxInputComponent)],
})
export class CheckboxInputComponent extends AbstractValueAccessor
  implements OnInit {
  @Output() onSaveChanges: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() name = '';

  isBeingEdited = false;

  ngOnInit(): void {}

  toggleEdit(): void {
    if (this.isBeingEdited) {
      this.onSaveChanges.emit(this.value);
    }
    this.isBeingEdited = !this.isBeingEdited;
  }
}
