import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalService } from '../global/services/global.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private globalService: GlobalService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.globalService.user;

    const accessToken = user ? user.accessToken : null;

    if(!accessToken) return next.handle(req);

    const request = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${ accessToken }`)
    })
    return next.handle(request)
  }
}
