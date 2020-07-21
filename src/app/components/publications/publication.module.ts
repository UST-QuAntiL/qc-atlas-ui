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
import { GenericsModule } from '../generics/generics.module';
import { NavigationBreadcrumbModule } from '../generics/navigation-breadcrumb/navigation-breadcrumb.module';
import { AddPublicationDialogComponent } from './dialogs/add-publication-dialog.component';
import { PublicationListComponent } from './publication-list/publication-list.component';
import { PublicationViewComponent } from './publication-view/publication-view.component';
import { PublicationPropertiesComponent } from './publication-properties/publication-properties.component';
import { PublicationAlgorithmsListComponent } from './publication-algorithms-list/publication-algorithms-list.component';
import { PublicationImplementationsListComponent } from './publication-implementations-list/publication-implementations-list.component';

@NgModule({
  declarations: [
    AddPublicationDialogComponent,
    PublicationListComponent,
    PublicationViewComponent,
    PublicationPropertiesComponent,
    PublicationAlgorithmsListComponent,
    PublicationImplementationsListComponent,
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    CommonModule,
    MatDialogModule,
    GenericsModule,
    MatIconModule,
    MatChipsModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NavigationBreadcrumbModule,
    MatTabsModule,
    MatAutocompleteModule,
  ],
  exports: [
    AddPublicationDialogComponent,
    PublicationListComponent,
    PublicationViewComponent,
  ],
})
export class PublicationModule {}
