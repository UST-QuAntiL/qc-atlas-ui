import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-add-tag-dialog-component",
  templateUrl: "add-tag-dialog.html",
})
export class AddTagDialogComponent implements OnInit {
  tagForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddTagDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  get key() {
    return this.tagForm.get("key");
  }

  get value() {
    return this.tagForm.get("value");
  }

  ngOnInit(): void {
    this.tagForm = new FormGroup({
      key: new FormControl(this.data.key, [
        Validators.required,
        Validators.maxLength(255),
      ]),
      value: new FormControl(this.data.value, [
        Validators.required,
        Validators.maxLength(255),
      ]),
    });

    this.dialogRef.beforeClosed().subscribe(() => {
      this.data.key = this.tagForm.get("key").value;
      this.data.value = this.tagForm.get("value").value;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface DialogData {
  title: string;
  key: string;
  value: string;
}
