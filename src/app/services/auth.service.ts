import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(user: User) {
    return this.http.post('https://socialapi.click/auth/register', user);
  }

  login(user: User) {
    return this.http.post('https://socialapi.click/auth/login', user);
  }

  isLoggedIn() {
    const token = localStorage.getItem('user-token');
    if (token) return true;
    return false;
  }

  getUserData() {
    const token = localStorage.getItem('user-token');
    if (!token) return null;
    const tokenParts = token.split('.');
    const userDataPart = tokenParts[1];
    const user = JSON.parse(window.atob(userDataPart));
    return user;
  }
}
