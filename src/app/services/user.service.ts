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
    return this.http.get<User>(`http://localhost:4000/users/${id}`);
  }

  updateUser(user: User) {
    return this.http.put(`http://localhost:4000/users/${user.id}`, {
      ...user,
      dateOfBirth: new Date(user.dateOfBirth).toISOString().split('T')[0],
    });
  }

  uploadImage(formData: FormData) {
    return this.http.post('http://localhost:4000/upload', formData);
  }

  getAllUsers() {
    return this.http.get<User>('http://localhost:4000/users');
  }

  getUserByEmail(email: string) {
    return this.http.post('http://localhost:4000/users/check-email', email);
  }
}
