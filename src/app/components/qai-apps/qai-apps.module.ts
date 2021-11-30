import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTreeModule } from '@angular/material/tree';
import { CardsModule } from 'angular-bootstrap-md';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { MatSortModule } from '@angular/material/sort';
import { MatBadgeModule } from '@angular/material/badge';
import { NavigationBreadcrumbModule } from '../generics/navigation-breadcrumb/navigation-breadcrumb.module';
import { GenericsModule } from '../generics/generics.module';
import { ComputeResourcePropertyModule } from '../compute-resource-property/compute-resource-property.module';
import { QcAtlasUiFeatureToggleModule } from '../../directives/feature-toggle.module';
import { AddAlgorithmDialogComponent } from './dialogs/add-algorithm-dialog.component';
import { QAIAppListComponent } from './algorithm-list/qai-app-list.component';

@NgModule({
  declarations: [QAIAppListComponent, AddAlgorithmDialogComponent],
  imports: [
    MatTabsModule,
    MatChipsModule,
    NavigationBreadcrumbModule,
    MatIconModule,
    MatCardModule,
    GenericsModule,
    MatFormFieldModule,
    MatListModule,
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatTreeModule,
    ComputeResourcePropertyModule,
    CardsModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatTableModule,
    BrowserModule,
    MatSortModule,
    QcAtlasUiFeatureToggleModule,
    MatBadgeModule,
  ],
  exports: [QAIAppListComponent, AddAlgorithmDialogComponent],
})
export class QAIAppModule {}
