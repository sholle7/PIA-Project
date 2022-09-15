import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Book } from '../model/book';
import { User } from '../model/user';
import { Vote } from '../model/vote';
import { RentalService } from '../services/rental.service';
import { VoteService } from '../services/vote.service';

@Component({
  selector: 'app-commentpage',
  templateUrl: './commentpage.component.html',
  styleUrls: ['./commentpage.component.css']
})
export class CommentpageComponent implements OnInit {

  constructor(private location:Location ,private router: Router, private rentalService: RentalService, private voteService: VoteService, private notificationService: NotificationsService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('ulogovan'))
    this.book = JSON.parse(localStorage.getItem('knjiga'))
  
  }

  errorMessage(err) {
    this.notificationService.error('Neuspesno dodavanje komentara', err, {
      position: ['bottom', 'right'],
      timeOut: 3000,
      animate: 'fade',     
    })
  }

  successMessage(success) {
    this.notificationService.success('Uspesno dodavanje komentara', success, {
      position: ['bottom', 'right'],
      timeOut: 3000,
      animate: 'fade',
    })
  }

  book: Book
  user: User
  rating :number
  comment :string
  
  addComment(){
    if(this.comment==null || this.rating==null){
      this.errorMessage("Popunite sva polja")
      return;
    }
    if(this.comment.length>1000 || this.rating<1 || this.rating>10){
      this.errorMessage("Unesite ispravne parametre")
      return;
    }

    this.voteService.hasUserCommented(this.book.id, this.user.username).subscribe((votes: Vote[])=>{

      if(votes.length > 0){
        this.errorMessage("Vec ste komentarisali i ocenili knjigu")
        return;
      }
      this.rentalService.hasUserRentedTheBook(this.book.id,this.user.username).subscribe((res)=>{
        if(res['message']=='nije'){
          this.errorMessage("Komentar mogu ostaviti samo korisnici koji su makar jednom zaduzili knjigu")
          return;
        }

        let date = new Date()
        let todayDate =  date.getFullYear()+ "-"  
             + ('0' + (date.getMonth()+1)).slice(-2) + '-'
             + ('0' + date.getDate()).slice(-2);

        let time = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()

        this.voteService.addComment(this.book.id,this.user.username,this.rating, this.comment, todayDate,time).subscribe((res)=>{
          if(res['message']!='ok'){
            this.errorMessage("Komentar mogu ostaviti samo korisnici koji su makar jednom zaduzili knjigu")
            return;
          }
          else{
            this.successMessage("Uspesno dodavanje komentara")
            return;
          }
        })
      })
    })
     
  }

  back(){
    this.location.back()
  }

}
