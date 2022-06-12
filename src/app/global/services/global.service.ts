import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import User from "../models/User";

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  userSubject: BehaviorSubject<User>;
  
  baseUrl = 'http://51.38.51.187:5050/api/v1';
  
  constructor() {

    const user = localStorage.getItem('user') ? 
      JSON.parse(localStorage.getItem('user')!) : 
      sessionStorage.getItem('user')? 
      JSON.parse(sessionStorage.getItem('user')!) : 
      null;

    this.userSubject = new BehaviorSubject<User>(user);
  }

  public get user(): User {
    return this.userSubject.value;
  }

  public set user(newUser: User){
    this.userSubject.next(newUser);
  }


}
