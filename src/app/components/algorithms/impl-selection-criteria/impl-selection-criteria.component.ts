import { Component, Input } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-impl-selection-criteria',
  templateUrl: './impl-selection-criteria.component.html',
  styleUrls: ['./impl-selection-criteria.component.scss'],
})
export class ImplSelectionCriteriaComponent {
  @Input() params: InputParameter[];

  selection = new SelectionModel<number>(true);

  addOne(): void {
    this.params.push({
      name: '',
      datatype: 'Integer',
    });
  }

  deleteMany(): void {
    this.params = this.params.filter(
      (_, index) => !this.selection.isSelected(index)
    );
    this.selection.clear();
  }
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
