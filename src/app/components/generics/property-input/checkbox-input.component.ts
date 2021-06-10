import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox-input',
  templateUrl: './checkbox-input.component.html',
  styleUrls: ['./checkbox-input.component.scss'],
})
export class CheckboxInputComponent {
  @Output() onSaveChanges: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() name = '';
  @Input() value: boolean;
  @Input() baseValue: boolean;

  toggleValue(): void {
    this.onChange.emit(this.value);
  }

  saveChanges(): void {
    this.onSaveChanges.emit(this.value);
  }
}
