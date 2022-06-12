import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/global/services/global.service';
import User from 'src/app/global/models/User';
import UserApiModel from 'src/app/modules/auth/models/UserApiModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(
    private http: HttpClient, 
    private globalService: GlobalService,
  ) {}

  logIn(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.globalService.baseUrl}/auth/log-in`, { email, password });
  }

  logout(){
    this.globalService.user = null;
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
  }

  saveUser(user: User, rememberMe: boolean){
    rememberMe ? 
      localStorage.setItem('user', JSON.stringify(user)) : 
      sessionStorage.setItem('user', JSON.stringify(user));
  }

  signUp(user: UserApiModel){
    return this.http.post<any>(`${this.globalService.baseUrl}/auth/sign-up`, user);
  }
}
