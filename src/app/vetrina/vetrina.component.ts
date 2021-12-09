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
  dolceVenduto!: Vetrina;
  closeResult = '';
  Qta: any;
  dataMessaInVendita: any;
  cmbDolce: any;
  qtaMod!: number;

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
       numeroDolciDaVendere: this.qtaMod
    }

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
    var s: any = this.dataMessaInVendita;
    var d: number = this.Qta;
    var c: any = this.cmbDolce;
    modal.close('d');
  }

  open(content: any) {
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

}
