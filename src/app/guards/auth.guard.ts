import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { EncryptionService } from '../private/services/encryption.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router:Router,private jwtService : JwtHelperService,private encService:EncryptionService){
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = this.encService.decrypt(sessionStorage.getItem('jwtToken')||'');
    console.log("Token in auth guard",token);
     console.log(this.jwtService.isTokenExpired(token));
      if (this.jwtService.isTokenExpired(token)){
        this.router.navigate(['']);
        return false;
      }else{
      // this.router.navigate(['']);
        return true;
      }
  }
  
}
