import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './home/user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EditUserComponent } from '../helpers/edit-user/edit-user.component';
import { userAuthGuardGuard } from '../../guards/user-auth-guard.guard';

const routes: Routes = [
  {
    path: 'user/:id',
    component: UserComponent,
    canActivate: [userAuthGuardGuard],
  },
  {
    path: 'user/:id/edit',
    component: EditUserComponent,
    canActivate: [userAuthGuardGuard],
  },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
