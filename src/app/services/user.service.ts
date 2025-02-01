import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  createUser(user: User) {
    return this.http.post(`http://localhost:4000/users`, user);
  }

  getUserById(id: number) {
    return this.http.get(`http://localhost:4000/users/${id}`);
  }

  register(user: User) {
    return this.http.post('http://localhost:4000/users/register', user);
  }

  login(user: User) {
    return this.http.post('http://localhost:4000/users/login', user);
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
    console.log(user);
    return user;
  }
}
