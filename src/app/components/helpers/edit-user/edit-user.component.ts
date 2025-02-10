import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AdditionalsService } from '../../../services/additionals.service';
import { Countries } from '../../../models/Countries';

@Component({
  selector: 'app-edit-user',
  standalone: false,

  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
})
export class EditUserComponent implements OnInit {
  @Input() user: User = new User();
  countries: Countries[] = [];
  fileToUpload: any = null;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private additionalsService: AdditionalsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((paramsData) => {
      if (paramsData[`id`]) {
        const userId = Number(paramsData[`id`]);

        this.userService.getUserById(userId).subscribe((data: any) => {
          this.user = data;
        });
      }
    });
    this.getAdditionals();
  }

  updateUser() {
    const formData: FormData = new FormData();
    formData.append('img', this.fileToUpload);

    if (this.fileToUpload) {
      this.userService
        .uploadImage(formData)
        .subscribe((fileUploadResponse: any) => {
          this.user.mediaLocation = `http://localhost:4000/${fileUploadResponse.filename}`;

          this.userService.updateUser(this.user).subscribe((data: any) => {
            if (data.success) {
              console.log(this.user.mediaLocation);
              this.router.navigateByUrl(`/user/${this.user.id}`);
            }
          });
        });
    } else {
      this.userService.updateUser(this.user).subscribe((data: any) => {
        if (data.success) {
          this.router.navigateByUrl(`/user/${this.user.id}`);
        }
      });
    }
  }

  setUploadedFile(event: any) {
    this.fileToUpload = event.target.files[0];
  }

  getAdditionals() {
    this.additionalsService.getCountries().subscribe((data: any) => {
      this.countries = data;
    });
  }
}
