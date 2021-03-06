import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { VetrinaComponent } from './vetrina/vetrina.component';
import { BackofficeComponent } from './backoffice/backoffice.component';

import { PastryShopService } from './pastry-shop.service';
import { NotificationService } from './notification.service';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SkipComponent } from './skip/skip.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VetrinaComponent,
    BackofficeComponent,
    SkipComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    NgbModule
  ],
  providers: [PastryShopService, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
