import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/gobal/global.service';
import User from 'src/app/models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient, private globalService: GlobalService) {}

  logIn(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.globalService.baseUrl}/auth/log-in`, { email, password });
  }

  saveUser(user: User, rememberMe: boolean){
    rememberMe ? 
      localStorage.setItem('user', JSON.stringify(user)) : 
      sessionStorage.setItem('user', JSON.stringify(user));
  }

}
