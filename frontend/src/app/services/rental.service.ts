import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

 
  getAllRentals(){
    
    return this.http.get(`${this.uri}/rentals/getAllRentals`)
  }
  
  getAllRentalsFromUser(username){
    const data = {
      username:username
    }
    return this.http.post(`${this.uri}/rentals/getAllRentalsFromUser`,data)
  }
  
  returnTheBook(idB, id, returnDate){
    const data = {
      idB:idB, 
      id: id,
      returnDate: returnDate
    }
    return this.http.post(`${this.uri}/rentals/returnTheBook`,data)
  }

  userHasBook(username, idB){
    const data = {
      username:username, 
      idB: idB
    }
    return this.http.post(`${this.uri}/rentals/userHasBook`,data)
  }
 

  rentABook(username, idB, daysRent){
    const data = {
      daysRent: daysRent,
      username:username,  
      idB: idB
    }
    return this.http.post(`${this.uri}/rentals/rentABook`,data)
  }

  hasUserRentedTheBook(idB,username){
    const data = {
      idB : idB,
      username: username,
    }
    return this.http.post(`${this.uri}/rentals/hasUserRentedTheBook`, data)
  }

  isBookRented(idB){
    const data = {
      idB : idB
    }
    return this.http.post(`${this.uri}/rentals/isBookRented`, data)
  }
  userHasBookRented(username){
    const data = {
      username : username
    }
    return this.http.post(`${this.uri}/rentals/userHasBookRented`, data)
  }

  extendTheBook(id, days){
    const data = {
      id : id,
      days: days
    }
    return this.http.post(`${this.uri}/rentals/extendTheBook`, data)
  }

  deleteAllRentalsFromUser(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/rentals/deleteAllRentalsFromUser`, data)
  }

  deleteAllRentalsForBook(idB){
    const data = {
      idB: idB
    }
    return this.http.post(`${this.uri}/rentals/deleteAllRentalsForBook`, data)
  }
}
