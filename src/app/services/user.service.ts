import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserById(id: number) {
    return this.http.get<User>(`https://socialapi.click/users/${id}`);
  }

  updateUser(user: User) {
    return this.http.put(`https://socialapi.click/users/${user.id}`, {
      ...user,
    });
  }

  uploadImage(formData: FormData) {
    return this.http.post('https://socialapi.click/upload', formData);
  }

  getAllUsers() {
    return this.http.get<User>('https://socialapi.click/users');
  }
}
