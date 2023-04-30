import { NonAuthAuthModule } from "@modules/auth_mo/nonauth/auth.module";
import { AuthMyProfileModule } from "@modules/my_profile_mo/auth/my_profile.module";
import { NonAuthProfileByHandleModule } from "@modules/profile_by_handle_mo/nonauth/profile_by_handle.module";
import { AuthProfileByHandleModule } from "@modules/profile_by_handle_mo/auth/profile_by_handle.module";
import { Module } from "@nestjs/common";

@Module({
  imports: [NonAuthAuthModule, AuthMyProfileModule, NonAuthProfileByHandleModule, AuthProfileByHandleModule],
})
export class AppModule {}