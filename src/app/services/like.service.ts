import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  constructor(private http: HttpClient) {}

  createLike(postId: number, userId: number) {
    return this.http.post(
      `https://socialapi.click/likes/${postId}/${userId}`,
      {}
    );
  }

  deletePostLikes(postId: number, userId: number) {
    return this.http.delete(
      `https://socialapi.click/likes/${postId}/dislike/${userId}`
    );
  }

  getNumberOfLikes(postId: number) {
    return this.http.get(`https://socialapi.click/likes/post/${postId}/likes`);
  }

  checkIfUserLiked(postId: number, userId: number) {
    return this.http.post('https://socialapi.click/likes/check', {
      postId,
      userId,
    });
  }
}
