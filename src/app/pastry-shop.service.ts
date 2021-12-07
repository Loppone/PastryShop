import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './login/login.component';

@Injectable({
  providedIn: 'root'
})
export class PastryShopService {

  readonly ApiUrl = "http://localhost:25557";

  constructor(private http: HttpClient) { }

  login(cred: any){
    return this.http.post<User>(this.ApiUrl + '/api/Login', cred);
  }
}
