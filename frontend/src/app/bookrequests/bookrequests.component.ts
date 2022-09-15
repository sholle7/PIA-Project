import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { BookRequest } from '../model/bookRequest';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-bookrequests',
  templateUrl: './bookrequests.component.html',
  styleUrls: ['./bookrequests.component.css']
})
export class BookrequestsComponent implements OnInit {

  constructor(private location: Location,private bookService: BookService, private notificationService: NotificationsService) { }

  ngOnInit(): void {
    this.bookService.getAllBooksRequests().subscribe((bookrequests: BookRequest[])=>{
        this.allActiveBookRequests = bookrequests
        this.allActiveBookRequests = this.allActiveBookRequests.filter(bookReq => bookReq.status=="Neobradjen")
        this.isLoaded=true
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

  isLoaded=false
  allActiveBookRequests: BookRequest[] = []

  acceptBookRequest(bookReq){
    this.bookService.acceptBookRequest(bookReq.id).subscribe((res)=>{
      if (res['message'] == 'notok') {
        this.errorMessage("Neuspesno prihvatanje knjige");
        return;
      }
      else{
        this.bookService.addBook(bookReq.name,bookReq.publisher,bookReq.year,bookReq.language,bookReq.coverPicture,bookReq.authors,bookReq.genres,bookReq.amount).subscribe((res)=>{
          if (res['message'] == 'notok') {
            this.errorMessage("Neuspesno prihvatanje knjige");
            return;
          }
         
          this.bookService.getAllBooksRequests().subscribe((bookrequests: BookRequest[])=>{
            this.successMessage("Uspesno prihvatanje knjige");
            this.allActiveBookRequests = bookrequests
            this.allActiveBookRequests = this.allActiveBookRequests.filter(bookReq => bookReq.status=="Neobradjen")    
        })
        })
        
      }
    })
  }

  rejectBookRequest(bookReq){
    this.bookService.rejectBookRequest(bookReq.id).subscribe((res)=>{
      if (res['message'] == 'notok') {
        this.errorMessage("Neuspesno odbijanje knjige");
        return;
      }
      else{
        
        this.bookService.getAllBooksRequests().subscribe((bookrequests: BookRequest[])=>{
          this.successMessage("Uspesno odbijanje knjige");
          this.allActiveBookRequests = bookrequests
          this.allActiveBookRequests = this.allActiveBookRequests.filter(bookReq => bookReq.status=="Neobradjen")
      })
      }
    })
  }







  hasDefaultPicture(book) :boolean{
    if(book.coverPicture=="") return true;
    else return false;
  }

  back(){
    this.location.back()
  }
  
}
