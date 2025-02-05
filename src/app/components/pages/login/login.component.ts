import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/User';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  user: User = new User();
  errorMessage: string;

  ngOnInit(): void {}

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (!this.user.email || !this.user.password) {
      alert('Enter all data');
      return;
    }

    this.authService.login(this.user).subscribe((data: any) => {
      if (data.success) {
        localStorage.setItem('user-token', data.token);
        const decodedToken: any = jwtDecode(data.token);
        this.router.navigateByUrl(`/user/${decodedToken.id}`);
      } else {
        alert('Wrong data');
      }
    });
  }
}
