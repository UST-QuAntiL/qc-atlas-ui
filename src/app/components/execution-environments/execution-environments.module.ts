import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { InputsModule } from 'angular-bootstrap-md';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { GenericsModule } from '../generics/generics.module';
import { ExecutionEnvironmentsListComponent } from './execution-environments-list/execution-environments-list.component';
import { ExecutionEnvironmentSearchComponent } from './execution-environment-search/execution-environment-search.component';
import { SoftwarePlatformsModule } from './software-platforms/software-platforms.module';
import { CloudServicesModule } from './cloud-services/cloud-services-module';
import { ComputeResourcesModule } from './compute-resource/compute-resources.module';

@NgModule({
  declarations: [
    ExecutionEnvironmentsListComponent,

    ExecutionEnvironmentSearchComponent,
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    GenericsModule,
    MatCardModule,
    SoftwarePlatformsModule,
    CloudServicesModule,
    ComputeResourcesModule,
    FormsModule,
    InputsModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    ExecutionEnvironmentsListComponent,
    ExecutionEnvironmentSearchComponent,
  ],
})
export class ExecutionEnvironmentsModule {}
