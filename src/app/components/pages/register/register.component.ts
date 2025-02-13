import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/User';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AdditionalsService } from '../../../services/additionals.service';
import { Countries } from '../../../models/Countries';
import { UserService } from '../../../services/user.service';

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
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAdditionals();
  }

  register() {
    console.log(this.user);
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

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (!emailPattern.test(this.user.email)) {
      alert('Email is not in valid format');
      return;
    }

    if (this.user.password.length < 3) {
      alert('Password is too short...');
      return;
    }

    this.authService.register(this.user).subscribe((data: any) => {
      if (data.success) {
        alert('Success!');
        localStorage.setItem('user-token', data.token);
        this.router.navigateByUrl('/auth/login');
      } else {
        console.log('Registration failed:', data.msg);
        alert('Email already in use! ');
      }
    });
  }

  getAdditionals() {
    this.additionalsService.getCountries().subscribe((data: any) => {
      this.countries = data;
    });
  }
}
