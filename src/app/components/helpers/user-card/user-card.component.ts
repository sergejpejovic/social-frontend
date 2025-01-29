import { Component, Input } from '@angular/core';
import { User } from '../../../models/User';

@Component({
  selector: 'app-user-card',
  standalone: false,

  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  @Input('user') user: User = new User();
}
