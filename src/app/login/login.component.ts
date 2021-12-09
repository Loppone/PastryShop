import { Component, OnInit, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PastryShopService } from '../pastry-shop.service';

export interface User {
  nome: string;
  username: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  Username: string;
  Password: string;
  @Input() UserObject: User;
  Credentials: any;
  MessageError: string;


  constructor(private service: PastryShopService, private router: Router) {
    this.Username = "";
    this.Password = "";
    this.MessageError = "";

    this.UserObject = {
      nome: "",
      password: "",
      username: ""
    };

  }

  ngOnInit(): void {
  }

  doLogin(user: string, pwd: string){
    this.Credentials = {
      Username: user,
      Password: pwd
    };

    this.MessageError = "";
    this.UserObject.nome = "";
    
    this.service.login(this.Credentials).subscribe(data => 
      {
        this.UserObject = data;
        this.router.navigate(['/vetrina'])
      },
      error => {
          this.MessageError = error.message
      });
    }
}

