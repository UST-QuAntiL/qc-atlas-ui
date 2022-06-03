import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ApiModule as AtlasAPIModule } from 'api-atlas/api.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatCardModule } from '@angular/material/card';
import { ApiModule as PatternAltasAPIModule } from 'api-patternatlas/api.module';
import { ApiModule as NisqApiModule } from 'api-nisq/api.module';
import { ApiModule as LatexRendererAPIModule } from 'api-latex/api.module';
import { ApiModule as QProvAPIModule } from 'api-qprov/api.module';
import { ApiModule as LibraryAPIModule } from 'api-library/api.module';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
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
import { AddOrEditProblemTypeDialogComponent } from './components/problem-types/dialogs/add-or-edit-problem-type/add-or-edit-problem-type-dialog.component';
import { ApplicationAreasListComponent } from './components/application-areas/application-areas-list/application-areas-list.component';
// eslint-disable-next-line max-len
import { AddOrEditApplicationAreaDialogComponent } from './components/application-areas/dialogs/add-or-edit-application-area/add-or-edit-application-area-dialog.component';
// eslint-disable-next-line max-len
import { AddOrEditAlgorithmRelationTypeDialogComponent } from './components/algorithm-relation-types/dialogs/add-or-edit-algorithm-relation-type-dialog/add-or-edit-algorithm-relation-type-dialog.component';
// eslint-disable-next-line max-len
import { AlgorithmRelationTypesListComponent } from './components/algorithm-relation-types/algorithm-relation-types-list/algorithm-relation-types-list.component';
import { PatternRelationTypesListComponent } from './components/pattern-relation-types/pattern-relation-types-list/pattern-relation-types-list.component';
// eslint-disable-next-line max-len
import { AddOrEditPatternRelationTypeDialogComponent } from './components/pattern-relation-types/dialogs/add-or-edit-pattern-relation-type-dialog/add-or-edit-pattern-relation-type-dialog.component';
// eslint-disable-next-line max-len
import { ComputeResourcePropertyTypesListComponent } from './components/compute-resource-property-types/compute-resource-property-types-list/compute-resource-property-types-list.component';
// eslint-disable-next-line max-len
import { AddOrEditComputeResourcePropertyTypeDialogComponent } from './components/compute-resource-property-types/dialogs/add-or-edit-compute-resource-property-type-dialog/add-or-edit-compute-resource-property-type-dialog.component';
import { QcAtlasUiFeatureToggleModule } from './directives/feature-toggle.module';
import { FeatureTogglingComponent } from './components/feature-toggling/feature-toggling.component';
import { AuthInterceptor } from './http-interceptors/auth-interceptor';
import { initializeKeycloak } from './util/keycloak-init';
import { QAIAppModule } from './components/qai-apps/qai-apps.module';
import { LibraryViewComponent } from './components/libraries/library-view/library-view.component';
import { AddBibentryDialogComponent } from './components/libraries/dialogs/add-bibentry-dialog/add-bibentry-dialog.component';
import { AddLibraryDialogComponent } from './components/libraries/dialogs/add-library-dialog/add-library-dialog.component';
import { SlrViewComponent } from './components/libraries/slr-view/slr-view.component';
import { AddSlrDialogComponent } from './components/libraries/dialogs/add-slr-dialog/add-slr-dialog.component';
import { SlrPropertiesComponent } from './components/libraries/slr-properties/slr-properties.component';
import { LibraryTableComponent } from './components/libraries/library-table/library-table.component';

@NgModule({
  declarations: [
    // components
    AppComponent,
    PageNotFoundComponent,
    // dialogs
    JsonImportDialogComponent,
    MissingEntityDialogComponent,
    NavigationComponent,
    AddOrEditProblemTypeDialogComponent,
    AddOrEditApplicationAreaDialogComponent,
    AddOrEditAlgorithmRelationTypeDialogComponent,
    LinkItemListDialogComponent,
    ProblemTypesListComponent,
    AlgorithmRelationTypesListComponent,
    ApplicationAreasListComponent,
    PatternRelationTypesListComponent,
    AddOrEditPatternRelationTypeDialogComponent,
    ComputeResourcePropertyTypesListComponent,
    AddOrEditComputeResourcePropertyTypeDialogComponent,
    FeatureTogglingComponent,
    LibraryViewComponent,
    AddBibentryDialogComponent,
    AddLibraryDialogComponent,
    SlrViewComponent,
    AddSlrDialogComponent,
    SlrPropertiesComponent,
    LibraryTableComponent,
  ],
  imports: [
    MDBBootstrapModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    KeycloakAngularModule,
    AtlasAPIModule.forRoot({ rootUrl: environment.API_URL }),
    PatternAltasAPIModule.forRoot({
      rootUrl: environment.PATTERN_ATLAS_API_URL,
    }),
    NisqApiModule.forRoot({ rootUrl: environment.NISQ_API_URL }),
    LatexRendererAPIModule.forRoot({
      rootUrl: environment.LATEX_RENDERER_API_URL,
    }),
    QProvAPIModule.forRoot({
      rootUrl: environment.QPROV_API_URL,
    }),
    LibraryAPIModule.forRoot({
      rootUrl: environment.LIBRARY_API_URL,
    }),
    AppRoutingModule,
    QcAtlasUiFeatureToggleModule,
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
    QAIAppModule,
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
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatCheckboxModule,
    MatTabsModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    UtilService,
    ChangePageGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
})
export class AppModule {}
