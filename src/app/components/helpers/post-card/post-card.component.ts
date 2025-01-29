import { Component, Input } from '@angular/core';
import { Post } from '../../../modules/Post';

@Component({
  selector: 'app-post-card',
  standalone: false,

  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
})
export class PostCardComponent {
  @Input('item') item: Post[] = [];
}
