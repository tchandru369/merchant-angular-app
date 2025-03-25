import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { merchantImg } from 'src/app/models/merchantImg.interface';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {


  private merchantURL:string =  "http://34.47.181.185:8083/services/v1/merchant"

  constructor(private httpClient:HttpClient) { }

  uploadImage(formData:FormData): Observable<any> {
    const token = sessionStorage.getItem('jwtToken');
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`,  // Bearer token  // Set the content type to application/json
        });
    return this.httpClient.post<any>(`${this.merchantURL}/saveImage`,formData,{headers});
  }

  getImage(data:any): Observable<any> {
    const token = sessionStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    const params = new HttpParams()
          .set('name', data);   
    return this.httpClient.get<any>(`${this.merchantURL}/getProfileImage`,{headers,params});
  }

  getProfileImage(ownerEmail:string,ownerImgModule:string):Observable<any>{
    const token = sessionStorage.getItem('jwtToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,  // Bearer token
      'Content-Type': 'application/json'   // Set the content type to application/json
    });

    const params = new HttpParams()
      .set('email', ownerEmail)
      .set('imgModule', ownerImgModule);        // Add productId parameter
    return this.httpClient.get<any>(`${this.merchantURL}/getProfilePic`,{headers,params});
}

getMerchantDetails(ownerEmail:string):Observable<any>{
  const token = sessionStorage.getItem('jwtToken');
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,  // Bearer token
    'Content-Type': 'application/json'   // Set the content type to application/json
  });

  const params = new HttpParams()
    .set('email', ownerEmail);        // Add productId parameter
  return this.httpClient.get<any>(`${this.merchantURL}/profileDetails`,{headers,params});
}
}
