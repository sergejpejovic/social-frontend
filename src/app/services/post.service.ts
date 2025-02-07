import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getAllPosts() {
    return this.http.get<Post[]>('http://localhost:4000/posts');
  }

  getPostsByUserId(id: number) {
    return this.http.get<Post[]>(`http://localhost:4000/posts/user/${id}`);
  }

  createPost(post: Post) {
    return this.http.post('http://localhost:4000/posts', post);
  }

  editPost(id: number, post: Post) {
    return this.http.put(`http://localhost:4000/posts/${id}`, {
      ...post,
    });
  }

  deletePost(id: number) {
    return this.http.delete(`http://localhost:4000/posts/${id}`);
  }

  uploadImage(formData: FormData) {
    return this.http.post('http://localhost:4000/upload', formData);
  }
}
