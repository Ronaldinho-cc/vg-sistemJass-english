import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ZonesListComponent } from "./zones-list/zones-list.component";
import { ZonesFormComponent } from "./zones-form/zones-form.component";
import { ZonesDetailComponent } from "./zones-detail/zones-detail.component";

const routes: Routes =[
    {
        path:'',
        component:ZonesListComponent
    },
    {
        path:'new',
        component:ZonesFormComponent
    },
    {
        path:'edit/:id',
        component:ZonesFormComponent
    },
    {
        path:'detail',
        component:ZonesDetailComponent
    }
];

@NgModule({
 imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ZonesRoutingModule{

}