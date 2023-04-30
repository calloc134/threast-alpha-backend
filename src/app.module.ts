import { NonAuthAuthModule } from '@modules/auth_mo/nonauth/auth.module';
import { AuthMyProfileModule } from '@modules/my_profile_mo/auth/my_profile.module';
import { NonAuthProfileByHandleModule } from '@modules/profile_by_handle_mo/nonauth/profile_by_handle.module';
import { AuthProfileByHandleModule } from '@modules/profile_by_handle_mo/auth/profile_by_handle.module';
import { Module } from '@nestjs/common';
import { NonAuthPostsModule } from '@modules/posts_mo/nonauth/posts.module';
import { AuthPostsModule } from '@modules/posts_mo/auth/posts.module';
import { AuthPostLikesModule } from '@modules/post_likes_mo/auth/post_likes.module';

@Module({
  imports: [
    NonAuthAuthModule,
    AuthMyProfileModule,
    NonAuthProfileByHandleModule,
    AuthProfileByHandleModule,
    NonAuthPostsModule,
    AuthPostsModule,
    AuthPostLikesModule
  ],
})
export class AppModule {}
