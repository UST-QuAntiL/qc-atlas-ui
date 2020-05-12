import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SdkService } from "../../services/sdk.service";
import { Sdk } from "../../model/sdk.model";
import { JsonImportDialogComponent } from "../dialogs/json-import-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import { AddSdkDialogComponent } from "./dialogs/add-sdk-dialog.component";
import { EntityCreator } from "../../util/entity.creator";
import { UtilService } from "../../util/util.service";

@Component({
  selector: "app-sdks",
  templateUrl: "./sdks.component.html",
  styleUrls: ["./sdks.component.scss"],
})
export class SdksComponent implements OnInit {
  sdks: Sdk[] = [];
  selectedSdk: Sdk;
  firstEntry = 0;
  currentEntity = "SDK";

  constructor(
    private router: Router,
    private sdkService: SdkService,
    public dialog: MatDialog,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.getAllSdks();
  }

  getAllSdks(): void {
    this.sdkService.getAllSdks().subscribe((sdkData) => {
      this.sdks = sdkData.sdkDtos;
      this.selectInitialSdk();
    });
  }

  makeSelectedSdk(sdk: Sdk): void {
    this.selectedSdk = sdk;
  }

  getColorOfSelectedSdk(id: number): string {
    return this.utilService.getColorOfSelectedButton(this.selectedSdk, id);
  }

  createSdkWithJson(): void {
    const dialogRef = this.utilService.createDialog(
      JsonImportDialogComponent,
      "JSON " + this.currentEntity
    );

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.sdkService
          .createSdkWithJson(dialogResult)
          .subscribe((sdkResult) => {
            this.handleSdkCreationResult(sdkResult);
          });
      }
    });
  }

  createSdk(): void {
    const dialogRef = this.utilService.createDialog(
      AddSdkDialogComponent,
      this.currentEntity
    );

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        const sdk: Sdk = EntityCreator.createSdkFromDialogResult(dialogResult);
        this.sdkService.createSdk(sdk).subscribe((sdkResult) => {
          this.handleSdkCreationResult(sdkResult);
        });
      }
    });
  }

  private selectInitialSdk(): void {
    if (this.isNoSdkSelected()) {
      this.makeSelectedSdk(this.sdks[this.firstEntry]);
    }
  }

  private isNoSdkSelected(): boolean {
    return !this.selectedSdk && this.sdks.length > 0;
  }

  private handleSdkCreationResult(sdkResult: Sdk): void {
    this.sdks.push(sdkResult);
    this.makeSelectedSdk(sdkResult);
    this.utilService.callSnackBar(this.currentEntity);
  }
}
