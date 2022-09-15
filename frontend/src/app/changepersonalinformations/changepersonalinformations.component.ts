import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { User } from '../model/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-changepersonalinformations',
  templateUrl: './changepersonalinformations.component.html',
  styleUrls: ['./changepersonalinformations.component.css']
})
export class ChangepersonalinformationsComponent implements OnInit {

  constructor(private location: Location, private notificationService: NotificationsService, private userService: UserService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('ulogovan'))

    this.username = this.user.username
    this.fullName = this.user.fullName
    this.address = this.user.address
    this.email = this.user.email
    this.telephone = this.user.telephone
  }

  errorMessage(err) {
    this.notificationService.error('Neuspesna promena licnih podataka ', err, {
      position: ['bottom', 'right'],
      timeOut: 3000,
      animate: 'fade',
    })
  }
  successMessage(success) {
    this.notificationService.success('Uspesna promena licnih podataka', success, {
      position: ['bottom', 'right'],
      timeOut: 3000,
      animate: 'fade',
    })
  }


  user : User
  username: string
  fullName: string
  address: string
  email: string
  telephone: string
  imgURL: string
  status: string
  type: string
  password: string
  id: number

  changePersonalInfo(){
      this.id = this.user.id
      this.status = this.user.status
      this.type = this.user.type
      this.password = this.user.password
      const emailPattern= /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/gi
      if(!this.email.match(emailPattern)){
        this.errorMessage("Pogresno unet email");
        return;
      }
      
    if(!this.username || this.username.length == 0) this.username = this.user.username
    if(!this.fullName) this.fullName = this.user.fullName
    if(!this.address || this.address.length == 0) this.address = this.user.address
    if(!this.email || this.email.length == 0) this.email = this.user.email
    if(!this.telephone || this.telephone.length == 0) this.telephone = this.user.telephone

    if(!this.imgURL ||this.imgURL.length == 0){
      this.imgURL = this.user.image
    }

    this.userService.usernameExists(this.username).subscribe((us: User)=>{
      if(us && (us.id != this.user.id)){
        this.errorMessage("Korisnicko ime vec postoji u sistemu");
        return;
      }
      this.userService.emailExists(this.email).subscribe((us:User)=>{
        if(us && (us.id != this.user.id)){
          this.errorMessage("Email vec postoji u sistemu");
          return;
        }
        this.userService.changeUser(this.user.id,this.username, this.password, this.fullName, this.address, this.email, this.telephone, this.imgURL,this.status,this.type).subscribe((res)=>{
          if (res['message'] == 'ok') {
            this.successMessage("Uspesno azuriranje licnih podataka korisnika");
            this.user.id = this.id
            this.user.username = this.username
            this.user.password = this.password
            this.user.fullName = this.fullName
            this.user.address  = this.address
            this.user.email = this.email
            this.user.telephone = this.telephone
            this.user.image = this.imgURL
            this.user.type = this.type
            this.user.status = this.status
            localStorage.setItem('ulogovan', JSON.stringify(this.user));
          }
          else {
            this.errorMessage("Neuspesno azuriranje licnih podataka korisnika");
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

  back(){
    
    this.location.back()
  }
}
