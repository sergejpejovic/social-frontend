import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from './post-card/post-card.component';
import { UserCardComponent } from './user-card/user-card.component';
import { FormsModule } from '@angular/forms';
import { PostLikeComponent } from './post-like/post-like.component';
import { PostCommentComponent } from './post-comment/post-comment.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    PostCardComponent,
    UserCardComponent,
    PostLikeComponent,
    PostCommentComponent,
    EditUserComponent,
    SearchComponent,
  ],
  imports: [CommonModule, FormsModule, RouterModule],
  exports: [
    PostCardComponent,
    UserCardComponent,
    PostLikeComponent,
    PostCommentComponent,
    EditUserComponent,
    SearchComponent,
  ],
})
export class HelpersModule {}
