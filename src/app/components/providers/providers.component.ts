import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Provider } from '../../model/provider.model';
import { ProviderService } from '../../services/provider.service';
import { JsonImportDialogComponent } from '../dialogs/json-import-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AddProviderDialogComponent } from './dialogs/add-provider-dialog.component';
import { Util } from '../../util/Util';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-providers',
  templateUrl: './providers.component.html',
  styleUrls: ['./providers.component.scss']
})
export class ProvidersComponent implements OnInit {

  providers: Provider[] = [];
  selectedProvider: Provider;

  isSelectedColor = 'primary';


  constructor(private router: Router, private providerService: ProviderService,
              public dialog: MatDialog, private snackbarService: SnackbarService) {
  }

  ngOnInit(): void {
    this.getAllProviders();
  }

  getColorOfProviderButton(id: number): string {
    if (!this.selectedProvider) {
      return null;
    }
    if (id === this.selectedProvider.id) {
      return this.isSelectedColor;
    }
  }

  makeSelectedProvider(provider: Provider): void {
    this.selectedProvider = provider;
  }

  createProviderWithJson(): void {
    const dialogRef = this.dialog.open(JsonImportDialogComponent, {
      width: '400px',
      data: {title: 'Import new Provider'}
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        this.providerService.createProviderWithJson(dialogResult).subscribe(
          providerResult => {
            this.processProviderResult(providerResult);
          }
        );
      }
    });
  }

  createProvider(): void {
    const dialogRef = this.dialog.open(AddProviderDialogComponent, {
      width: '400px',
      data: {title: 'Add new Provider'}
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult) {
        const provider: Provider = Util.createProviderFromDialogResult(dialogResult);
        this.providerService.createProvider(provider).subscribe(
          providerResult => {
            this.processProviderResult(providerResult);
          }
        );
      }
    });
  }

  private getAllProviders(): void {
    this.providerService.getAllProviders().subscribe(
      providers => {
        this.providers = providers.providerDtoList;
        this.selectInitialProvider();
      }
    );
  }

  private selectInitialProvider() {
    if (!this.selectedProvider && this.providers.length > 0) {
      this.makeSelectedProvider(this.providers[0]);
    }
  }

  private processProviderResult(providerResult: Provider): void {
    this.providers.push(providerResult);
    this.selectedProvider = providerResult;
    this.snackbarService.callSnackBar('Provider');
  }
}