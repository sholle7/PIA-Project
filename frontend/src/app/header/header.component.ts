import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    let user = JSON.parse(localStorage.getItem('ulogovan'))
  }
  user: User
  logout(){    
    localStorage.clear()
    this.router.navigate([''])
  }
  loggedIn(): boolean{
    this.user = JSON.parse(localStorage.getItem('ulogovan'))
    if(this.user) return true;
    else return false
  }
  hasnotDefaultPictureAndLoggedin(): boolean{
    this.user = JSON.parse(localStorage.getItem('ulogovan'))
    if(this.user && this.user.image!="") return true;
    else return false;
  }
  hasDefaultPictureAndLoggedin(): boolean{
    this.user = JSON.parse(localStorage.getItem('ulogovan'))
    if(this.user && this.user.image=="") return true;
    else return false
  }
  returnToHomePage(){
    if(!this.user) this.router.navigate([''])
    if(this.user.type=="admin") this.router.navigate(['admin'])
    else this.router.navigate(['reader'])
  }
  navigateToRegisterPage(){
    this.router.navigate(['register'])
  }
  navigateToLoginPage(){
    this.router.navigate(['login'])
  }
  navigateToProfilePage(){
    this.router.navigate(['profile'])
  }
  navigateToSearchBookPage(){
    this.router.navigate(['searchbooks'])
  }
}
