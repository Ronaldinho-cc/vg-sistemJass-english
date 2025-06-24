import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WaterQualityRoutingModule } from './water-quality-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { QualityRecordsComponent } from './components/quality-records/quality-records.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    WaterQualityRoutingModule,
    HttpClientModule ,
    QualityRecordsComponent,
    
  ],
  exports:[
    QualityRecordsComponent,
  ]
})
export class WaterQualityModule { }
