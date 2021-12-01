import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import {
  BadgeModule,
  BreadcrumbModule,
  CardsModule,
  IconsModule,
} from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';
import { MatStepperModule } from '@angular/material/stepper';
import { ComputeResourcePropertyModule } from '../../compute-resource-property/compute-resource-property.module';
import { NavigationBreadcrumbModule } from '../../generics/navigation-breadcrumb/navigation-breadcrumb.module';
import { GenericsModule } from '../../generics/generics.module';
import { ImplSelectionCriteriaComponent } from '../impl-selection-criteria/impl-selection-criteria.component';
import { AlgorithmModule } from '../algorithm.module';
import { QcAtlasUiFeatureToggleModule } from '../../../directives/feature-toggle.module';
import { ImplementationViewComponent } from './implementation-view.component';
import { ImplementationPublicationsListComponent } from './implementation-publications-list/implementation-publications-list.component';
import { ImplementationSoftwareplatformListComponent } from './implementation-softwareplatform-list/implementation-softwareplatform-list.component';
import { ImplementationExecutionComponent } from './implementation-execution/implementation-execution.component';
import { ImplementationExecutionDialogComponent } from './dialogs/implementation-execution-dialog/implementation-execution-dialog.component';
// eslint-disable-next-line max-len
import { ImplementationNisqAnalyzerQpuSelectionComponent } from './implementation-nisq-analyzer-qpu-selection/implementation-nisq-analyzer-qpu-selection.component';
// eslint-disable-next-line max-len
import { ImplementationNisqAnalyzerQpuSelectionDialogComponent } from './dialogs/implementation-nisq-analyzer-qpu-selection-dialog/implementation-nisq-analyzer-qpu-selection-dialog.component';
// eslint-disable-next-line max-len
import { ImplementationNisqAnalyzerQpuSelectionPrioritizationDialogComponent } from './dialogs/implementation-nisq-analyzer-qpu-selection-prioritization-dialog/implementation-nisq-analyzer-qpu-selection-prioritization-dialog.component';

@NgModule({
  declarations: [
    ImplementationViewComponent,
    ImplementationPublicationsListComponent,
    ImplSelectionCriteriaComponent,
    ImplementationSoftwareplatformListComponent,
    ImplementationExecutionComponent,
    ImplementationExecutionDialogComponent,
    ImplementationNisqAnalyzerQpuSelectionComponent,
    ImplementationNisqAnalyzerQpuSelectionDialogComponent,
    ImplementationNisqAnalyzerQpuSelectionPrioritizationDialogComponent,
  ],
  imports: [
    CommonModule,
    BreadcrumbModule,
    BadgeModule,
    IconsModule,
    MatChipsModule,
    MatTabsModule,
    MatIconModule,
    CommonModule,
    NavigationBreadcrumbModule,
    GenericsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    ComputeResourcePropertyModule,
    MatCardModule,
    CardsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    AlgorithmModule,
    MatTableModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    QcAtlasUiFeatureToggleModule,
    MatBadgeModule,
    MatStepperModule,
  ],
})
export class ImplementationViewModule {}
