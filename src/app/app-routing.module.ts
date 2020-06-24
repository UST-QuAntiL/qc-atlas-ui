import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {AlgorithmViewComponent} from "./components/algorithms/algorithm-view/algorithm-view.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/algorithms',
    pathMatch: 'full',
  },
  { path: '**', component: AlgorithmViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
