import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProviderDto, QpuDto } from 'api/models';
import { QpuService } from 'api/services/qpu.service';
import { JsonImportDialogComponent } from '../dialogs/json-import-dialog.component';
import { UtilService } from '../../util/util.service';
import { AddQpuDialogComponent } from './dialogs/add-qpu-dialog.component';

@Component({
  selector: 'app-qpus',
  templateUrl: './qpus.component.html',
  styleUrls: ['./qpus.component.scss'],
})
export class QpusComponent implements OnInit, OnChanges {
  @Input() selectedProvider: ProviderDto;

  qpus: QpuDto[] = [];
  currentEntity = 'QPU';

  displayedQpuColumns: string[] = [
    'name',
    'id',
    'maxGateTime',
    'numberOfQubits',
    't1',
  ];

  constructor(
    private qpuService: QpuService,
    private utilService: UtilService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getQpuForProvider(this.selectedProvider.id);
  }

  getQpuForProvider(providerId: string): void {
    this.qpuService.getQpus({ providerId }).subscribe((data) => {
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
          .createQpu({
            providerId: this.selectedProvider.id,
            body: JSON.parse(dialogResult),
          })
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
        const qpu: QpuDto = {
          maxGateTime: dialogResult.maxGateTime,
          name: dialogResult.name,
          numberOfQubits: dialogResult.numberOfQubits,
          t1: dialogResult.t1,
        };
        this.qpuService
          .createQpu({ providerId: this.selectedProvider.id, body: qpu })
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
