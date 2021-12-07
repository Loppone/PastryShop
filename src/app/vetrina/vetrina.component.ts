import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { PastryShopService } from '../pastry-shop.service';

export interface Vetrina {
  idLotto: number,
  nome: string,
  disponibilita: number,
  prezzo: number,
  prezzoScontato: number,
  dataMessaInVendita: number
}

export interface DtoDolceInVenditaUpdate {
  idDolceVetrina: number,
  numeroDolciDaVendere: number
}

@Component({
  selector: 'app-vetrina',
  templateUrl: './vetrina.component.html',
  styleUrls: ['./vetrina.component.css']
})
export class VetrinaComponent implements OnInit {

  constructor(private service: PastryShopService, private notification: NotificationService) { }

  dolciInVetrina: Vetrina[] = [];
  dolceVenduto!: Vetrina;

  ngOnInit(): void {
    this.LoadVetrina();
  }

  LoadVetrina(){
    this.service.loadVetrina().subscribe(data =>{
      this.dolciInVetrina = data
    },
    error => {

    });
  }

  Sell(item: Vetrina){
    var dolce: DtoDolceInVenditaUpdate = {
      idDolceVetrina: item.idLotto,
      numeroDolciDaVendere: 50
    }

    this.service.sellDolce(dolce).subscribe(data =>{
      this.dolceVenduto = data;

      this.LoadVetrina();
    },
    error =>{
      this.notification.showError(error.error, "Errore!");
    });
  }
}
