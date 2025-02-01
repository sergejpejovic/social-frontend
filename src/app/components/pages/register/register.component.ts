import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,

  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  user: User = new User();

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  register() {
    if (
      !this.user.name ||
      !this.user.surname ||
      !this.user.email ||
      !this.user.country ||
      !this.user.dateOfBirth
    ) {
      alert('Unesite sve podatke');
      return;
    }

    this.userService.register(this.user).subscribe((data: any) => {
      if (data.success) {
        alert('Uspjesno ste se registrovali!');
        localStorage.setItem('user-token', data.token);
        this.router.navigateByUrl('/auth/login');
      }
    });
  }
}
