import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProviderDto } from 'api/models';
import { ProviderService } from 'api/services/provider.service';
import { JsonImportDialogComponent } from '../dialogs/json-import-dialog.component';
import { UtilService } from '../../util/util.service';
import { AddProviderDialogComponent } from './dialogs/add-provider-dialog.component';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss'],
})
export class ProvidersComponent implements OnInit {
  providers: ProviderDto[] = [];
  selectedProvider: ProviderDto;
  currentEntity = 'Provider';

  constructor(
    private router: Router,
    private providerService: ProviderService,
    public dialog: MatDialog,
    private utilService: UtilService
  ) {}

  ngOnInit(): void {
    this.getAllProviders();
  }

  getSelectedProviderColor(id: string): string {
    return this.utilService.getColorOfSelectedButton(this.selectedProvider, id);
  }

  makeSelectedProvider(provider: ProviderDto): void {
    this.selectedProvider = provider;
  }

  createProviderWithJson(): void {
    const dialogRef = this.utilService.createDialog(
      JsonImportDialogComponent,
      'JSON ' + this.currentEntity
    );

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        this.providerService
          .createProvider({ body: JSON.parse(dialogResult) })
          .subscribe((providerResult) => {
            this.processProviderResult(providerResult);
          });
      }
    });
  }

  createProvider(): void {
    const dialogRef = this.utilService.createDialog(
      AddProviderDialogComponent,
      this.currentEntity
    );

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult) {
        const provider: ProviderDto = {
          name: dialogResult.name,
          accessKey: dialogResult.accessKey,
          secretKey: dialogResult.secretKey,
        };
        this.providerService
          .createProvider({ body: provider })
          .subscribe((providerResult) => {
            this.processProviderResult(providerResult);
          });
      }
    });
  }

  private getAllProviders(): void {
    this.providerService.getProviders().subscribe((providers) => {
      this.providers = providers._embedded.providerDtoes;
      this.selectInitialProvider();
    });
  }

  private selectInitialProvider(): void {
    if (!this.selectedProvider && this.providers.length > 0) {
      this.makeSelectedProvider(this.providers[0]);
    }
  }

  private processProviderResult(providerResult: ProviderDto): void {
    this.providers.push(providerResult);
    this.selectedProvider = providerResult;
    this.utilService.callSnackBar(this.currentEntity);
  }
}
