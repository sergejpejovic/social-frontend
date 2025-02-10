import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/User';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AdditionalsService } from '../../../services/additionals.service';
import { Countries } from '../../../models/Countries';

@Component({
  selector: 'app-register',
  standalone: false,

  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  user: User = new User();
  countries: Countries[] = [];

  constructor(
    private authService: AuthService,
    private additionalsService: AdditionalsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAdditionals();
  }

  register() {
    if (
      !this.user.name ||
      !this.user.surname ||
      !this.user.email ||
      !this.user.countryId ||
      !this.user.dateOfBirth
    ) {
      alert('Enter all data');
      return;
    }

    if (this.user.email) {
      alert('Email is already in use');
    }

    if (this.user.password.length < 3) {
      alert('Password is too short...');
    }

    this.authService.register(this.user).subscribe((data: any) => {
      if (data.success) {
        alert('Uspjesno ste se registrovali!');
        localStorage.setItem('user-token', data.token);
        this.router.navigateByUrl('/auth/login');
      }
    });
  }

  getAdditionals() {
    this.additionalsService.getCountries().subscribe((data: any) => {
      this.countries = data;
      console.log(this.countries);
    });
  }
}
