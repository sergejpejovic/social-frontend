import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  constructor(private http: HttpClient) {}

  createLike(postId: number, userId: number) {
    return this.http.post(
      `http://localhost:4000/likes/${postId}/${userId}`,
      {}
    );
  }

  deletePostLikes(postId: number, userId: number) {
    return this.http.delete(
      `http://localhost:4000/likes/${postId}/dislike/${userId}`
    );
  }

  getNumberOfLikes(postId: number) {
    return this.http.get(`http://localhost:4000/likes/post/${postId}/likes`);
  }

  checkIfUserLiked(postId: number, userId: number) {
    return this.http.post('http://localhost:4000/likes/check', {
      postId,
      userId,
    });
  }
}
