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
  isEditingComment: boolean = false;
  editingCommentId: number | null = null;

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

    this.commentService.createComment(this.comment).subscribe((data: any) => {
      if (data.success) {
        this.loadComments();
        this.isAddingComment = false;
        this.comment = data;
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

  edit(comment: CommentsModel) {
    this.editingCommentId = comment.commentId;
    this.isEditingComment = true;
  }

  cancelEdit() {
    this.editingCommentId = null;
    this.isEditingComment = false;
  }

  saveEdit(comment: CommentsModel) {
    this.commentService
      .editComment(comment.commentId, comment)
      .subscribe((data: any) => {
        if (data.success) {
          this.loadComments();
          this.editingCommentId = null;
          this.isEditingComment = false;
        }
      });
  }
}
