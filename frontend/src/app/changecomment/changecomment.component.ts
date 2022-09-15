import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Vote } from '../model/vote';
import { VoteService } from '../services/vote.service';

@Component({
  selector: 'app-changecomment',
  templateUrl: './changecomment.component.html',
  styleUrls: ['./changecomment.component.css']
})
export class ChangecommentComponent implements OnInit {

  constructor(private voteService: VoteService ,private notificationService:NotificationsService, private location:Location ,private router: Router) { }

  ngOnInit(): void {
    this.vote = JSON.parse(localStorage.getItem('komentar'))
    this.comment = this.vote.text
    this.rating = this.vote.rating
  }
  errorMessage(err) {
    this.notificationService.error('Greska', err, {
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

  vote: Vote
  comment: string
  rating :number

  updateComment(){
    if(this.comment==null || this.rating==null){
      this.errorMessage("Popunite sva polja")
      return;
    }
    if(this.comment.length>1000 || this.rating<1 || this.rating>10){
      this.errorMessage("Unesite ispravne parametre")
      return;
    }

    let date = new Date()
    let todayDate =  date.getFullYear()+ "-"  
         + ('0' + (date.getMonth()+1)).slice(-2) + '-'
         + ('0' + date.getDate()).slice(-2);

    let time = date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()

    this.voteService.updateComment(this.vote.id, this.comment, this.rating, todayDate, time).subscribe((res)=>{
      if (res['message'] == 'notok') {
        this.errorMessage("Neuspesno promenjen komentar");
        return;
      }
      else this.successMessage("Uspesno promenjen komentar");
    })
  }

  back(){
    this.location.back()
  }

}
