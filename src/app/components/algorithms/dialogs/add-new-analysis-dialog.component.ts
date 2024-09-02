import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ParameterDto } from 'api-nisq/models/parameter-dto';
import { CloudServiceDto } from 'api-atlas/models/cloud-service-dto';
import { ExecutionEnvironmentsService } from 'api-atlas/services/execution-environments.service';
import { NisqAnalyzerService } from '../nisq-analyzer/nisq-analyzer.service';
import { UtilService } from '../../../util/util.service';

@Component({
  selector: 'app-add-new-analysis-dialog',
  templateUrl: './add-new-analysis-dialog.component.html',
  styleUrls: ['./add-new-analysis-dialog.component.scss'],
})
export class AddNewAnalysisDialogComponent implements OnInit {
  addNewAnalysisForm: FormGroup;
  selectedVendors: string[] = [];
  cloudServices: CloudServiceDto[];
  parameters: ParameterDto[];
  selectedCompilers: string[] = [];

  ibmqEnabled = true;
  ionqEnabled = false;
  awsEnabled = false;
  shortWaitingTimeEnabled = true;
  stableExecutionResultsEnabled = true;
  predictionAlgorithmInDialog = 'extra_trees_regressor';
  metaOptimizerInDialog = 'none';
  advancedSettingsOpen: boolean;
  queueImportanceRatioDialog = 0;
  maxNumberOfCompiledCircuitsDialog = 6;
  disableDefiningMaximumNumberOfCircuits = false;

  mcdaMethodPredefinedPreferences = 'topsis';
  weightLearningMethodPredefinedPreferences = 'cobyla';

  constructor(
    public dialogRef: MatDialogRef<AddNewAnalysisDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private executionEnvironmentsService: ExecutionEnvironmentsService,
    private nisqAnalyzerService: NisqAnalyzerService,
    private utilService: UtilService
  ) {}

  get params(): AbstractControl | null {
    return this.addNewAnalysisForm.get('params');
  }

  get vendors(): FormArray | null {
    return this.addNewAnalysisForm.get('vendors') as FormArray;
  }

  get ibmqToken(): AbstractControl | null {
    return this.addNewAnalysisForm.get('ibmqToken');
  }

  get ionqToken(): AbstractControl | null {
    return this.addNewAnalysisForm.get('ionqToken');
  }

  get awsToken(): AbstractControl | null {
    return this.addNewAnalysisForm.get('awsToken');
  }

  get awsSecretToken(): AbstractControl | null {
    return this.addNewAnalysisForm.get('awsSecretToken');
  }

  get compilers(): FormArray {
    return this.addNewAnalysisForm.get('compilers') as FormArray;
  }

  get shortWaitingTime(): AbstractControl | null {
    return this.addNewAnalysisForm.get('shortWaitingTime');
  }

  get stableExecutionResults(): AbstractControl | null {
    return this.addNewAnalysisForm.get('stableExecutionResults');
  }

  get predictionAlgorithm(): AbstractControl | null {
    return this.addNewAnalysisForm.get('predictionAlgorithm');
  }

  get metaOptimizer(): AbstractControl | null {
    return this.addNewAnalysisForm.get('metaOptimizer');
  }

  get maxNumberOfCompiledCircuits(): AbstractControl | null {
    return this.addNewAnalysisForm.get('maxNumberOfCompiledCircuits');
  }

  get queueImportanceRatio(): AbstractControl | null {
    return this.addNewAnalysisForm.get('queueImportanceRatio');
  }

  get preferenceMcdaMethod(): AbstractControl | null {
    return this.addNewAnalysisForm.get('preferenceMcdaMethod');
  }

  get weightLearningMethod(): AbstractControl | null {
    return this.addNewAnalysisForm.get('weightLearningMethod');
  }

  ngOnInit(): void {
    this.executionEnvironmentsService
      .getCloudServices()
      .subscribe((value) => (this.cloudServices = value.content ?? []));
    this.nisqAnalyzerService.getParams(this.data.algo).subscribe((params) => {
      this.parameters = this.nisqAnalyzerService.collapseParams(
        params.filter((p) => p.name !== 'token')
      );
      this.addNewAnalysisForm = this.formBuilder.group({
        params: this.formBuilder.array(
          this.parameters.map((param) =>
            this.formBuilder.group({
              [param.name]: [''],
            })
          )
        ),
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
        preferenceMcdaMethod: new FormControl(this.data.mcdaMethod, [
          // eslint-disable-next-line @typescript-eslint/unbound-method
          Validators.required,
        ]),
        weightLearningMethod: new FormControl(this.data.weightLearningMethod, [
          // eslint-disable-next-line @typescript-eslint/unbound-method
          Validators.required,
        ]),
      });

      this.selectedVendors = ['ibmq'];
      for (const vendor of this.selectedVendors) {
        this.vendors.push(new FormControl(vendor));
      }
      this.setCompilerOptions(this.selectedVendors);
      this.predictionAlgorithm.setValue('extra_trees_regressor');
      this.metaOptimizer.setValue('none');
      this.maxNumberOfCompiledCircuits.setValue(6);
      this.stableExecutionResults.setValue(true);
      this.shortWaitingTime.setValue(true);

      this.preferenceMcdaMethod.setValue('topsis');
      this.weightLearningMethod.setValue('cobyla');

      this.dialogRef.beforeClosed().subscribe(() => {
        this.data.params = this.params.value;
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
        this.data.mcdaMethod = this.mcdaMethodPredefinedPreferences;
        this.data.weightLearningMethod = this.weightLearningMethodPredefinedPreferences;
      });
    });
  }

  patternForParam(param: ParameterDto): string {
    switch (param.type) {
      case 'Integer':
        return '[0-9]+';
      // https://stackoverflow.com/questions/12643009/regular-expression-for-floating-point-numbers
      case 'Float':
        return '[+-]?([0-9]*[.])?[0-9]+';
      default:
        return undefined;
    }
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

  setMcdaMethodPredefinedPreferences(selectedMcdaMethod: string): void {
    this.mcdaMethodPredefinedPreferences = selectedMcdaMethod;
  }

  setWeightLearningMethodPredefinedPreferences(
    selectedWeightLearningMethod: string
  ): void {
    this.weightLearningMethodPredefinedPreferences = selectedWeightLearningMethod;
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

export interface DialogData {
  title: string;
  params: string;
  algo: string;
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
  mcdaMethod: string;
  weightLearningMethod: string;
}
