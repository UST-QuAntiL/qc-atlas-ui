import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { GenericsModule } from '../../generics/generics.module';
import { NavigationBreadcrumbModule } from '../../generics/navigation-breadcrumb/navigation-breadcrumb.module';
import { CloudServiceViewComponent } from './cloud-service-view/cloud-service-view.component';
import { CloudServiceListComponent } from './cloud-service-list/cloud-service-list.component';
import { CloudServiceComputeResourceListComponent } from './cloud-service-compute-resource-list/cloud-service-compute-resource-list.component';
import { CloudServicePropertiesComponent } from './cloud-service-properties/cloud-service-properties.component';
import { CloudServiceSoftwarePlatformListComponent } from './cloud-service-software-platform-list/cloud-service-software-platform-list.component';
import { CreateCloudServiceDialogComponent } from './dialogs/create-cloud-service-dialog.component';

@NgModule({
  declarations: [
    CloudServiceViewComponent,
    CloudServiceListComponent,
    CloudServiceComputeResourceListComponent,
    CloudServicePropertiesComponent,
    CloudServiceSoftwarePlatformListComponent,
    CreateCloudServiceDialogComponent,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    GenericsModule,
    MatCardModule,
    NavigationBreadcrumbModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
  ],
  exports: [CloudServiceViewComponent, CloudServiceListComponent],
})
export class CloudServicesModule {}
