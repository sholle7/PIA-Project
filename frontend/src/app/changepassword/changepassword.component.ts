import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { NotificationsService } from 'angular2-notifications';
import { Location } from '@angular/common';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  constructor(private location:Location, private notificationService: NotificationsService, private router:Router, private userService: UserService) { }

  ngOnInit(): void {
  }
  errorMessage(err) {
    this.notificationService.error('Neuspesna promena lozinke ', err, {
      position: ['bottom', 'right'],
      timeOut: 3000,
      animate: 'fade',
    })
  }

  oldPassword :string
  newPassword :string
  repeatedNewPassword :string

  changePassword(){
    const specialCharactersPattern=/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
    const passwordPattern=/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,12}$/
   
    let user = JSON.parse(localStorage.getItem('ulogovan'))
    if(!user){
      this.errorMessage("Niste ulogovani");
      return;
    }
    if(this.oldPassword != user.password){
      this.errorMessage("Netacna stara lozinka");
      return;
    }
    if(this.newPassword != this.repeatedNewPassword){
      this.errorMessage("Nova lozinka i ponovljena nova lozinka se ne poklapaju");
      return;
    }
    if(!this.newPassword.match(passwordPattern)){
      this.errorMessage("Pogresan format lozinke");
      return;
    }
    else{
      if(/^\d+$/.test(user.password[0]) || (specialCharactersPattern.test(user.password[0]))){
        this.errorMessage("Lozinka ne sme da pocinje cifrom ili specijalnim karakterom");
        return;
      }
      
    }
    if(this.newPassword == this.oldPassword){
      this.errorMessage("Nova i stara lozinka ne smeju biti iste");
      return;
    }
    this.userService.changePassword(user.username, this.newPassword).subscribe((res)=>{
      if (res['message'] == 'notok') {
        this.errorMessage("Neuspesna promena lozinke");
        return;
      }
      localStorage.clear()
      this.router.navigate([""])
    })
   
  }

  back(){
    this.location.back()
  }

}
