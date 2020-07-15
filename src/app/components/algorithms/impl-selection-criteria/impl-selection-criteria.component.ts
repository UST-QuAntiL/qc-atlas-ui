import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-impl-selection-criteria',
  templateUrl: './impl-selection-criteria.component.html',
  styleUrls: ['./impl-selection-criteria.component.scss'],
})
export class ImplSelectionCriteriaComponent {
  @Input() params: InputParameters[];
}

/**
 * this should be generated from the NISQ Analyzer backend
 * TODO
 */
interface InputParameters {
  name: string;
  datatype: 'Integer' | 'Float' | 'String';
  description?: string;
  restriction?: string;
}
