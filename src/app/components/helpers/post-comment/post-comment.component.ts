import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../../services/comment.service';
import { Post } from '../../../models/Post';
import { CommentsModel } from '../../../models/CommentModel';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-post-comment',
  standalone: false,

  templateUrl: './post-comment.component.html',
  styleUrl: './post-comment.component.scss',
})
export class PostCommentComponent implements OnInit {
  comments: CommentsModel[] = [];
  comment: CommentsModel = new CommentsModel();
  @Input('post') post: Post;
  isAddingComment: boolean = false;

  constructor(
    private commentService: CommentService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.loadComments();
  }

  loadComments() {
    this.commentService
      .getCommentsByPostId(this.post.id)
      .subscribe((data: any) => {
        this.comments = data;
      });
  }

  addComment() {
    this.isAddingComment = true;
  }

  cancelComment() {
    this.isAddingComment = false;
  }

  saveComment() {
    const userData = this.authService.getUserData();

    if (!userData) {
      alert('User not authenticated!');
      return;
    }

    this.comment.postId = this.post.id;
    this.comment.userId = userData.id;
    console.log(this.comment.userId);
    this.commentService.createComment(this.comment).subscribe((data: any) => {
      if (data.success) {
        this.loadComments();
        this.isAddingComment = false;
        this.comment = data;
        alert('Uspjesno dodat komenar');
      }
    });
  }

  isCommentOwner(comment: CommentsModel): boolean {
    const currentUser = this.authService.getUserData();
    return currentUser?.id === comment.userId;
  }

  deleteComment(commentId: number) {
    this.commentService.deleteComment(commentId).subscribe((data: any) => {
      if (data.success) {
        this.loadComments();
      }
    });
  }

  // editComment(comment: CommentsModel) {
  //   this.commentService.editComment(comment).subscribe((data: any) => {
  //     console.log('Returned data:', data);
  //     console.log('Current comments:', this.comments);
  //     const index = this.comments.findIndex((p) => p.commentId === data.ID);
  //     console.log(index);
  //     if (index !== -1) {
  //       this.comments[index] = data;
  //       console.log(this.comments[index]);
  //     }
  //   });
  // }
}
