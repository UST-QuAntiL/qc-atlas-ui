import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-missing-entity-dialog-component",
  templateUrl: "missing-entity-dialog.html",
})
export class MissingEntityDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<MissingEntityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  goToMissingEntity(): void {
    this.router.navigate([this.data.missingEntity]);
    this.onNoClick();
  }
}

export interface DialogData {
  missingEntity: string;
  currentEntity: string;
}
