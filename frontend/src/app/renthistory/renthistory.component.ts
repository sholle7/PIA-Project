import { Location } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Book } from '../model/book';
import { Rental } from '../model/rental';
import { User } from '../model/user';
import { BookService } from '../services/book.service';
import { RentalService } from '../services/rental.service';


@Component({
  selector: 'app-renthistory',
  templateUrl: './renthistory.component.html',
  styleUrls: ['./renthistory.component.css']

})
export class RenthistoryComponent implements OnInit {

  constructor(private notificationService: NotificationsService, private location: Location,private rentalService: RentalService, private bookService: BookService, private router: Router) { }

  ngOnInit(): void {

    this.flagName = false
    this.flagAuthors = false
    this.flagStartDate = false
    this.flagReturnDate = false
    this.currentlySorted = ""

    this.user = JSON.parse(localStorage.getItem('ulogovan'))
    this.rentalService.getAllRentalsFromUser(this.user.username).subscribe((rentals: Rental[])=>{
      this.allRentalsFromUser = rentals;
      this.allInactiveRentalsFromUser = this.allRentalsFromUser.filter((rental) => rental.active == false)
      
      this.bookService.getAllBooks().subscribe((books: Book[])=>{
          this.allBooks = books;
          this.allInactiveRentalsFromUser.forEach(rental => {
            this.allBooks.forEach(book => {
              if(book.id == rental.idB){
                
                let b = JSON.parse(JSON.stringify(book));
                this.allRentedBooksInThePast.push(b)
                b.idRental = rental.id;
                b.startDate = rental.startDate  
                b.returnDate = rental.returnDate                                   
              }
            });
            this.allRentedBooksInThePast.sort((book1, book2)=>{
              if(book1.returnDate>book2.returnDate){
                return -1;
              }
              else{
                if(book1.returnDate == book2.returnDate){
                  return 0;
                }
                else return 1;
              }
            })
        });
      })
      
    })

  }

  errorMessage(err) {
    this.notificationService.error('Greska', err, {
      position: ['bottom', 'right'],
      timeOut: 3000,
      animate: 'fade'
    })
  }
  currentlySorted: string

  flagName: boolean
  flagAuthors: boolean
  flagStartDate: boolean
  flagReturnDate: boolean

  allBooks : Book[]
  allRentalsFromUser: Rental[] = []
  allInactiveRentalsFromUser: Rental[] = []
  user: User
  allRentedBooksInThePast: Book[] = []

  back(){
    this.location.back()
  }


  bookDetails(book :Book){
    if(this.user.status == "Blokiran"){
      this.errorMessage("Ne mozete pristupiti stranici jer je korisnik blokiran!")
      return
    }
    localStorage.removeItem('knjiga');
    localStorage.setItem('knjiga', JSON.stringify(book));
    this.router.navigate(['bookdetails'])
  }

  sortByName(){
    if(this.currentlySorted!="name"){
      this.flagName = false
    }

    this.currentlySorted="name"
    this.allRentedBooksInThePast.sort((book1, book2)=>{
      if(this.flagName == false){
        if(book1.name<book2.name){
          return -1;
        }
        else{
          if(book1.name == book2.name){
            return 0;
          }
          else return 1;
        }
      }
      else{
        if(book1.name>book2.name){
          return -1;
        }
        else{
          if(book1.name == book2.name){
            return 0;
          }
          else return 1;
        }
      }
    })
    this.flagName = !this.flagName
  }
  sortByAuthors(){
    if(this.currentlySorted!="authors"){
      this.flagAuthors = false
    }
    this.currentlySorted="authors"
    this.allRentedBooksInThePast.sort((book1, book2)=>{
      let author1 = book1.authors[0]
      let author2 = book2.authors[0]
      let authors1Fullname = author1.split(" ")
      let authors2Fullname = author2.split(" ")
      let author11Surname =  authors1Fullname[1]
      let author2Surname = authors2Fullname[1]
      if(this.flagAuthors == false){
        if(author11Surname<author2Surname){
          return -1;
        }
        else{
          if(author11Surname== author2Surname){
            return 0;
          }
          else return 1;
        }
      }
      else{
        if(author11Surname>author2Surname){
          return -1;
        }
        else{
          if(author11Surname == author2Surname){
            return 0;
          }
          else return 1;
        }
      }
      
    })
    this.flagAuthors = !this.flagAuthors
  }
  sortByStartDate(){
    if(this.currentlySorted!="startDate"){
      this.flagStartDate = false
    }
    this.currentlySorted="startDate"
    this.allRentedBooksInThePast.sort((book1, book2)=>{
      if(this.flagStartDate == false){
        if(book1.startDate>book2.startDate){
          return -1;
        }
        else{
          if(book1.startDate == book2.startDate){
            return 0;
          }
          else return 1;
        }
      }
      else{
        if(book1.startDate<book2.startDate){
          return -1;
        }
        else{
          if(book1.startDate == book2.startDate){
            return 0;
          }
          else return 1;
        }
      }
    })
    this.flagStartDate = !this.flagStartDate
  }
  sortByReturnDate(){
    if(this.currentlySorted!="returnDate"){
      this.flagReturnDate = false
    }
    this.currentlySorted="returnDate"
    this.allRentedBooksInThePast.sort((book1, book2)=>{
      if(this.flagReturnDate == false){
        if(book1.returnDate>book2.returnDate){
          return -1;
        }
        else{
          if(book1.returnDate == book2.returnDate){
            return 0;
          }
          else return 1;
        }
      }
      else{
        if(book1.returnDate<book2.returnDate){
          return -1;
        }
        else{
          if(book1.returnDate == book2.returnDate){
            return 0;
          }
          else return 1;
        }
      }
    })
    this.flagReturnDate = !this.flagReturnDate
  }
}
