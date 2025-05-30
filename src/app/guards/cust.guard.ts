import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../private/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustGuard implements CanActivate {

   constructor(private auth: AuthService, private router: Router){
  
    }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.auth.isCustomer()) {
      return true;
    } else {
      this.router.navigate(['private', 'user-dashboard']);
      return false;
    }
  }
  
}
