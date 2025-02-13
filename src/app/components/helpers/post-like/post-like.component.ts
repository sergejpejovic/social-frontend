import { Component, Input, OnInit } from '@angular/core';
import { LikeService } from '../../../services/like.service';
import { User } from '../../../models/User';
import { Post } from '../../../models/Post';

@Component({
  selector: 'app-post-like',
  standalone: false,

  templateUrl: './post-like.component.html',
  styleUrl: './post-like.component.scss',
})
export class PostLikeComponent implements OnInit {
  @Input() post: Post = new Post();
  @Input() user: User = new User();
  isLiked: boolean = false;
  likesNumber: number = 0;

  constructor(private likeService: LikeService) {}

  ngOnInit(): void {
    this.loadLikes();
    this.checkIfLiked();
  }

  checkIfLiked() {
    this.likeService
      .checkIfUserLiked(this.post.id, this.user.id)
      .subscribe((data: any) => {
        if (data) {
          this.isLiked = true;
        } else {
          this.isLiked = false;
        }
      });
  }

  loadLikes() {
    this.likeService.getNumberOfLikes(this.post.id).subscribe((data: any) => {
      if (data.length > 0) {
        this.likesNumber = data[0].numberOfLikes;
      } else {
        console.log('No likes found for this post');
      }
    });
  }

  like(post: Post, user: User) {
    this.likeService.createLike(post.id, user.id).subscribe((data: any) => {
      if (data.success) {
        console.log('Uspjesno dodat like');
        this.isLiked = true;
        this.loadLikes();
      }
    });
  }

  dislike(post: Post, user: User) {
    this.likeService
      .deletePostLikes(post.id, user.id)
      .subscribe((data: any) => {
        if (data.success) {
          console.log('Uspjeno obrisan like');
          this.isLiked = false;
          this.likesNumber--;
        }
      });
  }
}
