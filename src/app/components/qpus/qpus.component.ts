import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Qpu } from '../../model/qpu.model';
import { JsonImportDialogComponent } from '../dialogs/json-import-dialog.component';
import { QpuService } from '../../services/qpu.service';
import { Provider } from '../../model/provider.model';
import { EntityCreator } from '../../util/entity.creator';
import { UtilService } from '../../util/util.service';
import { AddQpuDialogComponent } from './dialogs/add-qpu-dialog.component';

@Component({
  selector: 'app-qpus',
  templateUrl: './qpus.component.html',
  styleUrls: ['./qpus.component.scss'],
})
export class QpusComponent implements OnInit, OnChanges {
  @Input() selectedProvider: Provider;

  qpus: Qpu[] = [];
  currentEntity = 'QPU';
  sdkEntity = 'SDKs';

  displayedQpuColumns: string[] = [
    'name',
    'id',
    'maxGateTime',
    'numberOfQubits',
    't1',
    'supportedSdkIds',
  ];

  constructor(
    private qpuService: QpuService,
    private utilService: UtilService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getQpuForProvider(this.selectedProvider.id);
  }

  getQpuForProvider(providerId: number): void {
    this.qpuService.getQpusForProvider(providerId).subscribe((data) => {
      this.qpus = data.qpuDtoList;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('selectedProvider' in changes) {
      this.selectedProvider = changes.selectedProvider.currentValue;
      this.getQpuForProvider(this.selectedProvider.id);
    }
  }

  createQpuWithJson(): void {
    const dialogRef = this.utilService.createDialog(
      JsonImportDialogComponent,
      'JSON ' + this.currentEntity
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
    const dialogRef = this.utilService.createDialog(
      AddQpuDialogComponent,
      this.currentEntity
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

  private handleQpuCreationResult(): void {
    this.getQpuForProvider(this.selectedProvider.id);
    this.utilService.callSnackBar(this.currentEntity);
  }
}
