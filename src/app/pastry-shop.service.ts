import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './login/login.component';
import { DtoDolceInVenditaUpdate, DtoDolceInVetrinaInsert, Vetrina } from './vetrina/vetrina.component';
import { Dolce, DtoDolceInsert, Ingrediente } from './backoffice/backoffice.component';

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

   sellDolce(dto: DtoDolceInVenditaUpdate){
     return this.http.put<Vetrina>(this.ApiUrl + '/api/Vetrina', dto);
   }

   rimuoviDolce(id: number){
    return this.http.delete(this.ApiUrl + '/api/Vetrina/' + id);
  }

  //  DOLCI
   newDolce(dto: DtoDolceInVetrinaInsert){
     return this.http.post<number>(this.ApiUrl + '/api/Vetrina', dto);
   }


  loadDolci() : Observable<Dolce[]>{
    return this.http.get<Dolce[]>(this.ApiUrl + '/api/Dolce');
  }

  saveDolce(dto: DtoDolceInsert){
    return this.http.post<number>(this.ApiUrl + '/api/Dolce', dto);
  }

  eliminaDolce(id: number){
    return this.http.delete(this.ApiUrl + '/api/Dolce/' + id);
  }

  // INGREDIENTI
  loadIngredienti() : Observable<Ingrediente[]>{
    return this.http.get<Ingrediente[]>(this.ApiUrl + '/api/Ingredienti')
  }

  loadIngredientiDolce(idDolce: number) : Observable<Ingrediente[]>{
    return this.http.get<Ingrediente[]>(this.ApiUrl + '/api/IngredientiDolce/' + idDolce)
  }
}
