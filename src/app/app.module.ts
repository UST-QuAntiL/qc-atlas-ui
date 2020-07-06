import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ApiModule } from 'api/api.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AddAlgorithmDialogComponent } from './components/algorithms/dialogs/add-algorithm-dialog.component';
import { JsonImportDialogComponent } from './components/dialogs/json-import-dialog.component';
import { MissingEntityDialogComponent } from './components/dialogs/missing-entity-dialog.component';
import { AlgorithmViewComponent } from './components/algorithms/algorithm-view/algorithm-view.component';
import { SoftwarePlatformViewComponent } from './components/software-platforms/software-platform-view/software-platform-view.component';
import { CloudServiceViewComponent } from './components/cloud-services/cloud-service-view/cloud-service-view.component';
import { PublicationViewComponent } from './components/publications/publication-view/publication-view.component';
import { DataListComponent } from './components/generics/data-list/data-list.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PublicationListComponent } from './components/publications/publication-list/publication-list.component';
import { AlgorithmListComponent } from './components/algorithms/algorithm-list/algorithm-list.component';
import { ChipCollectionComponent } from './components/generics/chip-collection/chip-collection.component';
import { NavigationBreadcrumbModule } from './components/generics/navigation-breadcrumb/navigation-breadcrumb.module';
import { ImplementationViewModule } from './components/algorithms/implementation-view/implementation-view.module';

@NgModule({
  declarations: [
    // components
    AppComponent,
    PageNotFoundComponent,
    // dialogs
    AddAlgorithmDialogComponent,
    JsonImportDialogComponent,
    MissingEntityDialogComponent,
    AlgorithmViewComponent,
    SoftwarePlatformViewComponent,
    CloudServiceViewComponent,
    PublicationViewComponent,
    DataListComponent,
    NavigationComponent,
    PublicationListComponent,
    AlgorithmListComponent,
    ChipCollectionComponent,
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ApiModule.forRoot({ rootUrl: environment.API_URL }),
    AppRoutingModule,
    // material modules
    MatToolbarModule,
    MatSidenavModule,
    MatTabsModule,
    MatCardModule,
    MatChipsModule,
    MatTableModule,
    MatIconModule,
    MatExpansionModule,
    MatGridListModule,
    MatListModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    // app modules
    NavigationBreadcrumbModule,
    ImplementationViewModule,
  ],
  entryComponents: [
    // dialogs need to be provided as entry component
    AddAlgorithmDialogComponent,
    JsonImportDialogComponent,
    MissingEntityDialogComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
