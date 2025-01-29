import { Component, Input } from '@angular/core';
import { Post } from '../../../models/Post';
import { User } from '../../../models/User';

@Component({
  selector: 'app-post-card',
  standalone: false,

  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
})
export class PostCardComponent {
  @Input('item') item: Post[] = [];
  @Input('user') user: User = new User();
}
