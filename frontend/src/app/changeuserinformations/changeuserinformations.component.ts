import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-changeuserinformations',
  templateUrl: './changeuserinformations.component.html',
  styleUrls: ['./changeuserinformations.component.css']
})
export class ChangeuserinformationsComponent implements OnInit {

  constructor(private router: Router, private location: Location,private notificationService: NotificationsService, private userService: UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('ulogovan'))
    this.userForInfoChange = JSON.parse(localStorage.getItem('korisnikZaIzmenu'))

    this.username  = this.userForInfoChange.username
    this.password  = this.userForInfoChange.password
    this.repeatedPassword  = this.userForInfoChange.password
    this.fullName  = this.userForInfoChange.fullName
    this.address  = this.userForInfoChange.address
    this.telephone  = this.userForInfoChange.telephone
    this.email  = this.userForInfoChange.email
    this.type  = this.userForInfoChange.type
    
    
  }

  errorMessage(err) {
    this.notificationService.error('Neuspesno azuriranje korisnika ', err, {
      position: ['bottom', 'right'],
      timeOut: 3000,
      animate: 'fade',
    })
  }

  successMessage(success) {
    this.notificationService.success('Uspesno azuriranje korisnika', success, {
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

  user: User
  userForInfoChange: User
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

  changeUser(){

    this.status = this.userForInfoChange.status
    this.type = this.userForInfoChange.type
    
    const specialCharactersPattern=/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
    const passwordPattern=/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,12}$/
    
    
    const emailPattern= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gi
   
    


    
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

    if(!this.username || this.username.length == 0) this.username = this.userForInfoChange.username
    if(!this.password || this.password.length == 0) this.password = this.userForInfoChange.password
    if(!this.fullName) this.fullName = this.userForInfoChange.fullName
    if(!this.address || this.address.length == 0) this.address = this.userForInfoChange.address
    if(!this.email || this.email.length == 0) this.email = this.userForInfoChange.email
    if(!this.telephone || this.telephone.length == 0) this.telephone = this.userForInfoChange.telephone
    

    if(!this.imgURL ||this.imgURL.length == 0){
    
      this.imgURL = this.userForInfoChange.image

    }
    
    this.userService.usernameExists(this.username).subscribe((user: User)=>{
      if(user && (user.id != this.userForInfoChange.id)){
        this.errorMessage("Korisnicko ime vec postoji u sistemu");
        return;
      }
      this.userService.emailExists(this.email).subscribe((user:User)=>{
        if(user && (user.id != this.userForInfoChange.id)){
          this.errorMessage("Email vec postoji u sistemu");
          return;
        }
        this.userService.changeUser(this.userForInfoChange.id,this.username, this.password, this.fullName, this.address, this.email, this.telephone, this.imgURL,this.status,this.type).subscribe((res)=>{
          if (res['message'] == 'ok') {
            this.successMessage("Uspesno azuriranje korisnika");
            
            this.userForInfoChange.username = this.username
            this.userForInfoChange.password = this.password
            this.userForInfoChange.fullName = this.fullName
            this.userForInfoChange.address  = this.address
            this.userForInfoChange.email = this.email
            this.userForInfoChange.telephone = this.telephone
            this.userForInfoChange.image = this.imgURL
            this.userForInfoChange.type = this.type
            this.userForInfoChange.status = this.status
            localStorage.setItem('korisnikZaIzmenu', JSON.stringify(this.userForInfoChange));
          }
          else {
            this.errorMessage("Neuspesno azuriranje korisnika");
          }
        })
      })
    })
  }


  hasDefaultPicture(u) :boolean{
    if(this.user.type!="admin")return false
    if(u.image=="") return true;
    else return false;
  }


  back(){
    this.location.back()
  }
}
