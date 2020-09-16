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
      .getImplementations({ algoId: this.algo.id })
      .subscribe((impls) => {
        const foundImpl = impls.implementationDtos.find(
          (i) => i.name === this.impl.name
        );
        if (foundImpl) {
          this.nisqImpl = foundImpl;
          this.selection.clear();
        } else {
          this.createNisqImplementation();
        }
      });
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
    this.nisqImplementationService
      .deleteInputParameters({
        implId: this.nisqImpl.id,
        body: this.selection.selected.map(
          (index) => this.nisqImpl.inputParameters.parameters[index].name
        ),
      })
      .subscribe(() => undefined);
    this.nisqImpl.inputParameters.parameters = this.nisqImpl.inputParameters.parameters.filter(
      (_, index) => !this.selection.isSelected(index)
    );
    this.selection.clear();
  }

  async saveParameter(param: ParameterDto, newName?: string): Promise<void> {
    // Do nothing if there's no name yet
    if (!param.name && !newName) {
      return;
    }
    // Very stupid delete & re-create method
    if (param.name) {
      try {
        await this.nisqImplementationService
          .deleteInputParameters({
            implId: this.nisqImpl.id,
            body: [param.name],
          })
          .toPromise();
      } catch (e) {
        // We don't care
      }
    }
    if (newName) {
      param.name = newName;
    }
    this.nisqImplementationService
      .addInputParameter({
        implId: this.nisqImpl.id,
        body: param,
      })
      .subscribe(() => {});
  }

  saveImplementation(): void {
    this.nisqImplementationService
      .updateImplementation({
        implId: this.nisqImpl.id,
        body: this.nisqImpl,
      })
      .subscribe(() => {});
  }

  private createNisqImplementation(): void {
    const body: NisqImplementationDto = {
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
