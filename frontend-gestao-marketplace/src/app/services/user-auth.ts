import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  getUserToken() {
    return localStorage.getItem('auth-token') || '';
  }

  setUserToken(token: string) {
    localStorage.setItem('auth-token', token);
  }
}
