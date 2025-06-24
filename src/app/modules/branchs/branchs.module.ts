import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormGroup, FormsModule } from '@angular/forms';

import { BranchRoutingModule } from './branchs-routing.module';
import { BranchListComponent } from './components/branch-list/branch-list.component';
import { BranchDetailComponent } from './components/branch-detail/branch-detail.component';
import { BranchFormComponent } from './components/branch-form/branch-form.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BranchRoutingModule,
    FormsModule,
    BranchRoutingModule,
    BranchListComponent,
    BranchFormComponent,
    BranchDetailComponent
  ],
  exports:[
    BranchListComponent,
    BranchFormComponent,
    BranchDetailComponent
  ]
})

export class BranchsModule { }
