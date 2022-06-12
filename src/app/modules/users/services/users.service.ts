import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/global/services/global.service';
import UsersApiModel from '../models/UsersApiModel';
import UserViewModel from '../models/UserViewModel';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, private globalService: GlobalService) {}

  getUserData(): Observable<UserViewModel> {
    return this.http.get<any>(`${this.globalService.baseUrl}/users/me`);
  }

  getUsers():Observable<UsersApiModel>{
    return this.http.get<UsersApiModel>(`${this.globalService.baseUrl}/users`);
  }
}
