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
import { MatCardModule } from '@angular/material/card';
import { GenericsModule } from '../../generics/generics.module';
import { NavigationBreadcrumbModule } from '../../generics/navigation-breadcrumb/navigation-breadcrumb.module';
import { ComputingResourcePropertyModule } from '../../computation-resource-property/computing-resource-property.module';
import { ImplementationViewComponent } from './implementation-view.component';
import { ImplementationPublicationsListComponent } from './implementation-publications-list/implementation-publications-list.component';

@NgModule({
  declarations: [
    ImplementationViewComponent,
    ImplementationPublicationsListComponent,
  ],
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
    ComputingResourcePropertyModule,
    MatCardModule,
  ],
})
export class ImplementationViewModule {}
