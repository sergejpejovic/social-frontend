import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

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

  constructor(private userService: UserService, private router: Router) {}

  login() {
    if (!this.user.email || !this.user.password) {
      alert('Unesite sve podatke');
      return;
    }
    this.userService.login(this.user).subscribe((data: any) => {
      if (data.success) {
        localStorage.setItem('user-token', data.token);
        const decodedToken: any = jwtDecode(data.token);
        console.log(decodedToken);
        this.router.navigateByUrl(`/user/${decodedToken.id}`);
      } else {
        alert('Pogresni podaci');
      }
    });
  }
}
