import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
})
export class TextInputComponent implements ControlValueAccessor {
  @Output() onSaveChanges: EventEmitter<string> = new EventEmitter<string>();

  @Input() name = '';
  @Input() multiline = false;

  isBeingEdited = false;
  private _innerModel: string;

  constructor() {}

  toggleEdit(): void {
    if (this.isBeingEdited) {
      this.onSaveChanges.emit(this._innerModel);
    }
    this.isBeingEdited = !this.isBeingEdited;
  }

  public get model(): string {
    return this._innerModel;
  }

  public set model(newValue: string) {
    this._innerModel = newValue;
    this.onChange(this._innerModel);
  }

  public onChange: any = () => {};

  public onTouched: any = () => {};

  public writeValue(obj: string): void {
    this._innerModel = obj;
  }

  public registerOnChange(fn: string): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: string): void {
    this.onTouched = fn;
  }
}
