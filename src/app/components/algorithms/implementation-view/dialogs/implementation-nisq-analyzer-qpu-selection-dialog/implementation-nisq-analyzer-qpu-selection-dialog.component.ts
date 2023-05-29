import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { EntityModelProviderDto } from 'api-qprov/models/entity-model-provider-dto';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ProviderService } from 'api-qprov/services/provider.service';
import { UtilService } from 'src/app/util/util.service';
import { NisqAnalyzerService } from '../../../nisq-analyzer/nisq-analyzer.service';

@Component({
  selector: 'app-implementation-nisq-analyzer-qpu-selection-dialog',
  templateUrl:
    './implementation-nisq-analyzer-qpu-selection-dialog.component.html',
  styleUrls: [
    './implementation-nisq-analyzer-qpu-selection-dialog.component.scss',
  ],
})
export class ImplementationNisqAnalyzerQpuSelectionDialogComponent
  implements OnInit {
  qpuSelectionFrom: UntypedFormGroup;
  provider?: EntityModelProviderDto;
  ready?: boolean;
  isIbmqSelected = true;
  selectedCompilers: string[] = [];

  shortWaitingTimeEnabled = false;
  stableExecutionResultsEnabled = false;
  predictionAlgorithmInDialog = 'extra_trees_regressor';
  metaOptimizerInDialog = 'ada_boost_regressor';
  advancedSettingsOpen: boolean;
  queueImportanceRatioDialog = 0;
  maxNumberOfCompiledCircuitsDialog = 5;
  disableDefiningMaximumNumberOfCircuits = false;

  constructor(
    public dialogRef: MatDialogRef<
      ImplementationNisqAnalyzerQpuSelectionDialogComponent
    >,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private providerService: ProviderService,
    private nisqAnalyzerService: NisqAnalyzerService,
    private utilService: UtilService
  ) {}

  get vendor(): AbstractControl | null {
    return this.qpuSelectionFrom.get('vendor');
  }

  get token(): AbstractControl | null {
    return this.qpuSelectionFrom.get('token');
  }

  get compilers(): UntypedFormArray {
    return this.qpuSelectionFrom.get('compilers') as UntypedFormArray;
  }

  get shortWaitingTime(): AbstractControl | null {
    return this.qpuSelectionFrom.get('shortWaitingTime');
  }

  get stableExecutionResults(): AbstractControl | null {
    return this.qpuSelectionFrom.get('stableExecutionResults');
  }

  get predictionAlgorithm(): AbstractControl | null {
    return this.qpuSelectionFrom.get('predictionAlgorithm');
  }

  get metaOptimizer(): AbstractControl | null {
    return this.qpuSelectionFrom.get('metaOptimizer');
  }

  get maxNumberOfCompiledCircuits(): AbstractControl | null {
    return this.qpuSelectionFrom.get('maxNumberOfCompiledCircuits');
  }

  get queueImportanceRatio(): AbstractControl | null {
    return this.qpuSelectionFrom.get('queueImportanceRatio');
  }

  ngOnInit(): void {
    this.qpuSelectionFrom = new UntypedFormGroup({
      vendor: new UntypedFormControl(this.data.vendor, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
      ]),
      token: new UntypedFormControl(this.data.token),
      compilers: new UntypedFormArray([]),
      maxNumberOfCompiledCircuits: new UntypedFormControl(
        this.data.maxNumberOfCompiledCircuits,
        [
          // eslint-disable-next-line @typescript-eslint/unbound-method
          Validators.required,
        ]
      ),
      predictionAlgorithm: new UntypedFormControl(this.data.predictionAlgorithm, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
      ]),
      metaOptimizer: new UntypedFormControl(this.data.metaOptimizer, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
      ]),
      queueImportanceRatio: new UntypedFormControl(this.data.queueImportanceRatio, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
      ]),
      shortWaitingTime: new UntypedFormControl(this.data.shortWaitingTime, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
      ]),
      stableExecutionResults: new UntypedFormControl(
        this.data.stableExecutionResults,
        [
          // eslint-disable-next-line @typescript-eslint/unbound-method
          Validators.required,
        ]
      ),
    });

    this.vendor.setValue('IBMQ');
    this.onVendorChanged(this.vendor.value);
    this.setCompilerOptions(this.vendor.value);
    this.predictionAlgorithm.setValue('extra_trees_regressor');
    this.metaOptimizer.setValue('ada_boost_regressor');
    this.maxNumberOfCompiledCircuits.setValue(5);
    this.stableExecutionResults.setValue(false);
    this.shortWaitingTime.setValue(false);

    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.vendor = this.vendor.value;
      this.data.token = this.token.value;
      this.data.selectedCompilers = this.selectedCompilers;
      this.data.maxNumberOfCompiledCircuits = this.maxNumberOfCompiledCircuitsDialog;
      this.data.metaOptimizer = this.metaOptimizerInDialog;
      this.data.predictionAlgorithm = this.predictionAlgorithmInDialog;
      this.data.queueImportanceRatio = this.queueImportanceRatioDialog;
      this.data.shortWaitingTime = this.shortWaitingTimeEnabled;
      this.data.stableExecutionResults = this.stableExecutionResultsEnabled;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  isRequiredDataMissing(): boolean {
    return this.vendor.errors?.required;
  }

  onVendorChanged(value: string): void {
    this.isIbmqSelected = true;
    if (value === 'IBMQ') {
      this.providerService.getProviders().subscribe((result) => {
        this.getProviderDtoByName(result);
        if (!this.provider) {
          console.error('Provider with given name not found!');
          this.ready = true;
          return;
        }
        this.setCompilerOptions(value);
      });
    } else {
      this.isIbmqSelected = false;
      this.setCompilerOptions(value);
    }
  }

  getProviderDtoByName(result): void {
    if (result === null) {
      console.error('Error while loading provider!');
      return;
    }
    for (const providerDto of result._embedded.providerDtoes) {
      if (providerDto.name.toLowerCase() === 'ibmq') {
        this.provider = providerDto;
        return;
      }
    }
  }

  updateCompilerSelection(compilerName: string, allowed: boolean): void {
    if (allowed) {
      this.selectedCompilers.push(compilerName);
    } else {
      this.selectedCompilers = this.selectedCompilers.filter(
        (item) => item !== compilerName
      );
    }
    if (this.selectedCompilers.length < 1) {
      this.utilService.callSnackBar('Select at least  one compiler');
    }
  }

  checkIfCompilerSelected(compilerName: string): boolean {
    return this.selectedCompilers.includes(compilerName);
  }

  checkIfCompilersPresent(): boolean {
    if (this.selectedCompilers.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  setCompilerOptions(vendor: string): void {
    this.nisqAnalyzerService
      .getCompilers(vendor)
      .subscribe((availableCompilers) => {
        this.selectedCompilers = availableCompilers;
        this.compilers.clear();
        for (const compiler of availableCompilers) {
          this.compilers.push(new UntypedFormControl(compiler));
        }
      });
  }

  setWaitingTimeEnabled(enabled: boolean): void {
    this.shortWaitingTimeEnabled = enabled;
  }

  setStableExecutionResultsEnabled(enabled: boolean): void {
    this.stableExecutionResultsEnabled = enabled;
  }

  setMaximumNumberofCompilationResultsSelected(enabled: boolean): void {
    this.disableDefiningMaximumNumberOfCircuits = enabled;
    if (enabled) {
      this.maxNumberOfCompiledCircuitsDialog = 0;
    } else {
      this.maxNumberOfCompiledCircuitsDialog = 5;
    }
  }

  setPredictionAlgorithm(predictionAlgorithm: string): void {
    this.predictionAlgorithmInDialog = predictionAlgorithm;
  }

  setMetaOptimizer(metaOptimizer: string): void {
    this.metaOptimizerInDialog = metaOptimizer;
  }

  setMaxNumberOfCompiledCircuits(event): void {
    this.maxNumberOfCompiledCircuitsDialog = event;
  }

  setQueueImportanceRatio(event): void {
    this.queueImportanceRatioDialog = event.value / 100;
  }

  formatLabel(value: number): number | string {
    if (value >= 0) {
      return Math.round(value) + ':' + Math.round(100 - value);
    }
    return value;
  }
}

interface DialogData {
  title: string;
  vendor: string;
  token: string;
  selectedCompilers: string[];
  predictionAlgorithm: string;
  metaOptimizer: string;
  queueImportanceRatio: number;
  maxNumberOfCompiledCircuits: number;
  stableExecutionResults: boolean;
  shortWaitingTime: boolean;
}
