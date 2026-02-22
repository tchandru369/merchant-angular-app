import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {HttpClient} from '@angular/common/http';
import { UserI } from 'src/app/models/user.interface';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { MerchantReg } from 'src/app/models/merchantReg.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //private baseURL:string =  "http://localhost:8083/api/v1/auth";
  private baseURL:string =  "https://shop-manage-lf1a.onrender.com/api/v1/auth"

  constructor(private httpClient:HttpClient, private snackbar:MatSnackBar) { 

  }

 viewConStDtls():Observable<any>{
       
             // Add productId parameter
       return this.httpClient.get<any>(`${this.baseURL}/getConStDtls`);
     }

  createMerchant(userI : MerchantReg):Observable<UserI>{
    return this.httpClient.post<UserI>(`${this.baseURL}/merchants`,userI).pipe(
      tap((createUser:UserI) => this.snackbar.open(`User ${createUser.merchantUserName} created successfully`,'close',{
       duration: 2000,horizontalPosition:'right',verticalPosition:'top'
      })),
      catchError(e => {
        this.snackbar.open(`User could not be created ${e.error.message}`,'close',{duration:2000,horizontalPosition:'right',verticalPosition:'top'})
        return throwError(e);
      }
    )
      
    )
  }

  loginMerchantServices(userI:UserI):Observable<Object>{
    return this.httpClient.post(`${this.baseURL}/merchant-login`,userI);
  }
}
