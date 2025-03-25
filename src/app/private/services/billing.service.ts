import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

   private productURL:string =  "http://34.47.181.185:8083/services/v1/products"
   private customerURL:string = "http://34.47.181.185:8083/services/v1/customer"
   private billingURL:string = "http://34.47.181.185:8083/services/v1/billing"

  constructor(private httpClient : HttpClient) { }


    viewProduct(ownerEmail:string):Observable<any>{
      const token = sessionStorage.getItem('jwtToken');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,  // Bearer token
        'Content-Type': 'application/json'   // Set the content type to application/json
      });
  
      const params = new HttpParams()
        .set('name', ownerEmail);        // Add productId parameter
      return this.httpClient.get<any>(`${this.productURL}/viewProducts`,{headers,params});
    }

    validateCustomerByPhNo(customerPhNo:string):Observable<any>{
      const token = sessionStorage.getItem('jwtToken');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,  // Bearer token
        'Content-Type': 'application/json'   // Set the content type to application/json
      });
  
      const params = new HttpParams()
        .set('custPhNo', customerPhNo);        // Add productId parameter
      return this.httpClient.get<any>(`${this.customerURL}/getCustomer`,{headers,params});
    }

    registerCustomer(customerData:any):Observable<any>{

      const token = sessionStorage.getItem('jwtToken');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,  // Bearer token
        'Content-Type': 'application/json'   // Set the content type to application/json
      });
      console.log(token);
      console.log(customerData);
      return this.httpClient.post<any>(`${this.customerURL}/saveCustomer`,customerData,{headers});
    }
   

    payBillCustomer(billingData:any):Observable<any>{

      const token = sessionStorage.getItem('jwtToken');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,  // Bearer token
        'Content-Type': 'application/json'   // Set the content type to application/json
      });
      console.log(token);
      console.log(billingData);
      return this.httpClient.post<any>(`${this.billingURL}/billCustomer`,billingData,{headers});
    }

    viewBillHistory(ownerEmail:string):Observable<any>{
      const token = sessionStorage.getItem('jwtToken');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,  // Bearer token
        'Content-Type': 'application/json'   // Set the content type to application/json
      });
  
      const params = new HttpParams()
        .set('email', ownerEmail);        // Add productId parameter
      return this.httpClient.get<any>(`${this.billingURL}/viewBillHistory`,{headers,params});
    }
    

}
