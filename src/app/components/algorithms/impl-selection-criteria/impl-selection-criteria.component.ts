import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { parsePrologRule, PrologRule } from '../../../util/MinimalPrologParser';

@Component({
  selector: 'app-impl-selection-criteria',
  templateUrl: './impl-selection-criteria.component.html',
  styleUrls: ['./impl-selection-criteria.component.scss'],
})
export class ImplSelectionCriteriaComponent implements OnChanges {
  @Input() params: InputParameter[];
  @Input() selectionRule: string;
  @Input() widthRule: string;
  @Input() depthRule: string;

  paramPrologRules: ParameterPrologRules;

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

  ngOnChanges(): void {
    this.paramPrologRules = {
      selectionRule: parsePrologRule(this.selectionRule),
      widthRule: parsePrologRule(this.widthRule),
      depthRule: parsePrologRule(this.depthRule),
    };
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

export interface ParameterPrologRules {
  selectionRule: PrologRule;
  widthRule: PrologRule;
  depthRule: PrologRule;
}
