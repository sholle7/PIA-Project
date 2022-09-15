import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../model/book';
import { User } from '../model/user';
import { RentalService } from '../services/rental.service';
import { NotificationsService } from 'angular2-notifications';
import { Rental } from '../model/rental';
import { BookService } from '../services/book.service';
import { VoteService } from '../services/vote.service';
import { Vote } from '../model/vote';
import { Location } from '@angular/common';
import { GlobalsService } from '../services/globals.service';

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
  // encapsulation: ViewEncapsulation.None
})

export class BookdetailsComponent implements OnInit {

  constructor(private globalsSerivice: GlobalsService,private location: Location,private voteService: VoteService ,private bookService: BookService, private notificationService: NotificationsService, private router: Router, private rentalService: RentalService) { }
 
  ngOnInit(): void {
    this.averageGrade = 0
    this.user = JSON.parse(localStorage.getItem('ulogovan'))
    this.book = JSON.parse(localStorage.getItem('knjiga'))
    this.bookService.getAllBooks().subscribe((books: Book[])=>{
      this.allBooks = books
      this.allBooks.forEach(b => {
        if(b.name == this.book.name)this.book = b
      });

      this.voteService.getAllVotes().subscribe((v: Vote[])=>{
        
        this.allVotes=v;
        this.allVotes.sort((vote1, vote2)=>{
          if(vote1.date>vote2.date){
            return -1;
          }
          else{
            if(vote1.date == vote2.date){
              return 0;
            }
            else return 1;
          }
        })
        let counter = 0;
        this.allVotes.forEach(vote => {
          if(vote.idB == this.book.id){          
            this.allVotesFromUser.push(vote)
            this.averageGrade+=vote.rating
            counter++;
          }
        });
        if(this.averageGrade!=0) this.averageGrade/=counter;
          this.averageGrade =  parseFloat(this.averageGrade.toFixed(2))

      })
      
      this.rentalService.getAllRentalsFromUser(this.user.username).subscribe((rentals : Rental[])=>{
          this.allRentalsFromUser = rentals
      })

      this.rentalService.userHasBook(this.user.username, this.book.id).subscribe((res)=>{
        if(res['message']=='ima'){
          
            this.userHasBook = true
        }
        else{
          this.userHasBook =false
        }
      })
    })


    
  }

    
  errorMessage(err) {
    this.notificationService.error('Neuspeh', err, {
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

  userHasBook : boolean
  user: User
  book: Book
  allRentalsFromUser: Rental[] = []
  averageGrade: number
  allVotes: Vote[] = []
  allVotesFromUser: Vote[] = []
  allBooks: Book[] = []

  hasDefaultPicture(book) :boolean{
    if(book.coverPicture=="") return true;
    else return false;
  }

  flag : boolean = false
  rentABook(){
    let flag: boolean
    
    let allActiveRentalsFromUser: Rental[] = []
      allActiveRentalsFromUser = this.allRentalsFromUser.filter(rental=>rental.active==true);
      if(allActiveRentalsFromUser.length>=3){
        this.errorMessage("Mozete imati maksimalno 3 zaduzene knjige")
        return;
      }
      allActiveRentalsFromUser.forEach(rental => {
        let date1 = new Date();
        let date2 = new Date(rental.endDate);  
        let difference = date2.getTime() - date1.getTime(); 
        if(difference<0){
          this.errorMessage("Ne mozete da zaduzite novu knjigu sve dok ne vratite ostale kojima je istekao rok")
          flag = true;
          
        }
        

      });
      if(flag == true)return;

        this.rentalService.rentABook(this.user.username, this.book.id, this.globalsSerivice.daysRent).subscribe((res)=>{
          if(res['message']=='ok'){
            this.bookService.updateBook(this.book.id, -1).subscribe((res)=>{
              if(res['message']!='ok'){
                this.errorMessage("Greska pri zaduzenju knjige")
                return;
              }
              
              this.router.navigate(['bookdetails'])
                  .then(() => {
                  window.location.reload();
                  
              });
              
            })
          }
          else{
            this.errorMessage("Greska pri zaduzenju knjige")
            return;
          }
        })
      
    
  }

  canRent(): boolean{
    
    if(this.book.amount>0 && this.userHasBook==false)return true
    return false;
  }

  canReserve(): boolean{
    if(this.book.amount<=0 && this.userHasBook==false)return true
    return false;
  }

  navigateToCommentPage(){
    this.router.navigate(['commentpage'])
  }

  isModerator() :boolean{
    if(this.user.type=="moderator") return true;
    else return false;
  }

  changeBookInformations(){
      this.router.navigate(['changebookinformations'])
  }
  updateComment(v){
      localStorage.setItem('komentar', JSON.stringify(v));
      this.router.navigate(['changecomment'])
  }

  reserveABook(){
    this.bookService.reserveABook(this.book.id, this.user.username).subscribe((res)=>{
      if (res['message'] == 'notok') {
        this.errorMessage("Neuspesno rezervisanje knjige");
        return;
      }
      this.successMessage("Uspesno rezervisanje knjige")
    })
  }

  displayStars(rating: number): string{
    let returnString: string = ""
    while(rating>0){
      returnString+=("<div class='fa fa-star star'></div>")
      rating--
    }

    return returnString
  }

  back(){
    this.location.back()
  }
  
}
