import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { GenericsModule } from '../generics/generics.module';
import { NavigationBreadcrumbModule } from '../generics/navigation-breadcrumb/navigation-breadcrumb.module';
import { PatternListComponent } from './pattern-list/pattern-list.component';
import { PatternViewComponent } from './pattern-view/pattern-view.component';
import { PatternPropertiesComponent } from './pattern-properties/pattern-properties.component';
import { PatternConcreteSolutionListComponent } from './pattern-concrete-solutions-list/pattern-concrete-solutions-list.component';
import { CreateConcreteSolutionDialogComponent } from './dialogs/create-concrete-solution-dialog.component';
import { ConcreteSolutionViewComponent } from './concrete-solution-view/concrete-solution-view.component';
import { AddFileDialogComponent } from './dialogs/add-file-dialog.component';

@NgModule({
  declarations: [
    PatternListComponent,
    PatternViewComponent,
    PatternPropertiesComponent,
    CreateConcreteSolutionDialogComponent,
    PatternConcreteSolutionListComponent,
    ConcreteSolutionViewComponent,
    AddFileDialogComponent,
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    GenericsModule,
    MatIconModule,
    MatChipsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NavigationBreadcrumbModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    PatternListComponent,
    PatternViewComponent,
    PatternConcreteSolutionListComponent,
    CreateConcreteSolutionDialogComponent,
    ConcreteSolutionViewComponent,
    AddFileDialogComponent,
  ],
})
export class PatternModule {}
