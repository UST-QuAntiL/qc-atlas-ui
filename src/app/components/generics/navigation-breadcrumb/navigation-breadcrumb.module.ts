import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationBreadcrumbComponent } from './navigation-breadcrumb.component';

@NgModule({
  declarations: [NavigationBreadcrumbComponent],
  imports: [CommonModule, RouterModule],
  entryComponents: [],
  exports: [NavigationBreadcrumbComponent],
})
export class NavigationBreadcrumbModule {}
