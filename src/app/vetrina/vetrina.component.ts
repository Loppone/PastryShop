import { Component, Input, OnInit, Output } from '@angular/core';
import { NotificationService } from '../notification.service';
import { PastryShopService } from '../pastry-shop.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

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

export interface DtoDolceInVetrinaInsert {
  idDolce: number,
  NumeroDolciDaVendere: number
}

@Component({
  selector: 'app-vetrina',
  templateUrl: './vetrina.component.html',
  styleUrls: ['./vetrina.component.css']
})
export class VetrinaComponent implements OnInit {
  itemToSend: any;

  constructor(
    private service: PastryShopService, 
    private notification: NotificationService,
    private modal: NgbModal,private myModal: NgbModal) { }

  dolciInVetrina: Vetrina[] = [];
  elencoDolci!: Map<number, string>;
  dolceVenduto!: Vetrina;
  closeResult = '';
  Qta: any;
  dataMessaInVendita: any;
  cmbDolce: any;
  qtaMod!: number;
  valueDolce!: number;
  ute: string = "";

  ngOnInit(): void {
    this.ute = this.service.globalUname;
    this.service.elencoDolci().subscribe(data =>{
      this.elencoDolci = data;
    },
    error => {

    });

    this.LoadVetrina();
  }

  LoadVetrina(){
    this.service.loadVetrina().subscribe(data =>{
      this.dolciInVetrina = data
    },
    error => {

    });
  }

  Sell(modal: any){
    var dolce: DtoDolceInVenditaUpdate = {
       idDolceVetrina: this.itemToSend.idLotto,
       numeroDolciDaVendere: this.qtaMod
    }

    modal.close('s');

    this.service.sellDolce(dolce).subscribe(data =>{
      this.dolceVenduto = data;

      this.LoadVetrina();
    },
    error =>{
      this.notification.showError(error.error, "Errore!");
    });
  }

  Elimina(id: number){
    this.service.rimuoviDolce(id).subscribe(data =>{
      this.LoadVetrina();
    },
    error =>{
      this.notification.showError(error.error, "Errore!");
    });
  }

  saveDolce(modal: any){
    var dolce: DtoDolceInVetrinaInsert = {
      idDolce: this.valueDolce,
      NumeroDolciDaVendere: this.Qta
    }
    // var s: any = this.dataMessaInVendita;
    // var c: any = this.cmbDolce;
    
    modal.close('ss');
  
    this.service.newDolce(dolce).subscribe(data =>{
      this.LoadVetrina();
    },
    error =>{
      this.notification.showError(error.error, "Errore!");
    });
  }

  MettiInVendita(content: any) {
    this.modal.open(content,
   {ariaLabelledBy: 'modal-basic-title'}).result.then((result)  => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = 
         `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  OpenModalSell(item: any,contentMyModal: any){
    this.itemToSend = item;
    this.openAlert(contentMyModal)
  }

  openAlert(contentMyModal: any) {
    this.myModal.open(contentMyModal,
   {ariaLabelledBy: 'modal-basic-title'}).result.then((result)  => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = 
         `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  changeDolce(val: any){
    this.valueDolce = val.currentTarget.value;
  }
}
