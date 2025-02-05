import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { PagesRoutingModule } from './pages-routing.module';
import { HelpersModule } from '../helpers/helpers.module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [UserComponent, RegisterComponent, LoginComponent],
  imports: [CommonModule, PagesRoutingModule, HelpersModule, FormsModule],
  exports: [UserComponent, HelpersModule, RegisterComponent, LoginComponent],
})
export class PagesModule {}
