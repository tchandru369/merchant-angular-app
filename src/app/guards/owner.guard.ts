import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../private/services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class OwnerGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     if (this.auth.isUser()) {
      return true;
    } else {
      this.router.navigate(['private', 'cust-dashboard']);
      return false;
    }
  }
  constructor(private auth: AuthService, private router: Router){

  }
  
}
