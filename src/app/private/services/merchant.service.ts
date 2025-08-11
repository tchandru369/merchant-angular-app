import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { merchantImg } from 'src/app/models/merchantImg.interface';
import { EncryptionService } from './encryption.service';

@Injectable({
  providedIn: 'root',
})
export class MerchantService {
  private merchantURL: string = 'http://35.192.139.201:443/services/v1/merchant';

  constructor(
    private httpClient: HttpClient,
    private encService: EncryptionService
  ) {}

  uploadImage(formData: FormData): Observable<any> {
    const token = this.encService.decrypt(
      sessionStorage.getItem('jwtToken') || ''
    );
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Bearer token  // Set the content type to application/json
    });
    return this.httpClient.post<any>(
      `${this.merchantURL}/saveImage`,
      formData,
      { headers }
    );
  }

  getImage(data: any): Observable<any> {
    const token = this.encService.decrypt(
      sessionStorage.getItem('jwtToken') || ''
    );
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    const params = new HttpParams().set('name', data);
    return this.httpClient.get<any>(`${this.merchantURL}/getProfileImage`, {
      headers,
      params,
    });
  }

  getProfileImage(ownerEmail: string, ownerImgModule: string): Observable<any> {
    const token = this.encService.decrypt(
      sessionStorage.getItem('jwtToken') || ''
    );
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Bearer token
      'Content-Type': 'application/json', // Set the content type to application/json
    });

    const params = new HttpParams()
      .set('email', ownerEmail)
      .set('imgModule', ownerImgModule); // Add productId parameter
    return this.httpClient.get<any>(`${this.merchantURL}/getProfilePic`, {
      headers,
      params,
    });
  }

  getMerchantDetails(ownerEmail: string): Observable<any> {
    const token = this.encService.decrypt(
      sessionStorage.getItem('jwtToken') || ''
    );
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Bearer token
      'Content-Type': 'application/json', // Set the content type to application/json
    });

    const params = new HttpParams().set('email', ownerEmail); // Add productId parameter
    return this.httpClient.get<any>(`${this.merchantURL}/profileDetails`, {
      headers,
      params,
    });
  }

  updatePaymentDetails(ownerEmail: string,upiId:string,ownerPhNo:string,ownerName:string): Observable<any> {
    const token = this.encService.decrypt(
      sessionStorage.getItem('jwtToken') || ''
    );
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Bearer token
      'Content-Type': 'application/json', // Set the content type to application/json
    });

    const params = new HttpParams().set('ownerEmail', ownerEmail).set('dealerUpi',upiId).set('ownerPh',ownerPhNo)
    .set('ownerName',ownerName); // Add productId parameter
    return this.httpClient.get<any>(`${this.merchantURL}/owner/updatePymt`, {
      headers,
      params,
    });
  }

  getDealersPaymentDetails(ownerEmail:string){
    const token = this.encService.decrypt(
      sessionStorage.getItem('jwtToken') || ''
    );
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`, // Bearer token
      'Content-Type': 'application/json', // Set the content type to application/json
    });

    const params = new HttpParams().set('ownerEmail', ownerEmail); // Add productId parameter
    return this.httpClient.get<any>(`${this.merchantURL}/cust/owner/pymtDtls`, {
      headers,
      params,
    });
  }
}
