import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
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
  qpuSelectionFrom: FormGroup;
  provider?: EntityModelProviderDto;
  ready?: boolean;
  isIbmqSelected = true;
  isSimulatorAllowed = false;
  selectedCompilers: string[] = [];

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

  get simulatorAllowed(): AbstractControl | null {
    return this.qpuSelectionFrom.get('simulatorAllowed');
  }

  get token(): AbstractControl | null {
    return this.qpuSelectionFrom.get('token');
  }

  get compilers(): FormArray {
    return this.qpuSelectionFrom.get('compilers') as FormArray;
  }

  ngOnInit(): void {
    this.qpuSelectionFrom = new FormGroup({
      vendor: new FormControl(this.data.vendor, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
      ]),
      simulatorAllowed: new FormControl(this.data.simulatorAllowed, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
      ]),
      token: new FormControl(this.data.token, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.maxLength(255),
      ]),
      compilers: new FormArray([]),
    });

    this.vendor.setValue('IBMQ');
    this.onVendorChanged(this.vendor.value);
    this.simulatorAllowed.setValue(false);
    this.setCompilerOptions(this.vendor.value);

    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.vendor = this.vendor.value;
      this.data.simulatorAllowed = this.simulatorAllowed.value;
      this.data.token = this.token.value;
      this.data.selectedCompilers = this.selectedCompilers;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  isRequiredDataMissing(): boolean {
    return this.vendor.errors?.required;
    return this.token.errors?.required;
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

  setSimulatorAllowed(allowed: boolean): void {
    this.isSimulatorAllowed = allowed;
    this.simulatorAllowed.setValue(this.isSimulatorAllowed);
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
          this.compilers.push(new FormControl(compiler));
        }
      });
  }
}

interface DialogData {
  title: string;
  vendor: string;
  simulatorAllowed: boolean;
  token: string;
  selectedCompilers: string[];
}
