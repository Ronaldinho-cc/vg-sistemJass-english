import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ZonesDetailComponent } from "./components/zones-detail/zones-detail.component";
import { ZonesFormComponent } from "./components/zones-form/zones-form.component";
import { ZonesListComponent } from "./components/zones-list/zones-list.component";

@NgModule({
    declarations:[],
    imports:[
        CommonModule,
        FormsModule,
        ZonesListComponent,
        ZonesFormComponent,
        ZonesDetailComponent
    ],
    exports:[
        ZonesListComponent,
        ZonesFormComponent,
        ZonesDetailComponent
    ]
})

export class ZonesModule{}