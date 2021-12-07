import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { VetrinaComponent } from './vetrina/vetrina.component';
import { BackofficeComponent } from './backoffice/backoffice.component';

import { PastryShopService } from './pastry-shop.service';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VetrinaComponent,
    BackofficeComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PastryShopService],
  bootstrap: [AppComponent]
})
export class AppModule { }
