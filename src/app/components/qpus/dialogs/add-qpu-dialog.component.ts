import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-qpu-dialog-component',
  templateUrl: 'add-qpu-dialog.html',
})
export class AddQpuDialogComponent implements OnInit {
  qpuForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddQpuDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  get name() {
    return this.qpuForm.get('name');
  }

  get maxGateTime() {
    return this.qpuForm.get('maxGateTime');
  }

  get numberOfQubits() {
    return this.qpuForm.get('numberOfQubits');
  }

  get t1() {
    return this.qpuForm.get('t1');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.qpuForm = new FormGroup({
      name: new FormControl(this.data.name, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.maxLength(255),
      ]),
      maxGateTime: new FormControl(this.data.maxGateTime, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.pattern('[+-]?([0-9]*[.])?[0-9]+'),
      ]),
      numberOfQubits: new FormControl(this.data.numberOfQubits, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.pattern('[0-9]+'),
      ]),
      t1: new FormControl(this.data.t1, [
        // eslint-disable-next-line @typescript-eslint/unbound-method
        Validators.required,
        Validators.pattern('[+-]?([0-9]*[.])?[0-9]+'),
      ]),
    });

    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.name = this.qpuForm.get('name').value;
      this.data.maxGateTime = this.qpuForm.get('maxGateTime').value;
      this.data.numberOfQubits = this.qpuForm.get('numberOfQubits').value;
      this.data.t1 = this.qpuForm.get('t1').value;
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
      this.t1.errors?.pattern
    );
  }
}

export interface DialogData {
  title: string;
  name: string;
  maxGateTime: number;
  numberOfQubits: number;
  t1: number;
}
