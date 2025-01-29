import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../modules/Post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getAllPosts() {
    return this.http.get<Post[]>('http://localhost:4000/posts');
  }

  createPost(post: Post) {
    return this.http.post('http://localhost:4000/posts', post);
  }
}
