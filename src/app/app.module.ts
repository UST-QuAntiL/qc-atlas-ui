import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiModule as AtlasAPIModule } from 'api-atlas/api.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatCardModule } from '@angular/material/card';
import { ApiModule as PatternAltasAPIModule } from 'api-patternpedia/api.module';
import { ApiModule as NisqApiModule } from 'api-nisq/api.module';
import { ApiModule as LatexRendererAPIModule } from 'api-latex/api.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { JsonImportDialogComponent } from './components/dialogs/json-import-dialog.component';
import { MissingEntityDialogComponent } from './components/dialogs/missing-entity-dialog.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NavigationBreadcrumbModule } from './components/generics/navigation-breadcrumb/navigation-breadcrumb.module';
import { AlgorithmModule } from './components/algorithms/algorithm.module';
import { ImplementationViewModule } from './components/algorithms/implementation-view/implementation-view.module';
import { GenericsModule } from './components/generics/generics.module';
import { UtilService } from './util/util.service';
import { ComputeResourcePropertyModule } from './components/compute-resource-property/compute-resource-property.module';
import { ExecutionEnvironmentsModule } from './components/execution-environments/execution-environments.module';
import { PublicationModule } from './components/publications/publication.module';
import { ServicesModule } from './services/services.module';
import { ChangePageGuard } from './services/deactivation-guard';
import { LinkItemListDialogComponent } from './components/generics/dialogs/link-item-list-dialog.component';
import { ProblemTypesListComponent } from './components/problem-types/problem-types-list/problem-types-list.component';
import { AddProblemTypeDialogComponent } from './components/problem-types/dialogs/add-problem-type/add-problem-type-dialog.component';
import { EditProblemTypeDialogComponent } from './components/problem-types/dialogs/edit-problem-type/edit-problem-type-dialog.component';
import { ApplicationAreasListComponent } from './components/application-areas/application-areas-list/application-areas-list.component';
import { AddApplicationAreaDialogComponent } from './components/application-areas/dialogs/add-application-area/add-application-area-dialog.component';
import { EditApplicationAreaDialogComponent } from './components/application-areas/dialogs/edit-application-area/edit-application-area-dialog.component';

@NgModule({
  declarations: [
    // components
    AppComponent,
    PageNotFoundComponent,
    ApplicationAreasListComponent,
    ProblemTypesListComponent,
    // dialogs
    JsonImportDialogComponent,
    MissingEntityDialogComponent,
    NavigationComponent,
    AddProblemTypeDialogComponent,
    EditProblemTypeDialogComponent,
    AddApplicationAreaDialogComponent,
    EditApplicationAreaDialogComponent,
    LinkItemListDialogComponent,
    ProblemTypesListComponent,
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AtlasAPIModule.forRoot({ rootUrl: environment.API_URL }),
    PatternAltasAPIModule.forRoot({
      rootUrl: environment.PATTERN_ATLAS_API_URL,
    }),
    NisqApiModule.forRoot({ rootUrl: environment.NISQ_API_URL }),
    LatexRendererAPIModule.forRoot({
      rootUrl: environment.LATEX_RENDERER_API_URL,
    }),
    AppRoutingModule,
    // material modules
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDialogModule,
    MatButtonModule,
    // app modules
    NavigationBreadcrumbModule,
    AlgorithmModule,
    PublicationModule,
    ImplementationViewModule,
    GenericsModule,
    ComputeResourcePropertyModule,
    ExecutionEnvironmentsModule,
    ServicesModule,
    MatCardModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatInputModule,
  ],
  bootstrap: [AppComponent],
  exports: [],
  providers: [UtilService, ChangePageGuard],
})
export class AppModule {}
