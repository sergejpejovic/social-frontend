import { Component, Input } from '@angular/core';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-card',
  standalone: false,
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
})
export class UserCardComponent {
  @Input() user: User = new User();

  constructor(private userService: UserService, private router: Router) {}

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/auth/login');
  }
}
