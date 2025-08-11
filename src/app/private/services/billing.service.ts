import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EncryptionService } from './encryption.service';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

   private productURL:string =  "http://35.192.139.201:443/services/v1/products"
   private customerURL:string = "http://35.192.139.201:443/services/v1/customer"
   private billingURL:string = "http://35.192.139.201:443/services/v1/billing"

  constructor(private httpClient : HttpClient,private encService:EncryptionService) { }


    viewProduct(ownerEmail:string):Observable<any>{
      const token = this.encService.decrypt(sessionStorage.getItem('jwtToken')||'');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,  // Bearer token
        'Content-Type': 'application/json'   // Set the content type to application/json
      });
  
      const params = new HttpParams()
        .set('name', ownerEmail);        // Add productId parameter
      return this.httpClient.get<any>(`${this.productURL}/viewProducts`,{headers,params});
    }

    customerListByOwner(ownerEmail:string):Observable<any>{
      const token = this.encService.decrypt(sessionStorage.getItem('jwtToken')||'');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,  // Bearer token
        'Content-Type': 'application/json'   // Set the content type to application/json
      });
  
      const params = new HttpParams()
        .set('email', ownerEmail);        // Add productId parameter
      return this.httpClient.get<any>(`${this.customerURL}/owner/getCustomer`,{headers,params});
    }

    customerDetailSummary(ownerEmail:string,custEmail:string):Observable<any>{
      const token = this.encService.decrypt(sessionStorage.getItem('jwtToken')||'');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,  // Bearer token
        'Content-Type': 'application/json'   // Set the content type to application/json
      });
  
      const params = new HttpParams()
        .set('custEmail', ownerEmail).set('ownerEmail',custEmail)       // Add productId parameter
      return this.httpClient.get<any>(`${this.customerURL}/owner/getCustSummary`,{headers,params});
    }

    viewOwnerMilkProd(ownerEmail:string):Observable<any>{
      const token = this.encService.decrypt(sessionStorage.getItem('jwtToken')||'');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,  // Bearer token
        'Content-Type': 'application/json'   // Set the content type to application/json
      });
  
      const params = new HttpParams()
        .set('name', ownerEmail);        // Add productId parameter
      return this.httpClient.get<any>(`${this.productURL}/viewMilkProducts`,{headers,params});
    }

    viewConStDtls():Observable<any>{
      const token = this.encService.decrypt(sessionStorage.getItem('jwtToken')||'');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,  // Bearer token
        'Content-Type': 'application/json'   // Set the content type to application/json
      });       // Add productId parameter
      return this.httpClient.get<any>(`${this.billingURL}/getConStDtls`,{headers});
    }

    validateCustomerByPhNo(customerPhNo:string):Observable<any>{
      const token = this.encService.decrypt(sessionStorage.getItem('jwtToken')||'');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,  // Bearer token
        'Content-Type': 'application/json'   // Set the content type to application/json
      });
  
      const params = new HttpParams()
        .set('custPhNo', customerPhNo);        // Add productId parameter
      return this.httpClient.get<any>(`${this.customerURL}/getCustomer`,{headers,params});
    }
    getCustDtlsByPhEmail(customerEmail:any):Observable<any>{
      const token = this.encService.decrypt(sessionStorage.getItem('jwtToken')||'');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,  // Bearer token
        'Content-Type': 'application/json'   // Set the content type to application/json
      });
  
      const params = new HttpParams()
        .set('custEmail',customerEmail);        // Add productId parameter
      return this.httpClient.get<any>(`${this.customerURL}/cust/getCustomer`,{headers,params});
    }

    registerCustomer(customerData:any):Observable<any>{

      const token = this.encService.decrypt(sessionStorage.getItem('jwtToken')||'');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,  // Bearer token
        'Content-Type': 'application/json'   // Set the content type to application/json
      });
      console.log(token);
      console.log(customerData);
      return this.httpClient.post<any>(`${this.customerURL}/saveShopCust`,customerData,{headers});
    }
   

    payBillCustomer(billingData:any):Observable<any>{

      const token = this.encService.decrypt(sessionStorage.getItem('jwtToken')||'');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,  // Bearer token
        'Content-Type': 'application/json'   // Set the content type to application/json
      });
      console.log(token);
      console.log(billingData);
      return this.httpClient.post<any>(`${this.billingURL}/billCustomer`,billingData,{headers});
    }

    viewBillHistory(ownerEmail:string):Observable<any>{
      const token = this.encService.decrypt(sessionStorage.getItem('jwtToken')||'');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,  // Bearer token
        'Content-Type': 'application/json'   // Set the content type to application/json
      });
  
      const params = new HttpParams()
        .set('email', ownerEmail);        // Add productId parameter
      return this.httpClient.get<any>(`${this.billingURL}/viewBillHistory`,{headers,params});
    }

    addOrderRequest(orderData:any):Observable<any>{

      const token = this.encService.decrypt(sessionStorage.getItem('jwtToken')||'');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,  // Bearer token
        'Content-Type': 'application/json'   // Set the content type to application/json
      });
      console.log(token);
      console.log(orderData);
      return this.httpClient.post<any>(`${this.billingURL}/addOrderReq`,orderData,{headers});
    }

    custPlaceOrderRequest(orderData:any):Observable<any>{

      const token = this.encService.decrypt(sessionStorage.getItem('jwtToken')||'');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,  // Bearer token
        'Content-Type': 'application/json'   // Set the content type to application/json
      });
      console.log(token);
      console.log(orderData);
      return this.httpClient.post<any>(`${this.customerURL}/cust/placeOrder`,orderData,{headers});
    }

    ownerApproveCustOrder(orderData:any):Observable<any>{

      const token = this.encService.decrypt(sessionStorage.getItem('jwtToken')||'');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,  // Bearer token
        'Content-Type': 'application/json'   // Set the content type to application/json
      });
      console.log(token);
      console.log(orderData);
      return this.httpClient.post<any>(`${this.customerURL}/owner/aprvPlaceOrder`,orderData,{headers});
    }

    ownerRejectCustOrder(orderData:any):Observable<any>{

      const token = this.encService.decrypt(sessionStorage.getItem('jwtToken')||'');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,  // Bearer token
        'Content-Type': 'application/json'   // Set the content type to application/json
      });
      console.log(token);
      console.log(orderData);
      return this.httpClient.post<any>(`${this.customerURL}/owner/rejctPlaceOrder`,orderData,{headers});
    }

    viewCustOrder(ownerEmail:string):Observable<any>{
      const token = this.encService.decrypt(sessionStorage.getItem('jwtToken')||'');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,  // Bearer token
        'Content-Type': 'application/json'   // Set the content type to application/json
      });
  
      const params = new HttpParams()
        .set('email', ownerEmail);        // Add productId parameter
      return this.httpClient.get<any>(`${this.billingURL}/getOrderReq`,{headers,params});
    }

    processedOrder(ownerEmail:string):Observable<any>{
      const token = this.encService.decrypt(sessionStorage.getItem('jwtToken')||'');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,  // Bearer token
        'Content-Type': 'application/json'   // Set the content type to application/json
      });
  
      const params = new HttpParams()
        .set('email', ownerEmail);        // Add productId parameter
      return this.httpClient.get<any>(`${this.billingURL}/getProcOrders`,{headers,params});
    }

    custCreateTrans(orderData:any):Observable<any>{

      const token = this.encService.decrypt(sessionStorage.getItem('jwtToken')||'');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,  // Bearer token
        'Content-Type': 'application/json'   // Set the content type to application/json
      });
      console.log(token);
      console.log(orderData);
      return this.httpClient.post<any>(`${this.billingURL}/payment/createTran`,orderData,{headers});
    }

    custProcessedOrder(ownerEmail:string,custEmail:string):Observable<any>{
      const token = this.encService.decrypt(sessionStorage.getItem('jwtToken')||'');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,  // Bearer token
        'Content-Type': 'application/json'   // Set the content type to application/json
      });
  
      const params = new HttpParams()
        .set('OwnerEmail',ownerEmail).set('custEmail',custEmail);        // Add productId parameter
      return this.httpClient.get<any>(`${this.billingURL}/cust/getProcOrders`,{headers,params});
    }

    custOrderPlacedList(ownerEmail:string):Observable<any>{
      const token = this.encService.decrypt(sessionStorage.getItem('jwtToken')||'');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,  // Bearer token
        'Content-Type': 'application/json'   // Set the content type to application/json
      });
  
      const params = new HttpParams()
        .set('email', ownerEmail);        // Add productId parameter
      return this.httpClient.get<any>(`${this.customerURL}/owner/custOrderPlaced`,{headers,params});
    }

    custOrderReqList(ownerEmail:string,custEmail:string,selectedDate:string):Observable<any>{
      const token = this.encService.decrypt(sessionStorage.getItem('jwtToken')||'');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,  // Bearer token
        'Content-Type': 'application/json'   // Set the content type to application/json
      });
  
      const params = new HttpParams()
        .set('ownerEmail', ownerEmail).set('email',custEmail).set('date',selectedDate);        // Add productId parameter
      return this.httpClient.get<any>(`${this.customerURL}/cust/custOrderApproved`,{headers,params});
    }

    deleteOrderRequest(orderData:any):Observable<any>{

      const token = this.encService.decrypt(sessionStorage.getItem('jwtToken')||'');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,  // Bearer token
        'Content-Type': 'application/json'   // Set the content type to application/json
      });
      console.log(token);
      console.log(orderData);
      return this.httpClient.post<any>(`${this.billingURL}/deleteOrderReq`,orderData,{headers});
    }

    deleteProcOrderRequest(orderData:any):Observable<any>{

      const token = this.encService.decrypt(sessionStorage.getItem('jwtToken')||'');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,  // Bearer token
        'Content-Type': 'application/json'   // Set the content type to application/json
      });
      console.log(token);
      console.log(orderData);
      return this.httpClient.post<any>(`${this.billingURL}/deleteProcOrder`,orderData,{headers});
    }

    processOrderRequest(orderData:any):Observable<any>{

      const token = this.encService.decrypt(sessionStorage.getItem('jwtToken')||'');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,  // Bearer token
        'Content-Type': 'application/json'   // Set the content type to application/json
      });
      console.log(token);
      console.log(orderData);
      return this.httpClient.post<any>(`${this.billingURL}/OrderProcReq`,orderData,{headers});
    }

    paidOrderRequest(orderData:any):Observable<any>{

      const token = this.encService.decrypt(sessionStorage.getItem('jwtToken')||'');
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,  // Bearer token
        'Content-Type': 'application/json'   // Set the content type to application/json
      });
      console.log(token);
      console.log(orderData);
      return this.httpClient.post<any>(`${this.billingURL}/paidOrderReq`,orderData,{headers});
    }
    

}
