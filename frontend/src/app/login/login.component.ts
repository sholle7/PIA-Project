import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { UserService } from '../services/user.service';
import { NotificationsService } from 'angular2-notifications';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private location: Location,private notificationService: NotificationsService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }
  username: string
  password: string

  
  errorMessage(err) {
    this.notificationService.error('Neuspesno logovanje ', err, {
      position: ['bottom', 'right'],
      timeOut: 3000,
      animate: 'fade',
      
    })
  }

  login(){
    this.userService.login(this.username, this.password).subscribe((user: User)=>{
      if (!user) {
        this.errorMessage("Pogresno uneti kredencijali");   
        return;     
      }
      if(user.status == "Odbijen"){
        this.errorMessage("Nalog je odbijen od strane admina")
        return;
      }
      if(user.status=="Neobradjen"){
        this.errorMessage("Nalog jos uvek nije obradjen")
        return;
      }
      if(user.type == "admin"){
        this.errorMessage("Pogresno uneti kredencijali")
        return;
      }
      
      localStorage.setItem('ulogovan', JSON.stringify(user));
      if (user.type == "moderator") {
        this.router.navigate(['reader']);
      }
      else if(user.type == "citalac"){
        this.router.navigate(['reader']);
      }
      else{
        this.errorMessage("Pogresno uneti kredencijali")
        return;
      }
  
    })
  }

  back(){
    this.location.back()
  }
}
