import {
  Component,
  OnInit,
  HostListener,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { User } from '../../../models/User';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { Post } from '../../../models/Post';
import { PostService } from '../../../services/post.service';
import { AuthService } from '../../../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: false,

  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  user: User = new User();
  posts: Post[] = [];
  isLoggedIn: boolean = false;
  userIdFromToken: number | null = null;
  userCardVIsibility: boolean = false;
  isMobile: boolean = false;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: any
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
            this.posts = data;
            this.spinner.hide();
          });
        });
      }, 1000);
    });

    if (isPlatformBrowser(this.platformId)) {
      this.checkIsMobile();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkIsMobile();
  }

  private checkIsMobile() {
    this.isMobile = window.innerWidth < 768;
  }

  toogleUserCardVisibility() {
    this.userCardVIsibility != this.userCardVIsibility;
  }
}
