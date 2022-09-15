import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../model/book';
import { Rental } from '../model/rental';
import { User } from '../model/user';
import { BookService } from '../services/book.service';
import { RentalService } from '../services/rental.service';
import { NotificationsService } from 'angular2-notifications';
import { Location } from '@angular/common';
import { GlobalsService } from '../services/globals.service';
import { BookReservation } from '../model/bookReservation';

@Component({
  selector: 'app-rentedbooks',
  templateUrl: './rentedbooks.component.html',
  styleUrls: ['./rentedbooks.component.css']
})
export class RentedbooksComponent implements OnInit {

  constructor(private globalsService:GlobalsService, private location:Location,private notificationService: NotificationsService, private bookService:BookService, private rentalService: RentalService,private router: Router) { }

  errorMessage(err) {
    this.notificationService.error('Greska ', err, {
      position: ['bottom', 'right'],
      timeOut: 3000,
      animate: 'fade',
      
    })
  }
  successMessage(succ) {
    this.notificationService.success('Uspeh', succ, {
      position: ['bottom', 'right'],
      timeOut: 3000,
      animate: 'fade',
      
    })
  }
  
  ngOnInit(): void {
    this.reservationFlag = false
    this.user = JSON.parse(localStorage.getItem('ulogovan'))

    this.rentalService.getAllRentals().subscribe((ren: Rental[])=>{

      this.allRentals = ren
      
      this.rentalService.getAllRentalsFromUser(this.user.username).subscribe((rentals: Rental[])=>{
        this.allActiveRentalsFromUser = rentals;
        this.allActiveRentalsFromUser = this.allActiveRentalsFromUser.filter((rental) => rental.active == true)
        
        this.bookService.getAllBooks().subscribe((books: Book[])=>{
            this.allBooks = books;
            this.allActiveRentalsFromUser.forEach(rental => {
              this.allBooks.forEach(book => {
                  
                if(book.id == rental.idB){
                  let date1 = new Date();
                  let date2 = new Date(rental.endDate);  
                  let difference = date2.getTime() - date1.getTime(); 
                
                  let days = Math.round(difference / (1000 * 3600 * 24));
                  let b = JSON.parse(JSON.stringify(book));
                  this.allRentedBooks.push(b)
                  b.idRental = rental.id;
                  b.daysLeft = days                  
                }
              });
          });
          this.isLoaded=true
        })
        
      })
    })
  }
  
 

  isLoaded=false
  user: User
  allBooks: Book[]
  allBooksReservations: BookReservation[] = []
  allRentedBooks: Book[] = []
  allActiveRentalsFromUser: Rental[] = []
  allRentals: Rental[] = []
  reservationFlag: boolean = false

  hasDefaultPicture(book) :boolean{
    if(book.coverPicture=="") return true;
    else return false;
  }

  bookDetails(book: Book){
    if(this.user.status == "Blokiran"){
      this.errorMessage("Ne mozete pristupiti stranici jer je korisnik blokiran!")
      return
    }
    localStorage.removeItem('knjiga');
    localStorage.setItem('knjiga', JSON.stringify(book));
    this.router.navigate(['bookdetails'])
  }

  back(){
    this.location.back()
  }
  


  returnTheBook(book){
    this.allRentedBooks = []
    this.allActiveRentalsFromUser = []
  
    let date = new Date();
   
    let returnDate =  date.getFullYear()+ "-"  
             + ('0' + (date.getMonth()+1)).slice(-2) + '-'
             + ('0' + date.getDate()).slice(-2);
    this.bookService.getAllBooksReservations().subscribe((booksReservations : BookReservation[])=>{
      this.allBooksReservations = booksReservations
             
      this.rentalService.returnTheBook(book.id, book.idRental, returnDate).subscribe((res)=>{
        this.bookService.updateBook(book.id, 1).subscribe((res)=>{
          if(res['message']!='ok'){
            this.errorMessage("Greska pri razduzenju knjige")
            return;
          }
          this.allActiveRentalsFromUser = []
          this.allRentedBooks = []
          this.rentalService.getAllRentalsFromUser(this.user.username).subscribe((rentals: Rental[])=>{
            this.allActiveRentalsFromUser = rentals;
            this.allActiveRentalsFromUser = this.allActiveRentalsFromUser.filter((rental) => rental.active == true)
            this.bookService.getAllBooks().subscribe((books: Book[])=>{
                this.allBooks = books;
                this.allActiveRentalsFromUser.forEach(rental => {
                  this.allBooks.forEach(book => {
                    
                    if(book.id == rental.idB){
                      let date1 = new Date();
                      let date2 = new Date(rental.endDate);  
                      let difference = date2.getTime() - date1.getTime(); 
                    
                      let days = Math.round(difference / (1000 * 3600 * 24));
                      let b = JSON.parse(JSON.stringify(book));
                      this.allRentedBooks.push(b)
                      b.idRental = rental.id;
                      b.daysLeft = days
                      
                      
                    }
                  });
              });
              
              
              for(let i = 0; i<this.allBooksReservations.length; i++){
                
                if(this.reservationFlag == true) {
                  
                  break
                }
                if(this.allBooksReservations[i].idB == book.id && this.allBooksReservations[i].active == true){
                  if(this.canAcceptReservation(this.allBooksReservations[i].username, this.allBooksReservations[i].idB) == true){
                          
                          this.bookService.acceptBookReservation(this.allBooksReservations[i].id, this.allRentals.length+1).subscribe((res)=>{
                        
                            if(res['message']!='ok'){
                              this.errorMessage("Greska pri prihvatanju rezervacije knjige")
                              return;
                            }
      
                            this.rentalService.rentABook(this.allBooksReservations[i].username,this.allBooksReservations[i].idB,this.globalsService.daysRent).subscribe((res)=>{
                              if(res['message']!='ok'){
                                this.errorMessage("Greska pri prihvatanju rezervacije knjige")
                                return;
                              }
                              this.allRentedBooks = []
                              this.rentalService.getAllRentalsFromUser(this.user.username).subscribe((rentals: Rental[])=>{
                                this.allActiveRentalsFromUser = rentals;
                                this.allActiveRentalsFromUser = this.allActiveRentalsFromUser.filter((rental) => rental.active == true)
                                
                                this.bookService.getAllBooks().subscribe((books: Book[])=>{
                                    this.allBooks = books;
                                    this.allActiveRentalsFromUser.forEach(rental => {
                                      this.allBooks.forEach(book => {
                                           
                                        if(book.id == rental.idB){
                                          let date1 = new Date();
                                          let date2 = new Date(rental.endDate);  
                                          let difference = date2.getTime() - date1.getTime(); 
                                         
                                          let days = Math.round(difference / (1000 * 3600 * 24));
                                          let b = JSON.parse(JSON.stringify(book));
                                          this.allRentedBooks.push(b)
                                          b.idRental = rental.id;
                                          b.daysLeft = days
                                          
                                          
                                          
                                        }
                                      });
                                      
                                  });
                                  this.bookService.updateBook(book.id, -1).subscribe((res)=>{
                                    if(res['message']!='ok'){
                                      this.errorMessage("Greska pri razduzenju knjige")
                                      return;
                                    }
                                  })
                                  this.isLoaded=true
                                })
                                
                              })
                            })
      
                          })
                              
                  }
                }
              }
              
              
            })
            
          })
        })
      })
    })
  }


  extendTheBookRent(book){
    if(this.user.status == "Blokiran"){
      this.errorMessage("Ne mozete produziti knjigu jer je korisnik blokiran!")
      return
    }
    let id
    this.allActiveRentalsFromUser.forEach(rental => {
      if(rental.idB==book.id){
        id = rental.id
      }
    });

    this.rentalService.extendTheBook(id, this.globalsService.daysRent).subscribe((res)=>{
      if(res['message']!='ok'){
        this.errorMessage("Greska pri produzenju roka vracanja knjige")
        return;
      }
      
      

      this.successMessage("Uspesno produzenje roka vracanja knjige")
      this.allRentedBooks = []
      this.rentalService.getAllRentalsFromUser(this.user.username).subscribe((rentals: Rental[])=>{
        this.allActiveRentalsFromUser = rentals;
        this.allActiveRentalsFromUser = this.allActiveRentalsFromUser.filter((rental) => rental.active == true)
        
        this.bookService.getAllBooks().subscribe((books: Book[])=>{
            this.allBooks = books;
            this.allActiveRentalsFromUser.forEach(rental => {
              this.allBooks.forEach(book => {
                   
                if(book.id == rental.idB){
                  let date1 = new Date();
                  let date2 = new Date(rental.endDate);  
                  let difference = date2.getTime() - date1.getTime(); 
                 
                  let days = Math.round(difference / (1000 * 3600 * 24));
                  let b = JSON.parse(JSON.stringify(book));
                  this.allRentedBooks.push(b)
                  b.idRental = rental.id;
                  b.daysLeft = days
                  
                  
                  
                }
              });
          });
          this.isLoaded=true
        })
        
      })
      
    })
  }

  canExtendTheBook(b):boolean{   
    for(let i = 0; i<this.allActiveRentalsFromUser.length; i++){
      if(this.allActiveRentalsFromUser[i].idB==b.id){
        if(this.allActiveRentalsFromUser[i].hasExtended == true) return false
        else return true
      }
    }
    return false
  }

  isLate(daysLeft):boolean{
    if(daysLeft<0) return true
    else return false
  }

  canAcceptReservation(username, bookId): boolean{
    
      let returnFlag: boolean = true
      let allActiveRentalsFromUser: Rental[] = []
      if(username !=this.user.username){
      allActiveRentalsFromUser = this.allRentals.filter(rental=>(rental.active==true&&rental.username==username));
      }
      else{
         allActiveRentalsFromUser = this.allActiveRentalsFromUser.filter((rental) => rental.active == true)
      }

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
        if(allActiveRentalsFromUser[i].idB == bookId)returnFlag = false
      }
      this.reservationFlag = returnFlag
      return returnFlag
    
  }

}
