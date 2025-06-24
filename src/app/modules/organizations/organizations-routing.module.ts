import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrganizationListComponent } from './components/organization-list/organization-list.component';
import { OrganizationFormComponent } from './components/organization-form/organization-form.component';

const routes: Routes = [
  {
    path: '', component: OrganizationListComponent
  },
  {
    path: 'new', component: OrganizationFormComponent
  },
  {
    path: 'edit/:id', component: OrganizationFormComponent
  },
  {
    path: 'detail', component: OrganizationFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationsRoutingModule { }
