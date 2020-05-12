import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-add-sdk-dialog-component",
  templateUrl: "add-sdk-dialog.html",
})
export class AddSdkDialogComponent implements OnInit {
  sdkForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddSdkDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  get name() {
    return this.sdkForm.get("name");
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.sdkForm = new FormGroup({
      name: new FormControl(this.data.name, [
        Validators.required,
        Validators.maxLength(255),
      ]),
    });

    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.name = this.sdkForm.get("name").value;
    });
  }

  isRequiredDataMissing(): boolean {
    return this.name.errors?.required;
  }
}

export interface DialogData {
  title: string;
  name: string;
}
