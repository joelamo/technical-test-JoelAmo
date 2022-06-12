import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import User from '../global/models/User';
import { GlobalService } from '../global/services/global.service';

@Injectable({
  providedIn: 'root'
})
export class UsersGuard implements CanActivate, CanLoad {
  user: User | null;
  constructor(private globalService: GlobalService, private router: Router){
    this.user = this.globalService.user;
    this.globalService.userEmitter.subscribe(user => this.user = user);
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.user?.id) return true;
    this.router.navigate(['/login']);
    return false;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.user?.id) return true;
    this.router.navigate(['/login']);
    return false;
  }
}
