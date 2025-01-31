import { Component, Host, Input, OnInit } from '@angular/core';
import { Post } from '../../../models/Post';
import { User } from '../../../models/User';
import { PostService } from '../../../services/post.service';
import { UserComponent } from '../../pages/user/user.component';

@Component({
  selector: 'app-post-card',
  standalone: false,
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss',
})
export class PostCardComponent {
  @Input() posts: Post[] = [];
  @Input() user: User = new User();

  editingPostId: number | null = null;

  constructor(
    private postService: PostService,
    @Host() private userComponent: UserComponent
  ) {}

  isPostOwner(post: Post): boolean {
    return post.userId === this.user.id;
  }

  startEditing(post: Post) {
    this.editingPostId = post.id;
  }

  cancelEditing() {
    this.editingPostId = null;
  }

  saveEdit(post: Post) {
    this.postService.editPost(post).subscribe((updatedPost: any) => {
      const index = this.posts.findIndex((p) => p.id === updatedPost.id);

      if (index !== -1) {
        this.posts[index] = updatedPost;
      }
      this.editingPostId = null;
    });
  }

  deletePost(id: number) {
    if (confirm('Are you sure')) {
      this.postService.deletePost(id).subscribe((data: any) => {
        if (data.success) {
          this.userComponent.ngOnInit();
        }
      });
    }
  }
}
