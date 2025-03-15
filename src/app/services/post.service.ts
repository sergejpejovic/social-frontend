import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getAllPosts() {
    return this.http.get<Post[]>('https://socialapi.click/posts');
  }

  getPostsByUserId(id: number) {
    return this.http.get<Post[]>(`https://socialapi.click/posts/user/${id}`);
  }

  createPost(post: Post) {
    return this.http.post('https://socialapi.click/posts', post);
  }

  editPost(id: number, post: Post) {
    return this.http.put(`https://socialapi.click/posts/${id}`, {
      ...post,
    });
  }

  deletePost(id: number) {
    return this.http.delete(`https://socialapi.click/posts/${id}`);
  }

  uploadImage(formData: FormData) {
    return this.http.post('https://socialapi.click/upload', formData);
  }
}
