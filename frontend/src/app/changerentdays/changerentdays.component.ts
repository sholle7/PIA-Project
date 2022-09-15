import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { GlobalsService } from '../services/globals.service';

@Component({
  selector: 'app-changerentdays',
  templateUrl: './changerentdays.component.html',
  styleUrls: ['./changerentdays.component.css']
})
export class ChangerentdaysComponent implements OnInit {

  constructor(private globalsService:GlobalsService ,private location:Location , private notificationService: NotificationsService) { }

  ngOnInit(): void {
    this.currentDays = this.globalsService.daysRent
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
  days: number
  currentDays: number

  updateDays(){
    if(!this.days){
      this.errorMessage("Niste uneli broj dana")
      return
    }
    if(this.days<1){
      this.errorMessage("Broj dana ne moze biti manji od 1")
      return
    }
     this.globalsService.daysRent = this.days
     this.currentDays = this.globalsService.daysRent
     this.successMessage("Uspesno promenjen broj dana") 
  }
  
  back(){
    this.location.back()
  }


}
