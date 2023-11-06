import { ErrorStateMatcher } from '@angular/material/core';
import { UntypedFormControl } from '@angular/forms';

/**
 * mat-error does not work correctly with validators by default
 * this class overrides this behavior
 * see: https://stackoverflow.com/questions/46745171/angular-material-show-mat-error-on-button-click
 */
export class CustomErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: UntypedFormControl | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
