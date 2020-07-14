import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTreeModule } from '@angular/material/tree';
import { MatSortModule } from '@angular/material/sort';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from '../../app-routing.module';
import { GenericDataService } from '../../util/generic-data.service';
import { TextInputComponent } from './property-input/text-input.component';
import { SelectInputComponent } from './property-input/select-input.component';
import { CheckboxInputComponent } from './property-input/checkbox-input.component';
import { DataListComponent } from './data-list/data-list.component';
import { ChipCollectionComponent } from './chip-collection/chip-collection.component';
import { TreeOutputComponent } from './tree-output/tree-output.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    TextInputComponent,
    SelectInputComponent,
    CheckboxInputComponent,
    DataListComponent,
    ChipCollectionComponent,
    TreeOutputComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MDBBootstrapModule,
    MatInputModule,
    MatTabsModule,
    MatChipsModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTreeModule,
    MatSortModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  exports: [
    TextInputComponent,
    SelectInputComponent,
    CheckboxInputComponent,
    DataListComponent,
    ChipCollectionComponent,
    TreeOutputComponent,
    RouterModule,
    MatSortModule,
    ConfirmDialogComponent,
  ],
  providers: [GenericDataService],
})
export class GenericsModule {}
