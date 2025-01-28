import { Component, OnInit } from '@angular/core';
import { User } from '../../modules/User';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  user: User = new User();

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  createUser() {
    this.userService.createUser(this.user).subscribe((data: any) => {
      if (data.success) {
        this.router.navigateByUrl('/register');
      }
    });
  }
}
