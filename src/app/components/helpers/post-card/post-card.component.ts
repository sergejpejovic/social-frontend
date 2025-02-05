import { Component, Host, Input } from '@angular/core';
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
  post: Post = new Post();
  @Input() user: User = new User();
  editingPostId: number | null = null;
  isCreatingPost: boolean = false;
  isCommentVisible: boolean[] = [];

  constructor(
    private postService: PostService,

    @Host() private userComponent: UserComponent
  ) {}

  toggleCommentVisibility(postId: number) {
    this.isCommentVisible[postId] = !this.isCommentVisible[postId];
  }

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

  addPost() {
    this.isCreatingPost = true;
  }

  cancelCreating() {
    this.isCreatingPost = false;
    this.post = new Post();
  }

  createPost(post: Post) {
    post.userId = this.user.id;
    this.postService.createPost(post).subscribe((data: any) => {
      console.log(data);
      if (data.success) {
        this.userComponent.ngOnInit();

        this.isCreatingPost = false;
      }
    });
  }
}
