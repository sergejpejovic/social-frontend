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
}
