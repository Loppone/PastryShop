import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PastryShopService } from './pastry-shop.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PastryShop';

  constructor(private service: PastryShopService, private router: Router){

  }

  ngOnInit(): void {
  }

  runJob(){
    this.service.runJob();
    // .subscribe(data => 
    //   {
    //     console.info('job eseguito');
    //     this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //       return false;
    //   }
    //   this.router.onSameUrlNavigation = 'reload';
    //     this.router.navigate(['/','vetrina']);
    //   },
    //   error => {
    //     console.error('Errore!');
    //   });;
  }

  skippa(){
    this.router.navigate(['/backoffice']);
  }
}
