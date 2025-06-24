import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ClientDetailComponent } from './components/client-detail/client-detail.component';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ClientsRoutingModule,
    ClientListComponent,
    ClientFormComponent,
    ClientDetailComponent
  ],
  exports: [
    ClientListComponent,
    ClientFormComponent,
    ClientDetailComponent
  ]
})
export class ClientsModule { }
