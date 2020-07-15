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
import { MatTreeModule } from '@angular/material/tree';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { JsonImportDialogComponent } from './components/dialogs/json-import-dialog.component';
import { MissingEntityDialogComponent } from './components/dialogs/missing-entity-dialog.component';
import { SoftwarePlatformViewComponent } from './components/software-platforms/software-platform-view/software-platform-view.component';
import { CloudServiceViewComponent } from './components/cloud-services/cloud-service-view/cloud-service-view.component';
import { PublicationViewComponent } from './components/publications/publication-view/publication-view.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PublicationListComponent } from './components/publications/publication-list/publication-list.component';
import { NavigationBreadcrumbModule } from './components/generics/navigation-breadcrumb/navigation-breadcrumb.module';
import { AlgorithmModule } from './components/algorithms/algorithm.module';
import { ImplementationViewModule } from './components/algorithms/implementation-view/implementation-view.module';
import { GenericsModule } from './components/generics/generics.module';
import { UtilService } from './util/util.service';
import { ComputingResourcePropertyModule } from './components/computation-resource-property/computing-resource-property.module';

@NgModule({
  declarations: [
    // components
    AppComponent,
    PageNotFoundComponent,
    // dialogs
    JsonImportDialogComponent,
    MissingEntityDialogComponent,
    SoftwarePlatformViewComponent,
    CloudServiceViewComponent,
    PublicationViewComponent,
    NavigationComponent,
    PublicationListComponent,
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
    MatChipsModule,
    MatTreeModule,
    // app modules
    NavigationBreadcrumbModule,
    AlgorithmModule,
    ImplementationViewModule,
    GenericsModule,
    ComputingResourcePropertyModule,
  ],
  bootstrap: [AppComponent],
  exports: [],
  providers: [UtilService],
})
export class AppModule {}
