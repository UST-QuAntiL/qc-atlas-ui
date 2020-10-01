import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-checkbox-input',
  templateUrl: './checkbox-input.component.html',
  styleUrls: ['./checkbox-input.component.scss'],
})
export class CheckboxInputComponent implements OnInit {
  @Output() onSaveChanges: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() name = '';
  @Input() value: boolean;

  inputValue: boolean;

  ngOnInit(): void {
    this.inputValue = this.value;
  }

  toggleValue(): void {
    this.onChange.emit(this.inputValue);
  }

  saveChanges(): void {
    this.onSaveChanges.emit(this.inputValue);
  }
}
