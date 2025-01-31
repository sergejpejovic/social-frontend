import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCardComponent } from './post-card/post-card.component';
import { UserCardComponent } from './user-card/user-card.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PostCardComponent, UserCardComponent],
  imports: [CommonModule, FormsModule],
  exports: [PostCardComponent, UserCardComponent],
})
export class HelpersModule {}
