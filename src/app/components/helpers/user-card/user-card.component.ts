import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { Countries } from '../../../models/Countries';
import { AdditionalsService } from '../../../services/additionals.service';

@Component({
  selector: 'app-user-card',
  standalone: false,
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent implements OnInit {
  @Input() user: User = new User();
  countries: Countries[] = [];

  constructor(
    private additionalsService: AdditionalsService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.getCountries();
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/auth/login');
  }

  getCountries() {
    this.additionalsService.getCountries().subscribe((data: any) => {
      this.countries = data;
    });
  }

  getCountryName(countryId: number): string {
    const country = this.countries.find((country) => country.id === countryId);
    return country ? country.naziv : 'Unknown';
  }
}
