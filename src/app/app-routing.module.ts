import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { VetrinaComponent } from './vetrina/vetrina.component';
import { BackofficeComponent } from './backoffice/backoffice.component';
import { SkipComponent } from './skip/skip.component';

const routes: Routes = [
  { path: '', component:LoginComponent },
  { path: 'login', component:LoginComponent },
  { path: 'vetrina', component:VetrinaComponent },
  { path: 'backoffice', component:BackofficeComponent },
  { path: 'skip', component:SkipComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
