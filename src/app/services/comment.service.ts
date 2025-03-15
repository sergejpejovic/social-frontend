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
      `https://socialapi.click/comments/post/${postId}`
    );
  }

  getAllComments() {
    return this.http.get<CommentsModel>('https://socialapi.click/comments');
  }

  getCommentById(id: number) {
    return this.http.get<CommentsModel>(
      `https://socialapi.click/comments/${id}`
    );
  }

  createComment(comment: CommentsModel) {
    return this.http.post('https://socialapi.click/comments', comment);
  }

  editComment(id: number, comment: CommentsModel) {
    return this.http.put(`https://socialapi.click/comments/${id}`, {
      ...comment,
    });
  }

  deleteComment(commentId: number) {
    return this.http.delete(`https://socialapi.click/comments/${commentId}`);
  }
}
