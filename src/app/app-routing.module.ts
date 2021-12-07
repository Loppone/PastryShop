import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { VetrinaComponent } from './vetrina/vetrina.component';
import { BackofficeComponent } from './backoffice/backoffice.component';

const routes: Routes = [
  { path: 'login', component:LoginComponent },
  { path: 'vetrina', component:VetrinaComponent },
  { path: 'backoffice', component:BackofficeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
