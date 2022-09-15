import { Component, OnInit } from '@angular/core';
import { Book } from '../model/book';
import { User } from '../model/user';
import { RentalService } from '../services/rental.service';
import { BookService } from '../services/book.service';
import { Rental } from '../model/rental';


import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit {
  
  constructor(private config: NgbCarouselConfig ,private bookService: BookService, private rentalService: RentalService) { }

  ngOnInit(): void {
    this.isLoaded = false
    

    this.images = []
    this.loggedUser = JSON.parse(localStorage.getItem('ulogovan'))
    this.bookService.getAllBooks().subscribe((books: Book[])=>{
      this.allBooks = books;
    
    this.rentalService.getAllRentals().subscribe((rentals: Rental[])=>{
      this.allRentals = rentals
      let mp = new Map();
 
      for (let i = 0; i < this.allRentals.length; i++) {
   
          if (mp.has(this.allRentals[i].idB)) {
              mp.set(this.allRentals[i].idB, mp.get(this.allRentals[i].idB) + 1)
          } else {
              mp.set(this.allRentals[i].idB, 1)
          }
      }
      let list = [...mp];
      list.sort((o1, o2) => {
          if (o1[1] == o2[1])
              return o2[0] - o1[0];
          else
              return o2[1] - o1[1];
      })
      for (let i = 0; i < 3; i++)  this.indexesOfTop3Books[i] = list[i][0];

      let k=0;
      this.indexesOfTop3Books.forEach(index => {
        this.allBooks.forEach(element => {
          if(index == element.id) {
            this.top3Books[k++]=element
            
            this.images.push(this.top3Books[k-1].coverPicture)
          }
        });
      });
      this.isLoaded = true
      })
    })
  }

  images = []
  indexesOfTop3Books: number[] = []
  top3Books : Book[] = []
  loggedUser : User
  allBooks : Book[]
  allRentals : Rental[]
  isLoaded: boolean

  hasDefaultPicture(book) :boolean{
    if(book.coverPicture=="")return true;
    else return false;
  }

}
