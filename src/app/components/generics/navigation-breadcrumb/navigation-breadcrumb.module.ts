import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { NavigationBreadcrumbComponent } from './navigation-breadcrumb.component';

@NgModule({
  declarations: [NavigationBreadcrumbComponent],
  imports: [CommonModule, RouterModule, MatIconModule, MatRippleModule],
  exports: [NavigationBreadcrumbComponent],
})
export class NavigationBreadcrumbModule {}
