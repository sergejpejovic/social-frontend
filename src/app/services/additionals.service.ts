import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AdditionalsService {
  constructor(private http: HttpClient) {}

  getCountries() {
    return this.http.get('https://socialapi.click/additionals/countries');
  }
}
