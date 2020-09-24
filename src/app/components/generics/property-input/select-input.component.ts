import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractValueAccessor, DoProvider } from './abstract-value-accessor';

export interface Option {
  value: string;
  label: string;
}

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss'],
  providers: [DoProvider(SelectInputComponent)],
})
export class SelectInputComponent implements OnInit {
  @Output() onSaveChanges: EventEmitter<string> = new EventEmitter<string>();

  @Input() name = '';
  @Input() value: string;
  @Input() choices: Option[] = [];
  @Input() includeEmpty = false;
  @Input() editable = true;

  inputValue: string;

  saveChanges(): void {
    this.onSaveChanges.emit(this.inputValue);
  }

  get selectedValue() {
    return this.choices.find((opt) => opt.value === this.value)?.label || 'n/a';
  }

  ngOnInit(): void {
    this.inputValue = this.value;
  }
}
