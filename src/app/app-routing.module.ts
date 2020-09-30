import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SoftwarePlatformViewComponent } from './components/execution-environments/software-platforms/software-platform-view/software-platform-view.component';
import { CloudServiceViewComponent } from './components/execution-environments/cloud-services/cloud-service-view/cloud-service-view.component';
import { AlgorithmListComponent } from './components/algorithms/algorithm-list/algorithm-list.component';
import { PublicationListComponent } from './components/publications/publication-list/publication-list.component';
import { ImplementationViewComponent } from './components/algorithms/implementation-view/implementation-view.component';
import { AlgorithmViewComponent } from './components/algorithms/algorithm-view/algorithm-view.component';
import { ComputeResourceViewComponent } from './components/execution-environments/compute-resource/compute-resource-view/compute-resource-view.component';
import { ExecutionEnvironmentSearchComponent } from './components/execution-environments/execution-environment-search/execution-environment-search.component';
import { PublicationViewComponent } from './components/publications/publication-view/publication-view.component';
import { SoftwarePlatformListComponent } from './components/execution-environments/software-platforms/software-platform-list/software-platform-list.component';
import { CloudServiceListComponent } from './components/execution-environments/cloud-services/cloud-service-list/cloud-service-list.component';
import { ComputeResourceListComponent } from './components/execution-environments/compute-resource/compute-resource-list/compute-resource-list.component';
import { ChangePageGuard } from './services/deactivation-guard';
import { ProblemTypesListComponent } from './components/problem-types/problem-types-list/problem-types-list.component';
import { ApplicationAreasListComponent } from './components/application-areas/application-areas-list/application-areas-list.component';

const routes: Routes = [
  { path: 'algorithms', component: AlgorithmListComponent },
  {
    path: 'algorithms/:algoId',
    component: AlgorithmViewComponent,
    canDeactivate: [ChangePageGuard],
  },
  {
    path: 'algorithms/:algoId/implementations/:implId',
    component: ImplementationViewComponent,
    canDeactivate: [ChangePageGuard],
  },
  {
    path: 'execution-environments',
    redirectTo: '/execution-environments/search',
    pathMatch: 'full',
  },
  {
    path: 'execution-environments/search',
    component: ExecutionEnvironmentSearchComponent,
  },
  {
    path: 'execution-environments/software-platforms',
    component: SoftwarePlatformListComponent,
  },
  {
    path: 'execution-environments/software-platforms/:spId',
    component: SoftwarePlatformViewComponent,
    canDeactivate: [ChangePageGuard],
  },
  {
    path: 'execution-environments/cloud-services',
    component: CloudServiceListComponent,
  },
  {
    path: 'execution-environments/cloud-services/:csId',
    component: CloudServiceViewComponent,
    canDeactivate: [ChangePageGuard],
  },
  {
    path: 'execution-environments/compute-resources',
    component: ComputeResourceListComponent,
  },
  {
    path: 'execution-environments/compute-resources/:crId',
    component: ComputeResourceViewComponent,
    canDeactivate: [ChangePageGuard],
  },
  { path: 'publications', component: PublicationListComponent },
  {
    path: 'publications/:publicationId',
    component: PublicationViewComponent,
    canDeactivate: [ChangePageGuard],
  },
  { path: 'problem-types', component: ProblemTypesListComponent },
  { path: 'application-areas', component: ApplicationAreasListComponent },
  {
    path: '',
    redirectTo: '/algorithms',
    pathMatch: 'full',
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ChangePageGuard],
})
export class AppRoutingModule {}
