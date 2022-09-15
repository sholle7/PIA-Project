import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Book } from '../model/book';
import { BookRequest } from '../model/bookRequest';
import { BookReservation } from '../model/bookReservation';
import { Rental } from '../model/rental';
import { User } from '../model/user';
import { Vote } from '../model/vote';
import { BookService } from '../services/book.service';
import { RentalService } from '../services/rental.service';
import { VoteService } from '../services/vote.service';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {

  constructor(private rentalService: RentalService ,private notificationService: NotificationsService ,private router:Router, private bookService:BookService, private voteService: VoteService) { }
  
  infoMessage(info) {
    this.notificationService.info('Obavestenje', info, {
      position: ['bottom', 'right'],
      timeOut: 5000,
      animate: 'fade'
    })
  }

  permanentInfoMessage(info) {
    this.notificationService.info('Obavestenje', info, {
      position: ['top', 'left'],
      timeOut: 0,
      animate: 'fade',
      clickToClose: true
    })
  }
 
  warnMessage(warning) {
    this.notificationService.warn('Upozorenje', warning, {
      position: ['bottom', 'right'],
      timeOut: 5000,
      animate: 'fade'
    })
  }
 
  errorMessage(err) {
    this.notificationService.error('Greska', err, {
      position: ['bottom', 'right'],
      timeOut: 3000,
      animate: 'fade'
    })
  }



  ngOnInit(): void {
    
    this.user = JSON.parse(localStorage.getItem('ulogovan'))
    this.averageGrade = 0;
    this.randomBook = null
    this.bookService.getAllBooks().subscribe((b: Book[])=>{
      this.allBooks = b;
      let bookLength = this.allBooks.length;
      let randomIndex= Math.floor(Math.random() * (bookLength));
      this.randomBook = this.allBooks[randomIndex];
      this.voteService.getAllVotes().subscribe((v: Vote[])=>{
        this.allVotes=v;
        let counter = 0;
        this.allVotes.forEach(element => {
          if(element.idB == randomIndex+1){
            this.averageGrade+=element.rating
            counter++;
          }
        });
        if(this.averageGrade>0) this.averageGrade/=counter;
        this.averageGrade =  parseFloat(this.averageGrade.toFixed(2))
        
        this.sendNotifications();
      })
    })
  }

  user: User
  allBooks :Book[] = []
  randomBook : Book
  averageGrade: number
  allVotes: Vote[] = []
  searchedBooks: Book[] = []

  hasDefaultPicture() :boolean{
    if(this.randomBook==null)return false;
    if(this.randomBook.coverPicture=="") return true;
    else return false;
  }

  navigateToSearchBookPage(){
    this.router.navigate(['searchbooks']); 
  }

  navigateToRentedBooksPage(){
    this.router.navigate(['rentedbooks']); 
  }

  navigateToRentHistoryPage(){
    this.router.navigate(['renthistory']); 
  }
  navigateToAddBookPage(){
    if(this.user.status == "Blokiran"){
      this.errorMessage("Ne mozete pristupiti stranici jer je korisnik blokiran!")
      return
    }
    this.router.navigate(['addbook'])
  }
  
  navigateToBookRequestsPage(){
    if(this.user.status == "Blokiran"){
      this.errorMessage("Ne mozete pristupiti stranici jer je korisnik blokiran!")
      return
    }
    this.router.navigate(['bookrequests'])
  }


  sendNotifications(){
      this.checkRentals();
      this.checkIsReservedBookAvailable();
      this.checkIsBookAccepted();
      this.checkIsUserBlocked();
    
  }

  checkRentals(){
    this.rentalService.getAllRentalsFromUser(this.user.username).subscribe((rentals: Rental[])=>{
      let counter = 0
      rentals.forEach(rental => {
          let date1 = new Date();
          let date2 = new Date(rental.endDate);  
          let difference = date2.getTime() - date1.getTime();                   
          let days = Math.round(difference / (1000 * 3600 * 24));
          
          if(rental.active == true && days>-1 && days <3) this.infoMessage("Rok za vracanje knjige istice za 2 ili manje dana")
          if(rental.active == true && days < 0) this.warnMessage("Rok za vracanje knjige je istekao")
          if(rental.active == true) counter ++;
      });  
        if(counter == 3) this.infoMessage("Korisnik ima maksimalan broj knjiga na zaduzenju - 3")
    })
  }

  checkIsReservedBookAvailable(){
    this.bookService.getAllBooksReservations().subscribe((booksReservations: BookReservation[])=>{
      this.rentalService.getAllRentalsFromUser(this.user.username).subscribe((rentals: Rental[])=>{

        booksReservations.forEach(reservation => {
          if(reservation.username==this.user.username && reservation.active == false){
            rentals.forEach(rental => {
              if(rental.id == reservation.idR && rental.active==true)
              this.infoMessage("Knjiga koju je korisnik rezervisao je dodata u listu zaduzenih knjiga")
            });
            
          }
        });
      })
    })
  }

  checkIsBookAccepted(){
    this.bookService.getAllBooksRequests().subscribe((bookReqs: BookRequest[])=>{
      bookReqs.forEach(req => {
        if(req.username == this.user.username && req.status=="Prihvacen"){
          this.permanentInfoMessage("Dodata je knjiga koju ste predlozili")
          return
        }
      });
    })
  }
  checkIsUserBlocked(){
    if(this.user.status=="Blokiran") this.warnMessage("Korisnik je blokiran od strane administratora")
  }

}
