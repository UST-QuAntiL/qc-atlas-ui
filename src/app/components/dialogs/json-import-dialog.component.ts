import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";

@Component({
  selector: "app-json-import-dialog-component",
  templateUrl: "json-import-dialog.html",
})
export class JsonImportDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<JsonImportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface DialogData {
  title: string;
  json: string;
}
