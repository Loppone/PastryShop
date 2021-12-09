import { Component, OnInit } from '@angular/core';
import { PastryShopService } from '../pastry-shop.service';
import { NotificationService } from '../notification.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

export interface Dolce{
  id: number,
  nome: string,
  prezzo: number
}

export interface UnitaDiMisura{
  sigla: string,
  nomeCompleto: string
}

export interface Ingrediente{
  id: number,
  nome: string,
  quantita: number,
  unitaDiMisura: UnitaDiMisura
}

export class IngredientiDto{
  IdIngrediente: number = 0;
  quantita: number = 0;
}

export interface DtoDolceInsert{
  nome: string,
  prezzo: number,
  Ingredienti: IngredientiDto[]
}

@Component({
  selector: 'app-backoffice',
  templateUrl: './backoffice.component.html',
  styleUrls: ['./backoffice.component.css']
})
export class BackofficeComponent implements OnInit {

  constructor(
    private service: PastryShopService, 
    private notification: NotificationService,
    private modal: NgbModal) { }

  dolci: Dolce[] = [];
  Nome!: string;
  Prezzo!: number;
  ingredienti: Ingrediente[] = [];
  ingredientiToSave: IngredientiDto[] = [];
  ingredientiDolce: Ingrediente[] = [];

  ngOnInit(): void {
    this.LoadDolci();
    this.LoadIngredienti();
  }

  NewDolce(content: any){
    this.modal.open(content,
      {ariaLabelledBy: 'modal-basic-title'}).result.then((result)  => {
         
       }, (reason) => {
         
       });
  }

  LoadIngredienti(){
    this.service.loadIngredienti().subscribe(data =>{
      this.ingredienti = data
    },
    error =>{
      this.notification.showError(error.error, "Errore!");
    });
  }

  OpenModalUpdate(item: Dolce, content: any){

  }

  Elimina(id: number){
    this.service.eliminaDolce(id).subscribe(data =>{
      this.LoadDolci();
    },
    error =>{
      this.notification.showError(error.error, "Errore!");
    });
  }

  VisualizzaIngredienti(content: any, item: Dolce){
    this.Nome = item.nome; 
    // Carico gli ingredienti del dolce
    this.service.loadIngredientiDolce(item.id).subscribe(data =>{
      this.ingredientiDolce = data;

      // Apro la modale
      this.modal.open(content,
        {ariaLabelledBy: 'modal-basic-title'}).result.then((result)  => {
           
         }, (reason) => {
           
         });
    },
    error => {

    });    
  }

  LoadDolci(){
    this.service.loadDolci().subscribe(data =>{
      this.dolci = data
    },
    error => {

    });
  }

  saveDolce(modal: any){
    var dto : DtoDolceInsert = {
       nome: this.Nome,
       prezzo: this.Prezzo,
       Ingredienti: this.ingredientiToSave 
    }

    this.service.saveDolce(dto).subscribe(data =>{
        this.LoadDolci();
    },
    error => {

    });;  
    modal.close('s');
  }

  onQtaChange(event: any, id: any){
    var result = this.ingredientiToSave.find(o => o.IdIngrediente === id);
    
    if (!result){
      var i = new IngredientiDto();
      i.IdIngrediente = id;
      i.quantita = event.currentTarget.value;

      this.ingredientiToSave.push(i);
    }
    else{
      result.quantita = event.currentTarget.value;
    }
  }
}
