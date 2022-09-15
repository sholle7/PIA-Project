import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Book } from '../model/book';
import { User } from '../model/user';
import { BookService } from '../services/book.service';
import { GlobalsService } from '../services/globals.service';

@Component({
  selector: 'app-searchbooks',
  templateUrl: './searchbooks.component.html',
  styleUrls: ['./searchbooks.component.css']
})
export class SearchbooksComponent implements OnInit {

  constructor(private globalsService: GlobalsService ,private notificationService: NotificationsService,private location: Location,private bookService: BookService, private router: Router) { }

  ngOnInit(): void {
    this.hasSearched = false
    this.allGenres = this.globalsService.allGenres
    this.user = JSON.parse(localStorage.getItem('ulogovan'))

    this.authorSearchParam=""
    this.nameSearchParam=""
    this.publisherSearchParam=""

    this.bookService.getAllBooks().subscribe((b: Book[])=>{
      this.allBooks=b;
    })
  }

  errorMessage(err) {
    this.notificationService.error('Greska', err, {
      position: ['bottom', 'right'],
      timeOut: 3000,
      animate: 'fade'
    })
  }
  user: User
  allBooks :Book[] = []
  searchedBooks :Book[] = []
  allGenres: string[]
  hasSearched: boolean


  authorSearchParam :string
  authorsSearching :string []
  authorFilteredBooks: Book[] = []

  nameSearchParam :string
  nameFilteredBooks: Book[] = []

  genresSearchParam :string[]
  genresFilteredBooks: Book[] = []

  yearFromSearchParam: number
  yearFromFilteredBooks: Book[] = []

  yearToSearchParam: number
  yearToFilteredBooks: Book[] = []

  publisherSearchParam :string
  publisherFilteredBooks: Book[] = []

  hasDefaultPicture(book) :boolean{
    if(book.coverPicture=="") return true;
    else return false;
  }

  searchBooks(){
    this.hasSearched = true
    
    this.authorFilteredBooks = []
    this.nameFilteredBooks = []
    this.genresFilteredBooks = []
    this.yearFromFilteredBooks = []
    this.yearToFilteredBooks = []
    this.publisherFilteredBooks = []
    this.searchedBooks = []
    this.authorsSearching = this.authorSearchParam.split(",")

    if(!this.authorSearchParam&&!this.nameSearchParam&&!this.genresSearchParam&&this.yearFromSearchParam==null&&this.yearToSearchParam==null&&!this.publisherSearchParam) this.searchedBooks = this.allBooks
    
    //#region Filtering

    //AUTHORS FILTERING
    for(let i = 0 ; i<this.allBooks.length; i++){
        let authorsFromOneBook = this.allBooks[i].authors
        for(let j = 0; j<authorsFromOneBook.length; j++){
            for(let k =0; k<this.authorsSearching.length; k++){
            if(authorsFromOneBook[j].toLowerCase().includes(this.authorsSearching[k].toLowerCase())){
              if(!this.authorFilteredBooks.includes(this.allBooks[i]))this.authorFilteredBooks.push(this.allBooks[i])
            } 
          }
        }
    }
    //END 

    //NAME FILTERING
    this.nameFilteredBooks = this.allBooks.filter(book=>book.name.toLowerCase().includes(this.nameSearchParam.toLowerCase()));
    //END
    
    //GENRE FILTERING
    if(this.genresSearchParam && this.genresSearchParam.length>0){

      for(let i = 0 ; i<this.allBooks.length; i++){
        let genresFromOneBook = this.allBooks[i].genres
        for(let j = 0; j<genresFromOneBook.length; j++){
          if(this.genresSearchParam.includes(genresFromOneBook[j])){
            if(!this.genresFilteredBooks.includes(this.allBooks[i]))this.genresFilteredBooks.push(this.allBooks[i])
          }
        }
      }
    }
    //END

    //YEARFROM FILTERING
    this.yearFromFilteredBooks = this.allBooks.filter(book=>book.year>=this.yearFromSearchParam)
    //END

    //YEARTO FILTERING
    this.yearToFilteredBooks = this.allBooks.filter(book=>book.year<=this.yearToSearchParam)
    //END

    //PUBLISHER FILTERING
      this.publisherFilteredBooks = this.allBooks.filter(book=>book.publisher.toLowerCase().includes(this.publisherSearchParam.toLowerCase()));
    //END
    
    //#endregion

    if(!this.user || this.user.status=="Blokiran") { 

      if(this.nameSearchParam!=""){
        if(this.searchedBooks.length == 0) this.searchedBooks = this.allBooks.filter(x=>this.nameFilteredBooks.includes(x));
        else this.searchedBooks = this.searchedBooks.filter(x=>this.nameFilteredBooks.includes(x));
      }

      if(this.authorSearchParam!=""){    
        if(this.searchedBooks.length == 0 && this.nameSearchParam!="")this.searchedBooks=[]
        else if(this.searchedBooks.length == 0 && this.nameSearchParam==""){
           this.searchedBooks = this.allBooks.filter(x=>this.authorFilteredBooks.includes(x));
        }
        else this.searchedBooks = this.searchedBooks.filter(x=>this.authorFilteredBooks.includes(x));      
      }
    }

    else {
        if(this.nameSearchParam!=""){

          if(this.searchedBooks.length == 0) this.searchedBooks = this.allBooks.filter(x=>this.nameFilteredBooks.includes(x));
          else this.searchedBooks = this.searchedBooks.filter(x=>this.nameFilteredBooks.includes(x));
       
        }

        if(this.authorSearchParam!=""){
         
          if(this.searchedBooks.length == 0 && this.nameSearchParam!="")this.searchedBooks=[]
          else if(this.searchedBooks.length == 0 && this.nameSearchParam==""){
             this.searchedBooks = this.allBooks.filter(x=>this.authorFilteredBooks.includes(x));
          }
          else this.searchedBooks = this.searchedBooks.filter(x=>this.authorFilteredBooks.includes(x));
        
        }

        if(this.genresSearchParam && this.genresSearchParam.length>0){
            if(this.searchedBooks.length == 0 && (this.nameSearchParam!="" || this.authorSearchParam!=""))this.searchedBooks=[]
            else if(this.searchedBooks.length == 0 && (this.nameSearchParam=="" && this.authorSearchParam=="")){
                this.searchedBooks = this.allBooks.filter(x=>this.genresFilteredBooks.includes(x));
            }
            else this.searchedBooks = this.searchedBooks.filter(x=>this.genresFilteredBooks.includes(x));
        }
        
        if(this.yearFromSearchParam != null){
            if(this.searchedBooks.length == 0 && (this.nameSearchParam!="" || this.authorSearchParam!=""||this.genresSearchParam||this.genresSearchParam?.length>0))this.searchedBooks=[]
            else if(this.searchedBooks.length == 0 && (this.nameSearchParam=="" && this.authorSearchParam=="" && this.genresSearchParam==null))
            this.searchedBooks = this.allBooks.filter(x=>this.yearFromFilteredBooks.includes(x));
            else this.searchedBooks = this.searchedBooks.filter(x=>this.yearFromFilteredBooks.includes(x));
        }

        if(this.yearToSearchParam != null){
            if(this.searchedBooks.length == 0 && (this.nameSearchParam!="" || this.authorSearchParam!=""||this.genresSearchParam||this.genresSearchParam?.length>0||this.yearFromSearchParam))this.searchedBooks=[]
            else if(this.searchedBooks.length == 0 && (this.nameSearchParam=="" && this.authorSearchParam=="" && this.genresSearchParam==null && this.yearFromSearchParam==null))
            this.searchedBooks = this.allBooks.filter(x=>this.yearToFilteredBooks.includes(x));
            else this.searchedBooks = this.searchedBooks.filter(x=>this.yearToFilteredBooks.includes(x));
        }

        if(this.publisherSearchParam!=""){
            if(this.searchedBooks.length == 0 && (this.nameSearchParam!="" || this.authorSearchParam!=""||this.genresSearchParam||this.genresSearchParam?.length>0||this.yearFromSearchParam||this.yearToSearchParam))this.searchedBooks=[]
            else if(this.searchedBooks.length == 0 && (this.nameSearchParam=="" && this.authorSearchParam=="" && this.genresSearchParam==null && this.yearFromSearchParam==null && this.yearToSearchParam==null))
            this.searchedBooks = this.allBooks.filter(x=>this.publisherFilteredBooks.includes(x));
            else this.searchedBooks = this.searchedBooks.filter(x=>this.publisherFilteredBooks.includes(x));
        }
    }
  }

  back(){
    this.location.back()
  }

  bookDetails(book: Book){
    if(!this.user){
      this.errorMessage("Ne mozete pristupiti stranici jer niste ulogovani!")
      return
    }
    if(this.user.status == "Blokiran"){
      this.errorMessage("Ne mozete pristupiti stranici jer je korisnik blokiran!")
      return
    }
      localStorage.removeItem('knjiga');
      localStorage.setItem('knjiga', JSON.stringify(book));
      this.router.navigate(['bookdetails'])
  }


}
