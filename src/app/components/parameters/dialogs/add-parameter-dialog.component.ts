import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";

@Component({
  selector: "app-add-parameter-dialog-component",
  templateUrl: "add-parameter-dialog.html",
})
export class AddParameterDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddParameterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface DialogData {
  title: string;
  name: string;
  type: string;
  description: string;
  restriction: string;
}
