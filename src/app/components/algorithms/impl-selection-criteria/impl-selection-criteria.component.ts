import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { AlgorithmDto, ImplementationDto } from 'api-atlas/models';
import {
  ImplementationDto as NisqImplementationDto,
  ParameterDto,
} from 'api-nisq/models';
import { ImplementationService as NISQImplementationService } from 'api-nisq/services/implementation.service';
import { parsePrologRule, PrologRule } from '../../../util/MinimalPrologParser';

export interface ParameterPrologRules {
  selectionRule: PrologRule;
  widthRule: PrologRule;
  depthRule: PrologRule;
}

@Component({
  selector: 'app-impl-selection-criteria',
  templateUrl: './impl-selection-criteria.component.html',
  styleUrls: ['./impl-selection-criteria.component.scss'],
})
export class ImplSelectionCriteriaComponent implements OnInit, OnChanges {
  @Input() algo: AlgorithmDto;
  @Input() impl: ImplementationDto;

  nisqImpl: NisqImplementationDto;

  paramPrologRules: ParameterPrologRules;

  selection = new SelectionModel<number>(true);

  constructor(private nisqImplementationService: NISQImplementationService) {}

  ngOnInit(): void {
    this.nisqImplementationService
      .getImplementation({ implId: this.impl.id })
      .subscribe(
        (nisqImpl) => {
          this.nisqImpl = nisqImpl;
          this.selection.clear();
        },
        (error) => {
          if (error.status === 404) {
            this.createNisqImplementation();
          } else {
            console.log(error);
          }
        }
      );
  }

  ngOnChanges(): void {
    if (!this.nisqImpl) {
      return;
    }
    this.paramPrologRules = {
      selectionRule: parsePrologRule(this.nisqImpl.selectionRule),
      widthRule: parsePrologRule(this.nisqImpl.widthRule),
      depthRule: parsePrologRule(this.nisqImpl.depthRule),
    };
  }

  addOne(): void {
    this.nisqImpl.inputParameters.parameters.push({
      name: '',
      type: 'Integer',
    });
  }

  deleteMany(): void {
    // TODO: backend call
    this.nisqImpl.inputParameters.parameters = this.nisqImpl.inputParameters.parameters.filter(
      (_, index) => !this.selection.isSelected(index)
    );
    this.selection.clear();
  }

  saveParameter(param: ParameterDto): void {
    // Do nothing if there's no name yet
    if (!param.name) {
      return;
    }
    this.nisqImplementationService.addInputParameter({
      implId: this.nisqImpl.id,
      body: param,
    });
  }

  private createNisqImplementation(): void {
    const body: NisqImplementationDto = {
      id: this.impl.id,
      name: this.impl.name,
      implementedAlgorithm: this.algo.id,
      selectionRule: '',
      // TODO
      sdk: 'Qiskit',
      fileLocation: 'http://example.com/',
    };
    this.nisqImplementationService
      .createImplementation({ body })
      .subscribe((newImpl) => {
        this.nisqImpl = newImpl;
        this.selection.clear();
      });
  }
}
