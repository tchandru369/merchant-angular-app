import { Injectable } from '@angular/core';
import { EncryptionService } from './encryption.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private encryptionService: EncryptionService) { }
  private userRole: string = '';

  setUserRole(role: string) {
    this.userRole = role;
    const encrypted=this.encryptionService.encrypt(role);
    localStorage.setItem('appName', encrypted); // optional persistent storage
  }

  getUserRole(): string {
    if (this.userRole) {
    return this.userRole;
  }

  const encrypted = localStorage.getItem('appName');
  if (encrypted) {
    try {
      const decrypted = this.encryptionService.decrypt(encrypted);
      this.userRole = decrypted || ''; // assuming the decrypted data is like { role: 'owner' }
      return this.userRole;
    } catch (error) {
      console.error('Failed to decrypt user role:', error);
    }
  }

  return '';
  }

  isUser(): boolean {
    return this.getUserRole() === 'User';
  }

  isCustomer(): boolean {
    return this.getUserRole() === 'Cust';
  }
}
