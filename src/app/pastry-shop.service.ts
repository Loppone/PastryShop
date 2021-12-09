import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './login/login.component';
import { DtoDolceInVenditaUpdate, DtoDolceInVetrinaInsert, Vetrina } from './vetrina/vetrina.component';

@Injectable({
  providedIn: 'root'
})
export class PastryShopService {

  readonly ApiUrl = "http://localhost:25557";

  constructor(private http: HttpClient) { }

  runJob(){
    return this.http.post(this.ApiUrl + '/api/job', '');
  }

  login(cred: any){
    return this.http.post<User>(this.ApiUrl + '/api/Login', cred);
  }

   loadVetrina() : Observable<Vetrina[]> {
      return this.http.get<Vetrina[]>(this.ApiUrl + '/api/Vetrina');    
   }

   elencoDolci() : Observable<Map<number, string>>{
     return this.http.get<Map<number, string>>(this.ApiUrl + '/api/ListaDolci');
   }

   newDolce(dto: DtoDolceInVetrinaInsert){
     return this.http.post<number>(this.ApiUrl + '/api/Vetrina', dto);
   }

   sellDolce(dto: DtoDolceInVenditaUpdate){
     return this.http.put<Vetrina>(this.ApiUrl + '/api/Vetrina', dto);
   }

   rimuoviDolce(id: number){
    return this.http.delete(this.ApiUrl + '/api/Vetrina/' + id);
  }
}
