import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdditionalsService {
  constructor(private http: HttpClient) {}

  getCountries() {
    return this.http.get('http://localhost:4000/additionals/countries');
  }
}
