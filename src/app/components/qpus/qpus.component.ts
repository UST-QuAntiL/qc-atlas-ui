import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { AddQpuDialogComponent } from "./dialogs/add-qpu-dialog.component";
import { Qpu, QpuDtoList } from "../../model/qpu.model";
import { JsonImportDialogComponent } from "../dialogs/json-import-dialog.component";
import { QpuService } from "../../services/qpu.service";
import { Provider } from "../../model/provider.model";
import { MatDialog } from "@angular/material/dialog";
import { Sdk } from "../../model/sdk.model";
import { SdkService } from "../../services/sdk.service";
import { EntityCreator } from "../../util/entity.creator";
import { UtilService } from "../../util/util.service";

@Component({
  selector: "app-qpus",
  templateUrl: "./qpus.component.html",
  styleUrls: ["./qpus.component.scss"],
})
export class QpusComponent implements OnInit, OnChanges {
  qpus: Qpu[] = [];
  sdks: Sdk[] = [];
  currentEntity = "QPU";
  sdkEntity = "SDKs";
  @Input() selectedProvider: Provider;

  displayedQpuColumns: string[] = [
    "name",
    "id",
    "maxGateTime",
    "numberOfQubits",
    "t1",
    "supportedSdkIds",
  ];

  constructor(
    private qpuService: QpuService,
    private utilService: UtilService,
    public dialog: MatDialog,
    private sdkService: SdkService
  ) {}

  ngOnInit(): void {
    this.getQpuForProvider(this.selectedProvider.id);
    this.getAllSdks();
  }

  getQpuForProvider(providerId: number): void {
    this.qpuService.getQpusForProvider(providerId).subscribe((data) => {
      this.handleQpuResult(data);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ("selectedProvider" in changes) {
      this.selectedProvider = changes.selectedProvider.currentValue;
      this.getQpuForProvider(this.selectedProvider.id);
    }
  }

  getAllSdks(): void {
    this.sdkService.getAllSdks().subscribe((sdks) => {
      this.sdks = sdks.sdkDtos;
    });
  }

  getSupportedSdksForQpus(): void {
    for (const qpu of this.qpus) {
      for (const linkKey of this.getLinkKeysAsArray(qpu)) {
        if (this.isSupportedSdkLinkExisting(linkKey)) {
          this.handleSupportedSdkLink(qpu, qpu._links[linkKey].href);
        }
      }
    }
  }

  createQpuWithJson(): void {
    this.checkIfSdksExist();
    const dialogRef = this.utilService.createDialog(
      JsonImportDialogComponent,
      "JSON " + this.currentEntity
    );

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.qpuService
          .createQpuWithJson(this.selectedProvider.id, dialogResult)
          .subscribe(() => {
            this.handleQpuCreationResult();
          });
      }
    });
  }

  createQpu(): void {
    this.checkIfSdksExist();
    const dialogRef = this.utilService.createDialog(
      AddQpuDialogComponent,
      this.currentEntity,
      this.sdks
    );

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        const qpu: Qpu = EntityCreator.createQpuFromDialogResult(dialogResult);
        this.qpuService
          .createQpu(this.selectedProvider.id, qpu)
          .subscribe(() => {
            this.handleQpuCreationResult();
          });
      }
    });
  }

  private checkIfSdksExist(): void {
    if (!this.isSdksExisting()) {
      this.utilService.createMissingEntityDialog(
        this.sdkEntity,
        this.currentEntity
      );
      return;
    }
  }

  private handleQpuCreationResult(): void {
    this.getQpuForProvider(this.selectedProvider.id);
    this.utilService.callSnackBar(this.currentEntity);
  }

  private isSupportedSdkLinkExisting(linkKey: string): boolean {
    return linkKey.includes("supportedSdk");
  }

  private handleSupportedSdkLink(qpu: Qpu, hrefToSupportedSdk: string): void {
    this.sdkService.getSdkByHref(hrefToSupportedSdk).subscribe((sdk) => {
      EntityCreator.createSupportedSdkIdsIfNotExist(qpu);
      qpu.supportedSdkIds.push(sdk.id);
    });
  }

  private getLinkKeysAsArray(qpu: Qpu) {
    return Object.keys(qpu._links);
  }

  private handleQpuResult(data: QpuDtoList): void {
    this.qpus = data.qpuDtoList;
    this.getSupportedSdksForQpus();
  }

  private isSdksExisting(): boolean {
    return this.sdks.length > 0;
  }
}
