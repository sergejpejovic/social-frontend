import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../../services/comment.service';
import { Post } from '../../../models/Post';
import { CommentsModel } from '../../../models/CommentModel';
import { UserService } from '../../../services/user.service';

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
    private userService: UserService
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

  saveComment() {
    const userData = this.userService.getUserData();

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
    const currentUser = this.userService.getUserData();
    return currentUser?.id === comment.userId;
  }

  deleteComment(commentId: number) {
    this.commentService.deleteComment(commentId).subscribe((data: any) => {
      if (data.success) {
        this.loadComments();
      }
    });
  }
}
