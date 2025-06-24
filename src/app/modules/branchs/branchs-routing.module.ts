import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { BranchListComponent } from "./components/branch-list/branch-list.component";
import { BranchFormComponent } from "./components/branch-form/branch-form.component";
import { BranchDetailComponent } from "./components/branch-detail/branch-detail.component";

const routes: Routes = [
  {
    path: '', component: BranchListComponent
  },
  {
    path: 'new', component: BranchFormComponent
  },
  {
    path: 'edit/:id', component: BranchFormComponent
  },
  {
    path: 'detail/:id', component: BranchDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchRoutingModule { }
