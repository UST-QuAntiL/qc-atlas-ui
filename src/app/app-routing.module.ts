import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AlgorithmsComponent } from "./components/algorithms/algorithms.component";
import { ProvidersComponent } from "./components/providers/providers.component";
import { SdksComponent } from "./components/sdks/sdks.component";
import { TagsComponent } from "./components/tags/tags.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";

const routes: Routes = [
  { path: "algorithms", component: AlgorithmsComponent },
  { path: "providers", component: ProvidersComponent },
  { path: "sdks", component: SdksComponent },
  { path: "tags", component: TagsComponent },
  {
    path: "",
    redirectTo: "/algorithms",
    pathMatch: "full",
  },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
