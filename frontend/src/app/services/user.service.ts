import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000'

  register(username, password, fullName, address, email, telephone, image,status, type){

    const data = {
      username: username,
      password: password,
      fullName: fullName,
      address: address,
      email: email,
      telephone: telephone,
      image: image,
      status:status,
      type : type
    }

    return this.http.post(`${this.uri}/users/register`, data)
  }
  usernameExists(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/users/usernameExists`, data)
  }
  emailExists(email){
    const data = {
      email: email
    }
    return this.http.post(`${this.uri}/users/emailExists`, data)
  }
  login(username, password){
    const data = {
      username: username,
      password: password
    }
    return this.http.post(`${this.uri}/users/login`, data)
  }
  changePassword(username, newpassword){
    const data = {
      username: username,
      newpassword: newpassword
    }
    return this.http.post(`${this.uri}/users/changePassword`, data)
  }

  adminLogin(username, password){
    const data = {
      username: username,
      password: password
    }
    return this.http.post(`${this.uri}/users/adminLogin`, data)
  }
  
  getAllUsers(){
    return this.http.get(`${this.uri}/users/getAllUsers`)
  }

  acceptUser(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/users/acceptUser`, data)
  }
  deleteUser(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/users/deleteUser`, data)
  }

  changeUser(id,username, password, fullName, address, email, telephone, image,status, type){
    const data = {
      id: id,
      username: username,
      password: password,
      fullName: fullName,
      address: address,
      email: email,
      telephone: telephone,
      image: image,
      status:status,
      type : type
    }
    return this.http.post(`${this.uri}/users/changeUser`, data)
  }
  rejectUser(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/users/rejectUser`, data)
  }

  upgradeUser(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/users/upgradeUser`, data)
  }

  downGradeUser(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/users/downGradeUser`, data)
  }

  blockUser(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/users/blockUser`, data)
  }
  
  unblockUser(username){
    const data = {
      username: username
    }
    return this.http.post(`${this.uri}/users/unblockUser`, data)
  }

}
