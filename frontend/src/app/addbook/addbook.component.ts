import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { User } from '../model/user';
import { BookService } from '../services/book.service';
import { GlobalsService } from '../services/globals.service';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {

  constructor(private globalsService: GlobalsService, private location: Location, private bookService: BookService, private notificationService: NotificationsService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('ulogovan'))
    this.allGenres = this.globalsService.allGenres
  }

  errorMessage(err) {
    this.notificationService.error('Greska ', err, {
      position: ['bottom', 'right'],
      timeOut: 3000,
      animate: 'fade',
    })
  }
  successMessage(success) {
    this.notificationService.success('Uspeh', success, {
      position: ['bottom', 'right'],
      timeOut: 3000,
      animate: 'fade',
    })
  }



  user: User
  allGenres: string[]
  name : string
  publisher : string
  year : number
  language : string
  imgURL:string
  status : string
  author:string
  authors: string[]
  
  genres: string[]
  amount: number
  



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
  
  addBook(){
    
    if(this.user.type=="citalac"){
      this.amount = 0
      this.status = "Neobradjen"
      if ((!this.name) || (!this.publisher) || (!this.year) || (!this.language) || (!this.author)
      || (!this.genres)) {
        this.errorMessage("Morate uneti sve podatke ispravno");
        return;
      }
    }
    else {
    
      if ((!this.name) || (!this.publisher) || (!this.year) || (!this.language) || (!this.author)
      || (!this.genres)||(this.amount == null)||(this.amount < 0)) {
          this.errorMessage("Morate uneti sve podatke ispravno");
          return;
      }
    }
    
    if ((this.name.length == 0) || (this.publisher.length == 0) || (this.language.length == 0) ||
        (this.author.length == 0) || (this.genres.length > 3)|| (this.genres.length < 1)) {
        this.errorMessage("Pogresno uneti podaci!");
        return;
     }
     if(!this.imgURL ||this.imgURL.length == 0){
  
      this.imgURL = ""
    }
    this.authors = this.author.split(",")
    if(this.user.type=="citalac"){

      this.bookService.addBookRequest(this.name,this.publisher,this.year,this.language,this.imgURL,this.status,this.authors,this.genres,this.amount,this.user.username).subscribe((res)=>{
        if (res['message'] == 'notok') {   
          this.errorMessage("Neuspesno dodavanje zahteva za knjigu");
          return;
        }
        else{
          this.successMessage("Uspesno dodavanje zahteva za knjigu");
          return;
        }
      })
    }

    else{

      this.bookService.addBook(this.name,this.publisher,this.year,this.language,this.imgURL,this.authors,this.genres,this.amount).subscribe((res)=>{
        if (res['message'] == 'notok') {
          this.errorMessage("Neuspesno dodavanje knjige");
        
          return;
        }
        else{
          this.successMessage("Uspesno dodavanje knjige");
          return;
        }
      })
    }
  }

  back(){
    this.location.back()
  }
}
