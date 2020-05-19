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
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ApiModule } from 'api/api.module';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlgorithmsComponent } from './components/algorithms/algorithms.component';
import { ProvidersComponent } from './components/providers/providers.component';
import { TagsComponent } from './components/tags/tags.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddImplementationDialogComponent } from './components/implementations/dialogs/add-implementation-dialog.component';
import { AddQpuDialogComponent } from './components/qpus/dialogs/add-qpu-dialog.component';
import { AddTagDialogComponent } from './components/tags/dialogs/add-tag-dialog.component';
import { AddAlgorithmDialogComponent } from './components/algorithms/dialogs/add-algorithm-dialog.component';
import { AddProviderDialogComponent } from './components/providers/dialogs/add-provider-dialog.component';
import { JsonImportDialogComponent } from './components/dialogs/json-import-dialog.component';
import { QpusComponent } from './components/qpus/qpus.component';
import { MissingEntityDialogComponent } from './components/dialogs/missing-entity-dialog.component';
import { ImplementationsComponent } from './components/implementations/implementations.component';

@NgModule({
  declarations: [
    // components
    AppComponent,
    AlgorithmsComponent,
    ProvidersComponent,
    TagsComponent,
    PageNotFoundComponent,
    // dialogs
    AddTagDialogComponent,
    AddAlgorithmDialogComponent,
    AddProviderDialogComponent,
    AddImplementationDialogComponent,
    AddQpuDialogComponent,
    JsonImportDialogComponent,
    MissingEntityDialogComponent,
    QpusComponent,
    ImplementationsComponent,
  ],
  imports: [
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
    MatTableModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  entryComponents: [
    // dialogs need to be provided as entry component
    AddTagDialogComponent,
    AddAlgorithmDialogComponent,
    AddProviderDialogComponent,
    AddImplementationDialogComponent,
    AddQpuDialogComponent,
    JsonImportDialogComponent,
    MissingEntityDialogComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
