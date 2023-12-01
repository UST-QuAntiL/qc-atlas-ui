import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  qpuSelectionFrom: FormGroup;
  selectedVendors: string[] = [];
  ready?: boolean;
  selectedCompilers: string[] = [];

  ibmqEnabled = true;
  ionqEnabled = false;
  awsEnabled = false;
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

  get vendors(): FormArray | null {
    return this.qpuSelectionFrom.get('vendors') as FormArray;
  }

  get ibmqToken(): AbstractControl | null {
    return this.qpuSelectionFrom.get('ibmqToken');
  }

  get ionqToken(): AbstractControl | null {
    return this.qpuSelectionFrom.get('ionqToken');
  }

  get awsToken(): AbstractControl | null {
    return this.qpuSelectionFrom.get('awsToken');
  }

  get awsSecretToken(): AbstractControl | null {
    return this.qpuSelectionFrom.get('awsSecretToken');
  }

  get compilers(): FormArray {
    return this.qpuSelectionFrom.get('compilers') as FormArray;
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
    this.qpuSelectionFrom = new FormGroup({
      vendors: new FormArray([]),
      ibmqToken: new FormControl(this.data.ibmqToken),
      ionqToken: new FormControl(this.data.ionqToken),
      awsToken: new FormControl(this.data.awsToken),
      awsSecretToken: new FormControl(this.data.awsSecretToken),
      compilers: new FormArray([]),
      maxNumberOfCompiledCircuits: new FormControl(
        this.data.maxNumberOfCompiledCircuits,
        [
          // eslint-disable-next-line @typescript-eslint/unbound-method
          Validators.required,
        ]
      ),
      predictionAlgorithm: new FormControl(this.data.predictionAlgorithm, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
      ]),
      metaOptimizer: new FormControl(this.data.metaOptimizer, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
      ]),
      queueImportanceRatio: new FormControl(this.data.queueImportanceRatio, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
      ]),
      shortWaitingTime: new FormControl(this.data.shortWaitingTime, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
      ]),
      stableExecutionResults: new FormControl(
        this.data.stableExecutionResults,
        [
          // eslint-disable-next-line @typescript-eslint/unbound-method
          Validators.required,
        ]
      ),
    });

    this.selectedVendors = ['ibmq'];
    for (const vendor of this.selectedVendors) {
      this.vendors.push(new FormControl(vendor));
    }
    this.setCompilerOptions(this.selectedVendors);
    this.predictionAlgorithm.setValue('extra_trees_regressor');
    this.metaOptimizer.setValue('ada_boost_regressor');
    this.maxNumberOfCompiledCircuits.setValue(5);
    this.stableExecutionResults.setValue(false);
    this.shortWaitingTime.setValue(false);

    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.vendors = this.selectedVendors;
      this.data.selectedCompilers = this.selectedCompilers;
      this.data.maxNumberOfCompiledCircuits = this.maxNumberOfCompiledCircuitsDialog;
      this.data.metaOptimizer = this.metaOptimizerInDialog;
      this.data.predictionAlgorithm = this.predictionAlgorithmInDialog;
      this.data.queueImportanceRatio = this.queueImportanceRatioDialog;
      this.data.shortWaitingTime = this.shortWaitingTimeEnabled;
      this.data.stableExecutionResults = this.stableExecutionResultsEnabled;
      this.data.ibmqToken = this.ibmqToken.value;
      this.data.ionqToken = this.ionqToken.value;
      this.data.awsToken = this.awsToken.value;
      this.data.awsSecretToken = this.awsSecretToken.value;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateCompilerSelection(compilerName: string, allowed: boolean): void {
    if (allowed && !this.selectedCompilers.includes(compilerName)) {
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

  checkIfCompilersAndProvidersPresent(): boolean {
    if (this.selectedCompilers.length > 0 && this.selectedVendors.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  setCompilerOptions(vendors: string[]): void {
    const setOfAllAvailableCompilers = new Set<string>();
    for (const vendor of vendors) {
      this.nisqAnalyzerService
        .getCompilers(vendor)
        .subscribe((availableCompilers) => {
          for (const availableCompiler of availableCompilers) {
            setOfAllAvailableCompilers.add(availableCompiler);
          }
          setOfAllAvailableCompilers.forEach((compiler) => {
            if (!this.selectedCompilers.includes(compiler)) {
              this.selectedCompilers.push(compiler);
            }
          });
          this.compilers.clear();
          for (const compiler of setOfAllAvailableCompilers) {
            this.compilers.push(new FormControl(compiler));
          }
        });
    }
  }

  setIbmqEnabled(enabled: boolean): void {
    this.ibmqEnabled = enabled;
    if (enabled) {
      this.selectedVendors.push('ibmq');
    } else {
      this.selectedVendors = this.selectedVendors.filter(
        (item) => item !== 'ibmq'
      );
    }
  }

  setIonqEnabled(enabled: boolean): void {
    this.ionqEnabled = enabled;
    if (enabled) {
      this.selectedVendors.push('ionq');
    } else {
      this.selectedVendors = this.selectedVendors.filter(
        (item) => item !== 'ionq'
      );
    }
  }

  setAwsEnabled(enabled: boolean): void {
    this.awsEnabled = enabled;
    if (enabled) {
      this.selectedVendors.push('aws');
    } else {
      this.selectedVendors = this.selectedVendors.filter(
        (item) => item !== 'aws'
      );
    }
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
  vendors: string[];
  selectedCompilers: string[];
  predictionAlgorithm: string;
  metaOptimizer: string;
  queueImportanceRatio: number;
  maxNumberOfCompiledCircuits: number;
  stableExecutionResults: boolean;
  shortWaitingTime: boolean;
  ibmqToken: string;
  ionqToken: string;
  awsToken: string;
  awsSecretToken: string;
}
