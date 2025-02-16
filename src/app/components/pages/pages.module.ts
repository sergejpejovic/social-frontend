import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './home/user.component';
import { PagesRoutingModule } from './pages-routing.module';
import { HelpersModule } from '../helpers/helpers.module';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [UserComponent, RegisterComponent, LoginComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    HelpersModule,
    FormsModule,
    NgxSpinnerModule,
  ],
  exports: [UserComponent, HelpersModule, RegisterComponent, LoginComponent],
})
export class PagesModule {}
