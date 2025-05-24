import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

   
  constructor() { }

   private getKey(): string {
    return atob(environment.encryptionKeyEncoded); // Decode base64 key
  }

  encrypt(data: any): string {
    const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), this.getKey()).toString();
    return ciphertext;
  }

  decrypt(ciphertext: string): any | null {
    try {
      const bytes = CryptoJS.AES.decrypt(ciphertext, this.getKey());
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      return JSON.parse(decrypted);
    } catch (error) {
      console.error('Decryption failed:', error);
      return null;
    }
  }
}
