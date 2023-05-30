import { cloneDeep, isEqual } from 'lodash';
import { forkJoin, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import {
  AlgorithmDto,
  ImplementationDto,
  SoftwarePlatformDto,
} from 'api-atlas/models';
import {
  ImplementationDto as NisqImplementationDto,
  SdkDto,
} from 'api-nisq/models';
import {
  ImplementationService as NISQImplementationService,
  SdksService,
} from 'api-nisq/services';
import { ApiConfiguration } from 'api-atlas/api-configuration';
import { ExecutionEnvironmentsService } from 'api-atlas/services/execution-environments.service';
import { ChangePageGuard } from "app/services/deactivation-guard";
import { parsePrologRule, PrologRule } from "app/util/MinimalPrologParser";
import { Option } from '../../generics/property-input/select-input.component';
import { UiFeatures } from "app/directives/qc-atlas-ui-repository-configuration.service";
import { PlanqkPlatformService } from "app/services/planqk-platform.service";
import { UtilService } from "app/util/util.service";
import { CreateSoftwarePlatformDialogComponent } from '../../execution-environments/software-platforms/dialogs/create-software-platform-dialog.component';

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
    private readonly sdkService: SdksService,
    private config: ApiConfiguration,
    private planqkPlatformService: PlanqkPlatformService,
    private utilService: UtilService,
    private executionEnvironmentsService: ExecutionEnvironmentsService
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

  onCreateSoftwarePlatform(): void {
    this.utilService
      .createDialog(CreateSoftwarePlatformDialogComponent, {
        title: 'Create a new Software Platform',
      })
      .afterClosed()
      .subscribe((dialogResult) => {
        if (dialogResult) {
          const sdkDto: SdkDto = {
            id: null,
            name: dialogResult.name,
          };
          this.sdkService.createSdk({ body: sdkDto }).subscribe(
            () => {
              const softwarePlatformDto: SoftwarePlatformDto = {
                id: null,
                name: dialogResult.name,
              };
              this.executionEnvironmentsService
                .createSoftwarePlatform({ body: softwarePlatformDto })
                .subscribe(
                  (softwarePlatform: SoftwarePlatformDto) => {
                    this.utilService.callSnackBar(
                      'Successfully created Software Platform "' +
                        softwarePlatform.name +
                        '".'
                    );
                    this.sdks$ = this.sdkService.getSdks().pipe(
                      map((dto) =>
                        dto.sdkDtos.map((sdk) => ({
                          label: sdk.name,
                          value: sdk.name,
                        }))
                      )
                    );
                  },
                  () => {
                    this.utilService.callSnackBar(
                      'Error! Software platform could not be created in QC-Atlas.'
                    );
                  }
                );
            },
            () => {
              this.utilService.callSnackBar(
                'Error! Software platform could not be created in NISQ Analyzer.'
              );
            }
          );
        }
      });
  }

  private createNisqImplementation(): void {
    let body: NisqImplementationDto;
    const sdkNameList: string[] = [];
    const fileIdsList: string[] = [];

    // TODO: currently file handling is different on the platform than in the QC Atlas. Thus, file access API is
    // not generated
    if (this.config.rootUrl.includes('platform.planqk')) {
      this.sdkService.getSdks().subscribe(
        (dto) => {
          dto.sdkDtos.map((sdk) => sdkNameList.push(sdk.name));
          // create SDK if not existing in NISQ Analyzer DB
          if (!sdkNameList.includes(this.impl.technology)) {
            const sdkDto: SdkDto = {
              id: null,
              name: this.impl.technology,
            };
            this.sdkService.createSdk({ body: sdkDto }).subscribe();
          }
          this.planqkPlatformService
            .getImplementationFileIdOfPlanqkPlatform(this.algo.id, this.impl.id)
            .subscribe((files) => {
              files.content.map((file) => fileIdsList.push(file.id));
              if (fileIdsList.length > 0) {
                body = {
                  name: this.impl.name,
                  implementedAlgorithm: this.algo.id,
                  selectionRule: '',
                  sdk: this.impl.technology,
                  language: this.impl.version,
                  fileLocation:
                    'https://platform.planqk.de/qc-catalog/algorithms/' +
                    this.algo.id +
                    '/implementations/' +
                    this.impl.id +
                    '/files/' +
                    // TODO: currently assuming first file is the one to be analyzed and executed
                    fileIdsList[0] +
                    '/content',
                };
                this.nisqImplementationService
                  .createImplementation({ body })
                  .subscribe((newImpl) => {
                    this.nisqImpl = newImpl;
                    this.oldNisqImpl = cloneDeep(newImpl);
                    this.selection.clear();
                  });
              }
            });
        },
        () =>
          this.utilService.callSnackBar(
            'Error! The NISQ Analyzer cannot process available implementation data.'
          )
      );
    } else {
      this.sdkService.getSdks().subscribe((dto) => {
        let isQiskitAvailable = true;
        if (
          dto.sdkDtos.filter((sdk) => sdk.name.toLowerCase() === 'qiskit')
            .length < 1
        ) {
          isQiskitAvailable = false;
          const sdkDto: SdkDto = {
            id: null,
            name: 'Qiskit',
          };
          this.sdkService.createSdk({ body: sdkDto }).subscribe(
            () => {
              console.log('Successfully added default SDK to NISQ Analyzer');
              isQiskitAvailable = true;
              const softwarePlatformDto: SoftwarePlatformDto = {
                id: null,
                name: 'Qiskit',
              };
              this.executionEnvironmentsService
                .createSoftwarePlatform({ body: softwarePlatformDto })
                .subscribe(
                  () => {
                    console.log('Successfully added default SDK to QC-Atlas');
                    // enable that the mat spinner under Selection Criteria of an
                    //  implementation disappears and the Input fields appear as soon as the default SDK and the nisqImpl is added and available
                    this.ngOnInit();
                  },
                  () => {
                    console.log('Failed to add default SDK to QC-Atlas');
                    // Revoke addition of sdk to nisq analyser
                  }
                );
            },
            () => {
              console.log('Failed to add default SDK to NISQ Analyzer');
            }
          );
        }
        if (isQiskitAvailable) {
          body = {
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
      });
    }
  }
}
