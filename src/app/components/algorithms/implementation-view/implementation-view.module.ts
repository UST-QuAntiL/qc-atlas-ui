import { NgModule } from '@angular/core';
import { ImplementationViewComponent } from './implementation-view.component';
import { BadgeModule, BreadcrumbModule, IconsModule } from 'angular-bootstrap-md';
import { MatChipsModule } from '@angular/material/chips';
import { AddAlgorithmDialogComponent } from '../dialogs/add-algorithm-dialog.component';
import { AddImplementationDialogComponent } from '../../implementations/dialogs/add-implementation-dialog.component';
import { MissingEntityDialogComponent } from '../../dialogs/missing-entity-dialog.component';
import { JsonImportDialogComponent } from '../../dialogs/json-import-dialog.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ImplementationViewComponent
  ],
  imports: [
    BreadcrumbModule,
    BadgeModule,
    IconsModule,
    MatChipsModule,
    MatTabsModule,
    MatIconModule,
    CommonModule
  ],
  entryComponents: [
    // dialogs need to be provided as entry component
    AddAlgorithmDialogComponent,
    AddImplementationDialogComponent,
    JsonImportDialogComponent,
    MissingEntityDialogComponent,
  ],
})
export class ImplementationViewModule {}
