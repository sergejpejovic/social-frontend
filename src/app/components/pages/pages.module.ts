import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { PagesRoutingModule } from './pages-routing.module';
import { UserCardComponent } from '../helpers/user-card/user-card.component';
import { PostCardComponent } from '../helpers/post-card/post-card.component';

@NgModule({
  declarations: [UserComponent, UserCardComponent, PostCardComponent],
  imports: [CommonModule, PagesRoutingModule],
  exports: [UserComponent, UserCardComponent, PostCardComponent],
})
export class PagesModule {}
