import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  AbstractControl,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ProviderService } from 'api-qprov/services/provider.service';
import { EntityModelProviderDto } from 'api-qprov/models/entity-model-provider-dto';

@Component({
  selector: 'app-implementation-execution-dialog',
  templateUrl: './implementation-execution-dialog.component.html',
  styleUrls: ['./implementation-execution-dialog.component.scss'],
})
export class ImplementationExecutionDialogComponent implements OnInit {
  implementationExecutionForm: UntypedFormGroup;
  provider?: EntityModelProviderDto;
  ready?: boolean;
  qpuArray: string[];
  isIbmqSelected = true;

  constructor(
    public dialogRef: MatDialogRef<ImplementationExecutionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialog: MatDialog,
    private providerService: ProviderService
  ) {}

  get vendor(): AbstractControl | null {
    return this.implementationExecutionForm.get('vendor');
  }

  get qpu(): AbstractControl | null {
    return this.implementationExecutionForm.get('qpu');
  }

  get token(): AbstractControl | null {
    return this.implementationExecutionForm.get('token');
  }

  ngOnInit(): void {
    this.implementationExecutionForm = new UntypedFormGroup({
      vendor: new UntypedFormControl(this.data.vendor, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
      ]),
      qpu: new UntypedFormControl(this.data.qpu, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.maxLength(255),
      ]),
      token: new UntypedFormControl(this.data.token),
    });

    this.vendor.setValue('IBMQ');
    this.onVendorChanged(this.vendor.value);

    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.vendor = this.vendor.value;
      this.data.qpu = this.qpu.value;
      this.data.token = this.token.value;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  isRequiredDataMissing(): boolean {
    return this.vendor.errors?.required;
    return this.qpu.errors?.required;
  }

  onVendorChanged(value: string): void {
    this.qpuArray = [];
    this.isIbmqSelected = true;
    if (value === 'IBMQ') {
      this.providerService.getProviders().subscribe((result) => {
        this.getProviderDtoByName(result);
        if (!this.provider) {
          console.error('Provider with given name not found!');
          this.ready = true;
          return;
        }
        this.providerService
          .getQpUs({ providerId: this.provider.id })
          .subscribe((qpuResult) => {
            this.getQpuArrayByProvider(qpuResult);
            if (this.qpuArray.length === 0) {
              console.error('QPUs not found!');
              this.ready = true;
              return;
            }
          });
      });
    } else {
      this.isIbmqSelected = false;
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

  getQpuArrayByProvider(result): void {
    if (result === null) {
      console.error('Error while loading QPUs!');
      return;
    }
    for (const qpuDto of result._embedded.qpuDtoes) {
      this.qpuArray.push(qpuDto.name);
    }
    return;
  }
}

export interface DialogData {
  title: string;
  vendor: string;
  qpu: string;
  token: string;
}
