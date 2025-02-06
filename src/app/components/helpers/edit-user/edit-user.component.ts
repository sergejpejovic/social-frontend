import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  standalone: false,

  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss',
})
export class EditUserComponent implements OnInit {
  @Input() user: User = new User();

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((paramsData) => {
      if (paramsData[`id`]) {
        const userId = paramsData[`id`];
        this.userService.getUserById(userId).subscribe((data: any) => {
          this.user = data;
        });
      }
    });
  }

  updateUser() {
    this.userService.updateUser(this.user).subscribe((data: any) => {
      if (data.success) {
        console.log('Uspjesno');
      } else {
        console.error('Error:', data.msg);
      }
    });
  }
}
