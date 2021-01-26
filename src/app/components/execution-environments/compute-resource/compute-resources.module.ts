import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { GenericsModule } from '../../generics/generics.module';
import { NavigationBreadcrumbModule } from '../../generics/navigation-breadcrumb/navigation-breadcrumb.module';
import { ComputeResourcePropertyModule } from '../../compute-resource-property/compute-resource-property.module';
import { ComputeResourceSoftwarePlatformListComponent } from './compute-resource-software-platform-list/compute-resource-software-platform-list.component';
import { ComputeResourceCloudServiceListComponent } from './compute-resource-cloud-service-list/compute-resource-cloud-service-list.component';
import { ComputeResourcePropertiesComponent } from './compute-resource-properties/compute-resource-properties.component';
import { ComputeResourceViewComponent } from './compute-resource-view/compute-resource-view.component';
import { ComputeResourceListComponent } from './compute-resource-list/compute-resource-list.component';
import { ComputeResourceSelectionCriteriaComponent } from './compute-resource-selection-criteria/compute-resource-selection-criteria.component';
import { CreateComputeResourceDialogComponent } from './dialogs/create-compute-resource-dialog.component';
import { ComputeResourceProvenanceComponent } from './compute-resource-provenance/compute-resource-provenance.component';

@NgModule({
  declarations: [
    ComputeResourceViewComponent,
    ComputeResourceListComponent,
    ComputeResourceSoftwarePlatformListComponent,
    ComputeResourceCloudServiceListComponent,
    ComputeResourcePropertiesComponent,
    ComputeResourceSelectionCriteriaComponent,
    CreateComputeResourceDialogComponent,
    ComputeResourceProvenanceComponent,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    GenericsModule,
    MatCardModule,
    NavigationBreadcrumbModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ComputeResourcePropertyModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatExpansionModule,
    MatTableModule,
    NgxGraphModule,
  ],
  exports: [ComputeResourceViewComponent, ComputeResourceListComponent],
})
export class ComputeResourcesModule {}
