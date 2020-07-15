import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-impl-selection-criteria',
  templateUrl: './impl-selection-criteria.component.html',
  styleUrls: ['./impl-selection-criteria.component.scss'],
})
export class ImplSelectionCriteriaComponent {
  @Input() params: InputParameter[];
}

/**
 * this should be generated from the NISQ Analyzer backend
 * TODO
 */
export interface InputParameter {
  name: string;
  datatype: 'Integer' | 'Float' | 'String';
  description?: string;
  restriction?: string;
}
