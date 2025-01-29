import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/User';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Post } from '../../../models/Post';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-user',
  standalone: false,

  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  user: User = new User();
  post: Post[] = [];

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((paramsData) => {
      if (paramsData[`id`]) {
        const userId = paramsData[`id`];
        this.userService.getUserById(userId).subscribe((data: any) => {
          this.user = data;

          this.postService
            .getPostsByUserId(this.user.id)
            .subscribe((data: any) => {
              this.post = data;
              console.log(this.post);
            });
        });
      }
    });
  }
}
