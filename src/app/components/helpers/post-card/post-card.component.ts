import { Component, Host, Input } from '@angular/core';
import { Post } from '../../../models/Post';
import { User } from '../../../models/User';
import { PostService } from '../../../services/post.service';
import { UserComponent } from '../../pages/home/user.component';

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
  filteredPosts: Post[] = [];

  editingPostId: number | null = null;
  isCreatingPost: boolean = false;
  isCommentVisible: boolean[] = [];
  fileToUpload: any = null;
  searchText: string = '';

  constructor(
    private postService: PostService,
    @Host() private userComponent: UserComponent
  ) {}

  ngOnChanges(): void {
    this.filteredPosts = this.posts;
  }

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
    const formData: FormData = new FormData();
    formData.append('img', this.fileToUpload);

    if (this.fileToUpload) {
      this.postService
        .uploadImage(formData)
        .subscribe((fileUploadResponse: any) => {
          post.mediaLocation = `https://socialapi.click/${fileUploadResponse.filename}`;

          // Ako ima slika radim edit sa slikom
          this.postService.editPost(post.id, post).subscribe((data: any) => {
            if (data.success) {
              this.editingPostId = null;
            }
          });
        });
    } else {
      // Ako nema slike radim obicni edit za tekst
      this.postService.editPost(post.id, post).subscribe((data: any) => {
        if (data.success) {
          this.editingPostId = null;
        }
      });
    }
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
    const formData: FormData = new FormData();
    formData.append('img', this.fileToUpload);

    this.postService
      .uploadImage(formData)
      .subscribe((fileUploadResponse: any) => {
        this.post.mediaLocation =
          this.post.mediaLocation = `https://socialapi.click/${fileUploadResponse.filename}`;

        post.userId = this.user.id;
        this.postService.createPost(post).subscribe((data: any) => {
          console.log(data);
          if (data.success) {
            this.userComponent.ngOnInit();

            this.isCreatingPost = false;
          }
        });
      });
  }

  setUploadedFile(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  onSearchTextEntered(searchValue: string) {
    this.searchText = searchValue.toLowerCase();

    this.filteredPosts = this.posts.filter((p) =>
      p.userName.toLowerCase().includes(this.searchText)
    );
  }
}
