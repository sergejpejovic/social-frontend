import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from './post-card/post-card.component';
import { UserCardComponent } from './user-card/user-card.component';
import { FormsModule } from '@angular/forms';
import { PostLikeComponent } from './post-like/post-like.component';
import { PostCommentComponent } from './post-comment/post-comment.component';

@NgModule({
  declarations: [
    PostCardComponent,
    UserCardComponent,
    PostLikeComponent,
    PostCommentComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    PostCardComponent,
    UserCardComponent,
    PostLikeComponent,
    PostCommentComponent,
  ],
})
export class HelpersModule {}
