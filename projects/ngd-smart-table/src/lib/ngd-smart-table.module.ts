import { NgModule } from '@angular/core';
import { NgdSmartTableComponent } from './ngd-smart-table.component';
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    NgdSmartTableComponent,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule
  ],
  exports: [
    NgdSmartTableComponent,
  ]
})
export class NgdSmartTableModule { }
