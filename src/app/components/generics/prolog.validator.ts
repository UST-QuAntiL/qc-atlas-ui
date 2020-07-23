import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { parsePrologRule } from '../../util/MinimalPrologParser';

@Directive({
  selector: '[prolog][ngModel]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: PrologValidator, multi: true },
  ],
})
export class PrologValidator implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value == null || control.value.length === 0) {
      return null;
    }
    try {
      // Ignore the result, we just want to know if it's valid.
      parsePrologRule(control.value);
      return null;
    } catch (e) {
      return { message: e.message };
    }
  }
}
