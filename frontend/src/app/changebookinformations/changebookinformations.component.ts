import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Book } from '../model/book';
import { BookReservation } from '../model/bookReservation';
import { Rental } from '../model/rental';
import { User } from '../model/user';
import { BookService } from '../services/book.service';
import { GlobalsService } from '../services/globals.service';
import { RentalService } from '../services/rental.service';

@Component({
  selector: 'app-changebookinformations',
  templateUrl: './changebookinformations.component.html',
  styleUrls: ['./changebookinformations.component.css']
})
export class ChangebookinformationsComponent implements OnInit {

  constructor(private rentalService: RentalService,private globalsService:GlobalsService, private router: Router, private location: Location, private bookService: BookService, private notificationService: NotificationsService) { }

  ngOnInit(): void {
    this.helpAmount = 0
    this.allGenres = this.globalsService.allGenres
    this.user = JSON.parse(localStorage.getItem('ulogovan'))
    this.book = JSON.parse(localStorage.getItem('knjiga'))
    this.bookForInfoChange = JSON.parse(localStorage.getItem('knjigaZaIzmenu'))
    this.allGenres = ["drama", "komedija", "akcija", "horor", "misterija", "naucna fantastika"]
    if(this.user.type=="admin"){
      this.name = this.bookForInfoChange.name
      this.publisher = this.bookForInfoChange.publisher
      this.year = this.bookForInfoChange.year
      this.language = this.bookForInfoChange.language
      this.author = this.bookForInfoChange.authors.join(",")
      this.amount = this.bookForInfoChange.amount
      this.genres = this.bookForInfoChange.genres
    }

    this.rentalService.getAllRentals().subscribe((ren: Rental[])=>{

      this.allRentals = ren
    })

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

  allGenres : string[]
  name : string
  publisher : string
  year : number
  language : string
  imgURL:string
  
  author:string
  authors: string[]
  
  genres: string[]
  amount: number
  
  bookForInfoChange :Book
  book :Book
  user: User

  helpAmount: number
  allRentals: Rental[] = []
  allBooksReservations: BookReservation[] = []

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

  changeBookInfo(){
    if(this.user.type=="admin"){
      if(this.genres && this.genres.length > 3){
          this.errorMessage("Mozete uneti maksimalno 3 zanra!");
          return;
      }
      if(!this.name || this.name.length == 0) this.name = this.bookForInfoChange.name
      if(!this.publisher || this.publisher.length == 0) this.publisher = this.bookForInfoChange.publisher
      if(!this.year) this.year = this.bookForInfoChange.year
      if(!this.language || this.language.length == 0) this.language = this.bookForInfoChange.language
      if(!this.author || this.author.length == 0) this.authors = this.bookForInfoChange.authors
      if(!this.genres || this.genres.length == 0) this.genres = this.bookForInfoChange.genres
      if(!this.amount) this.amount = this.bookForInfoChange.amount

      if(!this.imgURL || this.imgURL.length == 0){
        this.imgURL = this.bookForInfoChange.coverPicture
      }

      if(this.author && this.author != "") this.authors = this.author.split(",")
      
        this.bookService.changeBookInfo(this.bookForInfoChange.id,this.name,this.publisher,this.year,this.language,this.imgURL,this.authors,this.genres,this.amount).subscribe((res)=>{
          if (res['message'] == 'notok') {
            this.errorMessage("Neuspesno promenjene informacije o knjizi");
            return;
          }
          else{
            this.helpAmount = this.amount
            this.successMessage("Uspesno promenjene informacije o knjizi");

          
            this.bookService.getAllBooksReservations().subscribe((booksReservations : BookReservation[])=>{
              this.allBooksReservations = booksReservations

              for(let i = 0; i<this.allBooksReservations.length; i++){
                if(this.helpAmount<=0) break
                
               
                if(this.allBooksReservations[i].idB == this.bookForInfoChange.id && this.allBooksReservations[i].active == true){
                  if(this.canAcceptReservation(this.allBooksReservations[i].username, this.allBooksReservations[i].idB) == true){
                          
                          this.bookService.acceptBookReservation(this.allBooksReservations[i].id, this.allRentals.length+1).subscribe((res)=>{
                        
                            if(res['message']!='ok'){
                              this.helpAmount++
                              this.errorMessage("Greska pri prihvatanju rezervacije knjige")
                              return;
                            }
      
                            this.rentalService.rentABook(this.allBooksReservations[i].username,this.allBooksReservations[i].idB,this.globalsService.daysRent).subscribe((res)=>{
                              if(res['message']!='ok'){
                                this.helpAmount++
                                this.errorMessage("Greska pri prihvatanju rezervacije knjige")
                                return;
                              }
                              this.bookService.updateBook(this.bookForInfoChange.id, -1).subscribe((res)=>{
                                  if(res['message']!='ok'){
                                    this.helpAmount++
                                    this.errorMessage("Greska pri razduzenju knjige")
                                    return;
                                  }
                                  
                                  this.bookForInfoChange.amount = this.helpAmount
                                  this.bookForInfoChange.genres = this.genres
                                  this.bookForInfoChange.authors = this.authors
                                  this.bookForInfoChange.coverPicture = this.imgURL
                                  this.bookForInfoChange.name = this.name
                                  this.bookForInfoChange.language = this.language
                                  this.bookForInfoChange.publisher = this.publisher
                                  this.bookForInfoChange.year = this.year
                                  
                                  localStorage.setItem('knjigaZaIzmenu', JSON.stringify(this.bookForInfoChange));
                                  return;
                              })
                            })
      
                          })
                              
                  }
                }
              }
            })            
          }
        })
    }
    else{

      if ((!this.name) || (!this.publisher) || (!this.year) || (!this.language) || (!this.author)
      || (!this.genres) || (!this.amount)) {
          this.errorMessage("Morate uneti sve podatke ispravno");
          return;
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

        this.bookService.changeBookInfo(this.book.id,this.name,this.publisher,this.year,this.language,this.imgURL,this.authors,this.genres,this.amount).subscribe((res)=>{
          if (res['message'] == 'notok') {
            this.errorMessage("Neuspesno promenjene informacije o knjizi");
            return;
          }
          else{

            this.helpAmount = this.amount
            this.successMessage("Uspesno promenjene informacije o knjizi");

            
            this.bookService.getAllBooksReservations().subscribe((booksReservations : BookReservation[])=>{
              this.allBooksReservations = booksReservations

              for(let i = 0; i<this.allBooksReservations.length; i++){
                if(this.helpAmount<=0) break
                
               
                if(this.allBooksReservations[i].idB == this.book.id && this.allBooksReservations[i].active == true){
                  if(this.canAcceptReservation(this.allBooksReservations[i].username, this.allBooksReservations[i].idB) == true){
                          
                          this.bookService.acceptBookReservation(this.allBooksReservations[i].id, this.allRentals.length+1).subscribe((res)=>{
                        
                            if(res['message']!='ok'){
                              this.helpAmount++
                              this.errorMessage("Greska pri prihvatanju rezervacije knjige")
                              return;
                            }
      
                            this.rentalService.rentABook(this.allBooksReservations[i].username,this.allBooksReservations[i].idB,this.globalsService.daysRent).subscribe((res)=>{
                              if(res['message']!='ok'){
                                this.helpAmount++
                                this.errorMessage("Greska pri prihvatanju rezervacije knjige")
                                return;
                              }
                              this.bookService.updateBook(this.book.id, -1).subscribe((res)=>{
                                  if(res['message']!='ok'){
                                    this.helpAmount++
                                    this.errorMessage("Greska pri razduzenju knjige")
                                    return;
                                  }
                                    
                                    this.book.amount = this.helpAmount
                                    this.book.genres = this.genres
                                    this.book.authors = this.authors
                                    this.book.coverPicture = this.imgURL
                                    this.book.name = this.name
                                    this.book.language = this.language
                                    this.book.publisher = this.publisher
                                    this.book.year = this.year
                                    
                                    localStorage.setItem('knjiga', JSON.stringify(this.book));
                                    
                                  
                                    return;
                              })
                            })
      
                          })
                              
                  }
                }
              }
            })
          }
        })
    }
  }



  hasDefaultPicture(book) :boolean{
    if(this.user.type!="admin")return false
    if(book.coverPicture=="") return true;
    else return false;
  }


  canAcceptReservation(username, bookId): boolean{
    
    let returnFlag: boolean = true
    let allActiveRentalsFromUser: Rental[] = []
    allActiveRentalsFromUser = this.allRentals.filter(rental=>(rental.active==true&&rental.username==username));
    
    if(allActiveRentalsFromUser.length>=3){
      returnFlag = false
    }

    allActiveRentalsFromUser.forEach(rental => {
      let date1 = new Date();
      let date2 = new Date(rental.endDate);  
      let difference = date2.getTime() - date1.getTime(); 
      if(difference<0){       
        returnFlag = false;
      }
    });




    for(let i =0; i < allActiveRentalsFromUser.length; i++) {
      if(allActiveRentalsFromUser[i].idB == bookId) returnFlag = false
    }
    if(returnFlag == true) this.helpAmount--
    return returnFlag
  
}

  back(){
    this.location.back()
  }

}
