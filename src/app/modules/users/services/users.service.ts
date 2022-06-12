import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from 'src/app/gobal/global.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, private globalService: GlobalService) {}

  getUserData(): Observable<any> {
    return this.http.get<any>(`${this.globalService.baseUrl}/users/me`);
  }
}
