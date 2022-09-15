import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  constructor(private location: Location, private userService: UserService, private notificationService: NotificationsService) { }

  ngOnInit(): void {
    
  }

  errorMessage(err) {
    this.notificationService.error('Neuspesno dodavanje korisnika ', err, {
      position: ['bottom', 'right'],
      timeOut: 3000,
      animate: 'fade',
    })
  }
  successMessage(success) {
    this.notificationService.success('Uspesno dodavanje korisnika', success, {
      position: ['bottom', 'right'],
      timeOut: 3000,
      animate: 'fade',
    })
  }

  saveImage(event){
    
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
    let file = event.target.files[0];

    let img = new Image();

    img.src = window.URL.createObjectURL( file );
    reader.readAsDataURL(file);
    reader.onload = () => {
        window.URL.revokeObjectURL( img.src );
        this.imgURL = reader.result as string;   
      };
    }
  }
  
  username : string
  password : string
  repeatedPassword : string
  fullName : string
  address : string
  telephone: string
  email: string
  type: string
  imgURL:string
  status:string
  addUser(){

    this.status = "Prihvacen"
    
    const specialCharactersPattern=/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
    const passwordPattern=/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,12}$/
    
    
    const emailPattern= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gi
   
    if ((!this.username) || (!this.password) || (!this.repeatedPassword) || (!this.fullName) || (!this.address)
    || (!this.telephone) || (!this.email)) {
   this.errorMessage("Morate uneti sve podatke");
   return;
 }


    if ((this.username.length == 0) || (this.password.length == 0) || (this.repeatedPassword.length == 0) || (this.fullName.length == 0) ||
    (this.address.length == 0) || (this.telephone.length == 0) || (this.email.length == 0)) {
    this.errorMessage("Pogresno uneti podaci!");
    return;
  }
  if (this.password != this.repeatedPassword) {
    this.errorMessage("Unete lozinke se razlikuju!");
    return;
  }
  if(!this.password.match(passwordPattern)){
    this.errorMessage("Pogresan format lozinke");
    return;
  }
  else{
    if(/^\d+$/.test(this.password[0]) || (specialCharactersPattern.test(this.password[0]))){
      this.errorMessage("Lozinka ne sme da pocinje cifrom ili specijalnim karakterom");
      return;
    }
    
  }
  if(!this.email.match(emailPattern)){
    this.errorMessage("Pogresno unet email");
    return;
  }
  if(!this.imgURL ||this.imgURL.length == 0){
  
    this.imgURL = ""

  }
  this.userService.usernameExists(this.username).subscribe((user: User)=>{
    if(user){
      this.errorMessage("Korisnicko ime vec postoji u sistemu");
      return;
    }
    this.userService.emailExists(this.email).subscribe((user:User)=>{
      if(user){
        this.errorMessage("Email vec postoji u sistemu");
        return;
      }
      this.userService.register(this.username, this.password, this.fullName, this.address, this.email, this.telephone, this.imgURL,this.status,this.type).subscribe((res)=>{
        if (res['message'] == 'ok') {
          this.successMessage("Uspesno dodavanje korisnika u sistem");
        }
        else {
          this.errorMessage("Neuspesno dodavanje korisnika u sistem");
        }
      })
    })
  })

  }
  

  back(){
    this.location.back()
  }
}
