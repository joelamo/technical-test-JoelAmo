import { EventEmitter, Injectable } from '@angular/core';
import User from "../models/User";

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  private _user: User | null;
  userEmitter = new EventEmitter();
  
  baseUrl = 'http://51.38.51.187:5050/api/v1';
  
  constructor() {

    const user = localStorage.getItem('user') ? 
      JSON.parse(localStorage.getItem('user')!) : 
      sessionStorage.getItem('user')? 
      JSON.parse(sessionStorage.getItem('user')!) : 
      null;

    this._user = user;
  }

  public get user(): User | null {
    return this._user;
  }

  public set user(newUser: User | null){
    this._user = newUser;
    this.userEmitter.emit(this._user);
  }


}
