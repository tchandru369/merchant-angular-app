import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EncryptionService } from './encryption.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  

  private baseURL:string =  "http://localhost:8083/services/v1/products"

  constructor(private httpClient:HttpClient,private encService:EncryptionService) { }

  addProduct(arrayData:any[]):Observable<any>{

    const token = this.encService.decrypt(sessionStorage.getItem('jwtToken')||'');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Bearer token
      'Content-Type': 'application/json'   // Set the content type to application/json
    });
    console.log(token);
    console.log(arrayData);
    return this.httpClient.post<any>(`${this.baseURL}/addProduct`,arrayData,{headers});
  }

  viewProduct(ownerEmail:string):Observable<any>{
    const token = this.encService.decrypt(sessionStorage.getItem('jwtToken')||'');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Bearer token
      'Content-Type': 'application/json'   // Set the content type to application/json
    });

    const params = new HttpParams()
      .set('name', ownerEmail);        // Add productId parameter
    return this.httpClient.get<any>(`${this.baseURL}/viewProducts`,{headers,params});
  }

  
  viewDemandProduct(ownerEmail:string):Observable<any>{
    const token = this.encService.decrypt(sessionStorage.getItem('jwtToken')||'');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Bearer token
      'Content-Type': 'application/json'   // Set the content type to application/json
    });

    const params = new HttpParams()
      .set('name', ownerEmail);        // Add productId parameter
    return this.httpClient.get<any>(`${this.baseURL}/viewDemandPrd`,{headers,params});
  }

  

  updateProduct(data:any):Observable<any>{
    const token = this.encService.decrypt(sessionStorage.getItem('jwtToken')||'');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Bearer token
      'Content-Type': 'application/json'   // Set the content type to application/json
    });

    const params = new HttpParams()
      .set('name', data);        // Add productId parameter
    return this.httpClient.post<any>(`${this.baseURL}/updateProduct`,data,{headers});
  }

  addMilkProduct(arrayData:any[]):Observable<any>{

    const token = this.encService.decrypt(sessionStorage.getItem('jwtToken')||'');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Bearer token
      'Content-Type': 'application/json'   // Set the content type to application/json
    });
    console.log(token);
    console.log(arrayData);
    return this.httpClient.post<any>(`${this.baseURL}/addMilkProd`,arrayData,{headers});
  }

  getMilkProduct():Observable<any>{
    const token = this.encService.decrypt(sessionStorage.getItem('jwtToken')||'');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Bearer token
      'Content-Type': 'application/json'   // Set the content type to application/json
    });
      // Add productId parameter
    return this.httpClient.get<any>(`${this.baseURL}/getComDtls`,{headers});
  }

  viewOwnerMilkProd(ownerEmail:string):Observable<any>{
    const token = this.encService.decrypt(sessionStorage.getItem('jwtToken')||'');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Bearer token
      'Content-Type': 'application/json'   // Set the content type to application/json
    });

    const params = new HttpParams()
      .set('name', ownerEmail);        // Add productId parameter
    return this.httpClient.get<any>(`${this.baseURL}/viewMilkProducts`,{headers,params});
  }

  updateMilkProd(data:any):Observable<any>{
    const token = this.encService.decrypt(sessionStorage.getItem('jwtToken')||'');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Bearer token
      'Content-Type': 'application/json'   // Set the content type to application/json
    });
       // Add productId parameter
    return this.httpClient.post<any>(`${this.baseURL}/updateMilkPrd`,data,{headers});
  }

  deleteMilkProd(data:any):Observable<any>{
    const token = this.encService.decrypt(sessionStorage.getItem('jwtToken')||'');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Bearer token
      'Content-Type': 'application/json'   // Set the content type to application/json
    });      // Add productId parameter
    return this.httpClient.post<any>(`${this.baseURL}/deleteMilkPrd`,data,{headers});
  }
}
