import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgdSmartTableModule } from "../../projects/ngd-smart-table/src/lib/ngd-smart-table.module";
import { AppComponent } from './app.component';

import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgdSmartTableModule,
    CommonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
