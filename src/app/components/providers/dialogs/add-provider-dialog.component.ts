import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-add-provider-dialog-component",
  templateUrl: "add-provider-dialog.html",
})
export class AddProviderDialogComponent implements OnInit {
  providerForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddProviderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  get name() {
    return this.providerForm.get("name");
  }

  get accessKey() {
    return this.providerForm.get("accessKey");
  }

  get secretKey() {
    return this.providerForm.get("secretKey");
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  isRequiredDataMissing(): boolean {
    return (
      this.name.errors?.required ||
      this.accessKey.errors?.required ||
      this.secretKey.errors?.required
    );
  }

  ngOnInit(): void {
    this.providerForm = new FormGroup({
      name: new FormControl(this.data.name, [
        Validators.required,
        Validators.maxLength(255),
      ]),
      accessKey: new FormControl(this.data.accessKey, [
        Validators.required,
        Validators.maxLength(255),
      ]),
      secretKey: new FormControl(this.data.secretKey, [
        Validators.required,
        Validators.maxLength(255),
      ]),
    });

    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.name = this.providerForm.get("name").value;
      this.data.accessKey = this.providerForm.get("accessKey").value;
      this.data.secretKey = this.providerForm.get("secretKey").value;
    });
  }
}

export interface DialogData {
  title: string;
  name: string;
  accessKey: string;
  secretKey: string;
}
