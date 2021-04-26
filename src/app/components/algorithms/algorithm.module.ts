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
import { NisqAnalyzerModule } from './nisq-analyzer/nisq-analyzer.module';
import { AlgorithmListComponent } from './algorithm-list/algorithm-list.component';
import { AlgorithmViewComponent } from './algorithm-view/algorithm-view.component';
import { AlgorithmImplementationsListComponent } from './algorithm-implementations-list/algorithm-implementations-list.component';
import { AlgorithmRelatedAlgosListComponent } from './algorithm-related-algos-list/algorithm-related-algos-list.component';
import { AlgorithmPropertiesComponent } from './algorithm-properties/algorithm-properties.component';
import { AlgorithmPublicationsListComponent } from './algorithm-publications-list/algorithm-publications-list.component';
import { AddAlgorithmDialogComponent } from './dialogs/add-algorithm-dialog.component';
import { CreateImplementationDialogComponent } from './dialogs/create-implementation-dialog.component';
import { ProblemTypeTreeComponent } from './problem-type-tree/problem-type-tree.component';
import { AlgorithmRelatedPatternsComponent } from './algorithm-related-patterns/algorithm-related-patterns.component';
import { AddPatternRelationDialogComponent } from './dialogs/add-pattern-relation-dialog.component';
import { AddAlgorithmRelationDialogComponent } from './dialogs/add-algorithm-relation-dialog.component';
import { ImplementationPropertiesComponent } from './implementation-properties/implementation-properties.component';
import { NisqAnalyzerResultsComponent } from './nisq-analyzer-results/nisq-analyzer-results.component';
import { AddNewAnalysisDialogComponent } from './dialogs/add-new-analysis-dialog.component';

@NgModule({
  declarations: [
    AlgorithmListComponent,
    AlgorithmViewComponent,
    AlgorithmPropertiesComponent,
    AlgorithmImplementationsListComponent,
    AlgorithmRelatedAlgosListComponent,
    AlgorithmPublicationsListComponent,
    ProblemTypeTreeComponent,
    AddAlgorithmDialogComponent,
    CreateImplementationDialogComponent,
    AlgorithmRelatedPatternsComponent,
    AddPatternRelationDialogComponent,
    AddAlgorithmRelationDialogComponent,
    ImplementationPropertiesComponent,
    NisqAnalyzerResultsComponent,
    AddNewAnalysisDialogComponent,
  ],
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
    NisqAnalyzerModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatTableModule,
    BrowserModule,
    MatSortModule,
    QcAtlasUiFeatureToggleModule,
    MatBadgeModule,
  ],
  exports: [
    AlgorithmListComponent,
    AlgorithmViewComponent,
    AlgorithmPropertiesComponent,
    AlgorithmImplementationsListComponent,
    AlgorithmRelatedAlgosListComponent,
    AlgorithmPublicationsListComponent,
    ProblemTypeTreeComponent,
    AddAlgorithmDialogComponent,
    CreateImplementationDialogComponent,
    AddPatternRelationDialogComponent,
    AddAlgorithmRelationDialogComponent,
    ImplementationPropertiesComponent,
  ],
})
export class AlgorithmModule {}
