import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/User';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Post } from '../../../models/Post';
import { PostService } from '../../../services/post.service';
import { AuthService } from '../../../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user',
  standalone: false,

  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  user: User = new User();
  post: Post[] = [];
  isLoggedIn: boolean = false;
  userIdFromToken: number | null = null;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn() ?? false;

    this.activatedRoute.params.subscribe((paramsData) => {
      const userIdFromUrl = Number(paramsData[`id`]);
      this.spinner.show();

      setTimeout(() => {
        this.userService.getUserById(userIdFromUrl).subscribe((data: any) => {
          this.user = data;

          this.postService.getAllPosts().subscribe((data: any) => {
            this.post = data;
            this.spinner.hide();
          });
        });
      }, 1000);
    });
  }
}
