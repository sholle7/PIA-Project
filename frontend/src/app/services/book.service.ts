import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

 
  getAllBooks(){
    
    return this.http.get(`${this.uri}/books/getAllBooks`)
  }
  
  updateBook(id, amount){
    const data = {
      id: id,
      amount: amount
    }
    return this.http.post(`${this.uri}/books/updateBook`, data)
  }

  addBook(name, publisher, year, language, coverPicture, authors, genres, amount){
    const data = {
      name: name,
      publisher: publisher,
      year: year,
      language: language,
      coverPicture: coverPicture,
      authors: authors,
      genres: genres,
      amount:amount
    }
    return this.http.post(`${this.uri}/books/addBook`, data)
  }

  changeBookInfo(id, name, publisher, year, language, coverPicture, authors, genres, amount){
    const data = {
      id: id,
      name: name,
      publisher: publisher,
      year: year,
      language: language,
      coverPicture: coverPicture,
      authors: authors,
      genres: genres,
      amount:amount
    }
    return this.http.post(`${this.uri}/books/changeBookInfo`, data)
  }
  
  deleteBook(id){
    const data = {
      id: id
    }
    return this.http.post(`${this.uri}/books/deleteBook`, data)
  }

  addBookRequest(name, publisher, year, language, coverPicture, status, authors, genres, amount,username){
    const data = {
      name: name,
      publisher: publisher,
      year: year,
      language: language,
      coverPicture: coverPicture,
      status: status,
      authors: authors,
      genres: genres,
      amount:amount,
      username: username
    }
    return this.http.post(`${this.uri}/books/addBookRequest`, data)
  }

  getAllBooksRequests(){
    
    return this.http.get(`${this.uri}/books/getAllBooksRequests`)
  }
  acceptBookRequest(id){
      const data = {
        id: id
      }
      return this.http.post(`${this.uri}/books/acceptBookRequest`, data)
  }

  rejectBookRequest(id){
    const data = {
      id: id
    }
    return this.http.post(`${this.uri}/books/rejectBookRequest`, data)
  }

  reserveABook(idB, username){
    const data = {
      idB: idB,
      username: username
    }
    return this.http.post(`${this.uri}/books/reserveABook`, data)
  }
  
  getAllBooksReservations(){
    
    return this.http.get(`${this.uri}/books/getAllBooksReservations`)
  }
  
  acceptBookReservation(id, idR){
    const data = {
      id: id,
      idR : idR
    }
    return this.http.post(`${this.uri}/books/acceptBookReservation`, data)
  }

  deleteAllBooksReservationsFromUser(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/books/deleteAllBooksReservationsFromUser`, data)
  }

  deleteAllBooksRequestsFromUser(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/books/deleteAllBooksRequestsFromUser`, data)
  }

  deleteAllBooksReservationsForBook(idB){
    const data = {
      idB: idB
    }
    return this.http.post(`${this.uri}/books/deleteAllBooksReservationsForBook`, data)
  }
}
