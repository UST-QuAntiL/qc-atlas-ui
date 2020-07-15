import { NgModule } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {
  BadgeModule,
  BreadcrumbModule,
  IconsModule,
} from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { GenericsModule } from '../../generics/generics.module';
import { NavigationBreadcrumbModule } from '../../generics/navigation-breadcrumb/navigation-breadcrumb.module';
import { ImplementationViewComponent } from './implementation-view.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ImplSelectionCriteriaComponent } from '../impl-selection-criteria/impl-selection-criteria.component';

@NgModule({
  declarations: [ImplementationViewComponent, ImplSelectionCriteriaComponent],
  imports: [
    BreadcrumbModule,
    BadgeModule,
    IconsModule,
    MatChipsModule,
    MatTabsModule,
    MatIconModule,
    CommonModule,
    NavigationBreadcrumbModule,
    GenericsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
  ],
})
export class ImplementationViewModule {}
