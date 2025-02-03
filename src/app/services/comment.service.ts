import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommentsModel } from '../models/CommentModel';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  getCommentsByPostId(postId: number) {
    return this.http.get<CommentsModel>(
      `http://localhost:4000/comments/post/${postId}`
    );
  }

  getAllComments() {
    return this.http.get<CommentsModel>('http://localhost:4000/comments');
  }

  createComment(comment: CommentsModel) {
    return this.http.post('http://localhost:4000/comments', comment);
  }

  editComment(comment: CommentsModel) {
    return this.http.put('http://localhost:4000/comments', comment);
  }

  deleteComment(commentId: number) {
    return this.http.delete(`http://localhost:4000/comments/${commentId}`);
  }
}
