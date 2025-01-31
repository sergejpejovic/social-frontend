import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../../services/comment.service';
import { Post } from '../../../models/Post';
import { CommentsModel } from '../../../models/CommentModel';

@Component({
  selector: 'app-post-comment',
  standalone: false,

  templateUrl: './post-comment.component.html',
  styleUrl: './post-comment.component.scss',
})
export class PostCommentComponent implements OnInit {
  comments: CommentsModel[] = [];
  @Input('post') post: Post;

  constructor(private commentService: CommentService) {}
  ngOnInit(): void {
    this.commentService
      .getCommentsByPostId(this.post.id)
      .subscribe((data: any) => {
        this.comments = data;
      });
  }
}
