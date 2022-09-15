import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  constructor(private location: Location, private notificationService: NotificationsService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    localStorage.removeItem('ulogovan')
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
    this.userService.adminLogin(this.username, this.password).subscribe((user: User)=>{
      if (!user) {
        this.errorMessage("Pogresno uneti kredencijali");        
      }
      if(user.status == "Odbijen"){
        this.errorMessage("Nalog je odbijen od strane admina")
        return;
      }
      if(user.status=="Neobradjen"){
        this.errorMessage("Nalog jos uvek nije obradjen")
      }

      localStorage.setItem('ulogovan', JSON.stringify(user));
      if (user.type == "admin") {
        this.router.navigate(['admin']);
      }
      
      else{
        this.errorMessage("Pogresno uneti kredencijali")
      }
  
    })
  }

  back(){
    this.location.back()
  }

}
