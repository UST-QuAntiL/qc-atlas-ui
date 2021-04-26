import { cloneDeep, isEqual } from 'lodash';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { AlgorithmDto, ImplementationDto } from 'api-atlas/models';
import { ImplementationDto as NisqImplementationDto } from 'api-nisq/models';
import {
  ImplementationService as NISQImplementationService,
  SdksService,
} from 'api-nisq/services';
import { ChangePageGuard } from '../../../services/deactivation-guard';
import { parsePrologRule, PrologRule } from '../../../util/MinimalPrologParser';
import { Option } from '../../generics/property-input/select-input.component';
import { UiFeatures } from '../../../directives/qc-atlas-ui-repository-configuration.service';

@Component({
  selector: 'app-impl-selection-criteria',
  templateUrl: './impl-selection-criteria.component.html',
  styleUrls: ['./impl-selection-criteria.component.scss'],
})
export class ImplSelectionCriteriaComponent implements OnInit, OnChanges {
  @Input() algo: AlgorithmDto;
  @Input() impl: ImplementationDto;
  @Input() guard: ChangePageGuard;

  readonly UiFeatures = UiFeatures;
  oldNisqImpl: NisqImplementationDto;
  nisqImpl: NisqImplementationDto;

  paramPrologRules: {
    selectionRule: PrologRule;
  };

  selection = new SelectionModel<number>(true);
  sdks$: Observable<Option[]>;
  languages: Option[] = [
    { value: 'Qiskit', label: 'Qiskit' },
    { value: 'OpenQASM', label: 'OpenQASM' },
    { value: 'Quil', label: 'Quil' },
    { value: 'PyQuil', label: 'PyQuil' },
  ];

  constructor(
    private nisqImplementationService: NISQImplementationService,
    private readonly sdkService: SdksService
  ) {}

  ngOnInit(): void {
    this.sdks$ = this.sdkService
      .getSdks()
      .pipe(
        map((dto) =>
          dto.sdkDtos.map((sdk) => ({ label: sdk.name, value: sdk.name }))
        )
      );
    this.nisqImplementationService
      .getImplementations({ algoId: this.algo.id })
      .subscribe((impls) => {
        const foundImpl = impls.implementationDtos.find(
          (i) => i.name === this.impl.name
        );
        if (foundImpl) {
          this.nisqImpl = foundImpl;
          this.oldNisqImpl = cloneDeep(foundImpl);
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
    };
  }

  addOne(): void {
    this.nisqImpl.inputParameters.parameters.push({
      name: '',
      type: 'Integer',
    });
  }

  deleteMany(): void {
    this.nisqImpl.inputParameters.parameters = this.nisqImpl.inputParameters.parameters.filter(
      (_, index) => !this.selection.isSelected(index)
    );
    this.selection.clear();
  }

  saveImplementation(): void {
    // Get lists of all params that need to be deleted, created or both
    const updatedParams = this.nisqImpl.inputParameters.parameters.filter(
      (param) => {
        const prevParam = this.oldNisqImpl.inputParameters.parameters.find(
          (p) => p.name === param.name
        );
        return prevParam && !isEqual(param, prevParam);
      }
    );
    const removedParams = this.oldNisqImpl.inputParameters.parameters
      .filter(
        (param) =>
          !this.nisqImpl.inputParameters.parameters.find(
            (prevParam) => prevParam.name === param.name
          )
      )
      .concat(updatedParams);
    const addedParams = this.nisqImpl.inputParameters.parameters
      .filter(
        (param) =>
          !this.oldNisqImpl.inputParameters.parameters.find(
            (prevParam) => prevParam.name === param.name
          )
      )
      .concat(updatedParams);

    console.log(
      `Updated params ${updatedParams.length} - del ${removedParams.length} add ${addedParams.length}`
    );

    // Build chained observables. Deleting needs to come first so re-creating them later will succeed.
    const allRemovedParams$ = this.nisqImplementationService.deleteInputParameters(
      {
        implId: this.nisqImpl.id,
        body: removedParams.map((param) => param.name),
      }
    );
    const allAddedParams$ = allRemovedParams$.pipe(
      switchMap(() =>
        forkJoin(
          addedParams.map((param) =>
            this.nisqImplementationService.addInputParameter({
              implId: this.nisqImpl.id,
              body: param,
            })
          )
        )
      )
    );
    allAddedParams$.subscribe({
      complete: () => {
        this.nisqImplementationService
          .updateImplementation({
            implId: this.nisqImpl.id,
            body: this.nisqImpl,
          })
          .subscribe((impl) => {
            this.nisqImpl = impl;
            this.oldNisqImpl = cloneDeep(impl);
          });
      },
    });
  }

  private createNisqImplementation(): void {
    const body: NisqImplementationDto = {
      name: this.impl.name,
      implementedAlgorithm: this.algo.id,
      selectionRule: '',
      // TODO
      sdk: 'Qiskit',
      language: 'OpenQASM',
      fileLocation: 'http://example.com/',
    };
    this.nisqImplementationService
      .createImplementation({ body })
      .subscribe((newImpl) => {
        this.nisqImpl = newImpl;
        this.oldNisqImpl = cloneDeep(newImpl);
        this.selection.clear();
      });
  }
}
