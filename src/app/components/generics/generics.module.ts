import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { MatSortModule } from '@angular/material/sort';

import { GenericDataService } from '../../util/generic-data.service';
import { TextInputComponent } from './property-input/text-input.component';
import { SelectInputComponent } from './property-input/select-input.component';
import { DataListComponent } from './data-list/data-list.component';

@NgModule({
  declarations: [TextInputComponent, SelectInputComponent, DataListComponent],
  imports: [
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
    RouterModule,
    MatSortModule,
  ],
  providers: [GenericDataService],
  exports: [TextInputComponent, SelectInputComponent, DataListComponent],
})
export class GenericsModule {}
