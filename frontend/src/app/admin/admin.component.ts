import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { Book } from '../model/book';
import { User } from '../model/user';
import { BookService } from '../services/book.service';
import { GlobalsService } from '../services/globals.service';
import { RentalService } from '../services/rental.service';
import { UserService } from '../services/user.service';
import { VoteService } from '../services/vote.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private voteService: VoteService, private rentalService: RentalService, private userService:UserService, private bookService: BookService, private notificationService: NotificationsService, private router: Router ,private location: Location, private globalsService: GlobalsService) { }
 
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((users: User[])=>{
      this.allUsers = users
      this.allUsers = this.allUsers.filter(user=>user.type!="admin")
    })
    this.bookService.getAllBooks().subscribe((books: Book[])=>{
      this.allBooks = books
    })
  }
  successMessage(success) {
    this.notificationService.success('Uspeh', success, {
      position: ['bottom', 'right'],
      timeOut: 3000,
      animate: 'fade',
    })
  }
    
  errorMessage(err) {
    this.notificationService.error('Greska', err, {
      position: ['bottom', 'right'],
      timeOut: 3000,
      animate: 'fade',
      
    })
  }

  allUsers: User[] = []
  allBooks: Book[] = []

  hasDefaultPictureBook(book) :boolean{
    if(book.coverPicture=="") return true;
    else return false;
  }

  hasDefaultPictureUser(user) :boolean{
    if(user.image=="") return true;
    else return false;
  }

  addBook(){
    this.router.navigate(['addbook'])
  }

  updateBook(book){
    localStorage.setItem('knjigaZaIzmenu', JSON.stringify(book));
    this.router.navigate(['changebookinformations'])
  }

  deleteBook(book){
    this.rentalService.isBookRented(book.id).subscribe((res)=>{
      if(res['message'] == 'jeste') {
        this.errorMessage("Neuspesno brisanje - zaduzena knjiga se ne moze obrisati")
        return;
      }

      this.bookService.deleteBook(book.id).subscribe((res)=>{
        if(res['message'] == 'notok') {
          this.errorMessage("Neuspesno brisanje knjige")
          return;
        }
        else{
          this.rentalService.deleteAllRentalsForBook(book.id).subscribe((res)=>{
            if(res['message'] == 'notok') {
              this.errorMessage("Neuspesno brisanje knjige")
              return;
            }
            this.voteService.deleteAllVotesForBook(book.id).subscribe((res)=>{
              if(res['message'] == 'notok') {
                this.errorMessage("Neuspesno brisanje knjige")
                return;
              }
              this.bookService.deleteAllBooksReservationsForBook(book.id).subscribe((res)=>{
                if(res['message'] == 'notok') {
                  this.errorMessage("Neuspesno brisanje knjige")
                  return;
                }
                  this.successMessage("Uspesno brisanje knjige")
                  this.bookService.getAllBooks().subscribe((books: Book[])=>{
                    this.allBooks = books
                })
              })
            })
          })         
        }
      })
    })   
  }


  addUser(){
    this.router.navigate(['adduser'])
  }
  
  acceptUser(user){
      this.userService.acceptUser(user.username).subscribe((res)=>{
        if(res['message'] == 'notok') {
          this.errorMessage("Neuspesno prihvatanje korisnika")
          return;
        }
        else{
          this.successMessage("Uspesno prihvatanje korisnika")
          this.userService.getAllUsers().subscribe((users: User[])=>{
            this.allUsers = users
            this.allUsers = this.allUsers.filter(user=>user.type!="admin")
          })

        }
    })
  }

  rejectUser(user){
    this.userService.rejectUser(user.username).subscribe((res)=>{
      if(res['message'] == 'notok') {
        this.errorMessage("Neuspesno odbijanje korisnika")
        return;
      }
      else{
        this.successMessage("Uspesno odbijanje korisnika")
        this.userService.getAllUsers().subscribe((users: User[])=>{
          this.allUsers = users
          this.allUsers = this.allUsers.filter(user=>user.type!="admin")
        })

      }
  })
  }


  updateUser(user){
    localStorage.setItem('korisnikZaIzmenu', JSON.stringify(user));
    this.router.navigate(['changeuserinformations'])
  }

  deleteUser(user){
    this.rentalService.userHasBookRented(user.username).subscribe((res)=>{
      if(res['message'] == 'jeste') {
        this.errorMessage("Neuspesno brisanje - korisnik ima zaduzene knjige")
        return;
      }
      this.userService.deleteUser(user.username).subscribe((res)=>{
        if(res['message'] == 'notok') {
          this.errorMessage("Neuspesno brisanje korisnika")
          return;
        }
        else{
          this.voteService.deleteAllVotesFromUser(user.username).subscribe((res)=>{
            if(res['message'] == 'notok') {
              this.errorMessage("Neuspesno brisanje korisnika")
              return;
            }
            this.rentalService.deleteAllRentalsFromUser(user.username).subscribe((res)=>{
              if(res['message'] == 'notok') {
                this.errorMessage("Neuspesno brisanje korisnika")
                return;
              }
              this.bookService.deleteAllBooksRequestsFromUser(user.username).subscribe((res)=>{
                if(res['message'] == 'notok') {
                  this.errorMessage("Neuspesno brisanje korisnika")
                  return;
                }
                this.bookService.deleteAllBooksReservationsFromUser(user.username).subscribe((res)=>{
                  if(res['message'] == 'notok') {
                    this.errorMessage("Neuspesno brisanje korisnika")
                    return;
                  }
                    this.successMessage("Uspesno brisanje korisnika")
                    this.userService.getAllUsers().subscribe((users: User[])=>{
                    this.allUsers = users
                    this.allUsers = this.allUsers.filter(user=>user.type!="admin")
                  })
                })
              })
            })
          })
        }
    })
    })
  }
 

  upgradeUser(user){
    this.userService.upgradeUser(user.username).subscribe((res)=>{
      if (res['message'] == 'notok') {
        this.errorMessage("Neuspesno podizanje privilegija korisnika");
        return;
      }
      this.successMessage("Uspesno podizanje privilegija korisnika")
      this.userService.getAllUsers().subscribe((users: User[])=>{
        this.allUsers = users
        this.allUsers = this.allUsers.filter(user=>user.type!="admin")
      })

    })
  }

  downGradeUser(user){
    this.userService.downGradeUser(user.username).subscribe((res)=>{
      if (res['message'] == 'notok') {
        this.errorMessage("Neuspesno spustanje privilegija korisnika");
        return;
      }
      this.successMessage("Uspesno spustanje privilegija korisnika")
      this.userService.getAllUsers().subscribe((users: User[])=>{
        this.allUsers = users
        this.allUsers = this.allUsers.filter(user=>user.type!="admin")
      })

    })
  }

  blockUser(user){
      this.userService.blockUser(user.username).subscribe((res)=>{
      if (res['message'] == 'notok') {
        this.errorMessage("Neuspesno blokiranje korisnika");
        return;
      }
      this.successMessage("Uspesno blokiranje korisnika")
      this.userService.getAllUsers().subscribe((users: User[])=>{
        this.allUsers = users
        this.allUsers = this.allUsers.filter(user=>user.type!="admin")
      })

    })
  }

  unblockUser(user){
    this.userService.unblockUser(user.username).subscribe((res)=>{
      if (res['message'] == 'notok') {
        this.errorMessage("Neuspesno odblokiranje korisnika");
        return;
      }
      this.successMessage("Uspesno odblokiranje korisnika")
      this.userService.getAllUsers().subscribe((users: User[])=>{
        this.allUsers = users
        this.allUsers = this.allUsers.filter(user=>user.type!="admin")
      })

    })
  }

  back(){
    this.location.back()
  }

  changeRentDays(){
    this.router.navigate(['changerentdays'])
  }

}
