import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  
  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  getAllVotes(){
    return this.http.get(`${this.uri}/votes/getAllVotes`)
  }

  addComment(idB, username, rating, text, date, time){
    const data = {
      idB : idB,
      username: username,
      rating: rating,
      text: text,
      date: date,
      time: time
    }
    return this.http.post(`${this.uri}/votes/addComment`, data)
  }

  hasUserCommented(idB, username){
    const data = {
      idB : idB,
      username: username,
    }
    return this.http.post(`${this.uri}/votes/hasUserCommented`, data)
  }

  updateComment(id, text, rating, date, time){
    const data = {
      id : id,
      text: text,
      rating: rating,
      date: date,
      time: time
    }
    return this.http.post(`${this.uri}/votes/updateComment`, data)
  }

  
  deleteAllVotesFromUser(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/votes/deleteAllVotesFromUser`, data)
  }

  deleteAllVotesForBook(idB){
    const data = {
      idB: idB
    }
    return this.http.post(`${this.uri}/votes/deleteAllVotesForBook`, data)
  }

}
