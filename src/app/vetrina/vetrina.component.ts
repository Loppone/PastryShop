import { Component, OnInit } from '@angular/core';
import { PastryShopService } from '../pastry-shop.service';

export interface Vetrina {
  idLotto: number,
  nome: string,
  disponibilita: number,
  prezzo: number,
  prezzoScontato: number,
  dataMessaInVendita: number
}

@Component({
  selector: 'app-vetrina',
  templateUrl: './vetrina.component.html',
  styleUrls: ['./vetrina.component.css']
})
export class VetrinaComponent implements OnInit {

  constructor(private service: PastryShopService) { }

  dolciInVetrina: Vetrina[] = [];

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
}
