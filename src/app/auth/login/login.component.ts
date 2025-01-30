import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
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
  errorMessage: string;

  ngOnInit(): void {}

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    this.userService.loginUser(this.user.email, this.user.password).subscribe(
      (data: any) => {
        const userId = data.ID;
        this.router.navigateByUrl(`/user/${userId}`);
      },
      (error) => {
        this.errorMessage = 'Invalid email or password!';
      }
    );
  }
}
