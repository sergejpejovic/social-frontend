import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // createUser(user: User) {
  //   return this.http.post(`http://localhost:4000/users`, user);
  // }

  getUserById(id: number) {
    return this.http.get(`http://localhost:4000/users/${id}`);
  }
}
