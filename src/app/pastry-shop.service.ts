import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './login/login.component';
import { DtoDolceInVenditaUpdate, DtoDolceInVetrinaInsert, Vetrina } from './vetrina/vetrina.component';
import { Dolce, DtoDolceInsert, DtoDolceUpdate, Ingrediente } from './backoffice/backoffice.component';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PastryShopService {

  readonly ApiUrl = "http://localhost:25557";
  globalUname: string = "";

  constructor(private http: HttpClient, private router: Router) { }

  runJob(){
    return this.http.post(this.ApiUrl + '/api/job', '').subscribe(data => {
      this.router.navigate(['/skip']);
    });
  }

  login(cred: any){
    return this.http.post<User>(this.ApiUrl + '/api/Login', cred).subscribe(data => {
      this.globalUname = data.nome;
      this.router.navigate(['/vetrina']);
    });
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

  loadDolce(id: number) : Observable<Dolce>{
    return this.http.get<Dolce>(this.ApiUrl + '/api/Dolce/' + id);
  }

  updateDolce(dto: DtoDolceUpdate){
    return this.http.put<number>(this.ApiUrl + '/api/Dolce', dto);
  }
}
