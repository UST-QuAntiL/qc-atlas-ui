import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GenericsModule } from '../generics/generics.module';
import { EditComputeResourcePropertyDialogComponent } from './dialogs/edit-compute-resource-property-dialog.component';
import { ComputationResourcePropertyListComponent } from './computation-resource-property-list/computation-resource-property-list.component';

@NgModule({
  declarations: [
    ComputationResourcePropertyListComponent,
    EditComputeResourcePropertyDialogComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    GenericsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatTooltipModule,
  ],
  exports: [ComputationResourcePropertyListComponent],
})
export class ComputingResourcePropertyModule {}
