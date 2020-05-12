import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Sdk } from "../../../model/sdk.model";

@Component({
  selector: "app-add-qpu-dialog-component",
  templateUrl: "add-qpu-dialog.html",
})
export class AddQpuDialogComponent implements OnInit {
  qpuForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddQpuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  get name() {
    return this.qpuForm.get("name");
  }

  get maxGateTime() {
    return this.qpuForm.get("maxGateTime");
  }

  get numberOfQubits() {
    return this.qpuForm.get("numberOfQubits");
  }

  get t1() {
    return this.qpuForm.get("t1");
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.data.supportedSdkIds = [];
    this.qpuForm = new FormGroup({
      name: new FormControl(this.data.name, [
        Validators.required,
        Validators.maxLength(255),
      ]),
      maxGateTime: new FormControl(this.data.maxGateTime, [
        Validators.required,
        Validators.pattern("[+-]?([0-9]*[.])?[0-9]+"),
      ]),
      numberOfQubits: new FormControl(this.data.numberOfQubits, [
        Validators.required,
        Validators.pattern("[0-9]+"),
      ]),
      t1: new FormControl(this.data.t1, [
        Validators.required,
        Validators.pattern("[+-]?([0-9]*[.])?[0-9]+"),
      ]),
    });

    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.name = this.qpuForm.get("name").value;
      this.data.maxGateTime = this.qpuForm.get("maxGateTime").value;
      this.data.numberOfQubits = this.qpuForm.get("numberOfQubits").value;
      this.data.t1 = this.qpuForm.get("t1").value;
    });
  }

  isRequiredDataMissing(): boolean {
    return (
      this.name.errors?.required ||
      this.numberOfQubits.errors?.required ||
      this.t1.errors?.required ||
      this.maxGateTime.errors?.required ||
      this.numberOfQubits.errors?.pattern ||
      this.maxGateTime.errors?.pattern ||
      this.t1.errors?.pattern ||
      this.data.supportedSdkIds.length === 0
    );
  }

  onSdkCheckboxChange(sdk: Sdk, event: any): void {
    event.checked
      ? this.addToSupportedSdkIds(sdk.id)
      : this.removeFromSupportedSdkIds(sdk.id);
  }

  private addToSupportedSdkIds(sdkId: number): void {
    this.data.supportedSdkIds.push(sdkId);
  }

  private removeFromSupportedSdkIds(sdkId: number): void {
    const indexToRemove = this.data.supportedSdkIds.findIndex(
      (entry) => entry === sdkId
    );
    this.data.supportedSdkIds.splice(indexToRemove, 1);
  }
}

export interface DialogData {
  title: string;
  name: string;
  maxGateTime: number;
  numberOfQubits: number;
  t1: number;
  supportedSdkIds: number[];
  sdks: Sdk[];
}
