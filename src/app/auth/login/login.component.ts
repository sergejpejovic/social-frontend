import { Component, OnInit } from '@angular/core';
import { User } from '../../modules/User';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {}
