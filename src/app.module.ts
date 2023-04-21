import { NonAuthAuthModule } from "@modules/auth_mo/nonauth/auth.module";
import { AuthMyProfileModule } from "@modules/my_profile_mo/auth/my_profile.module";
import { Module } from "@nestjs/common";

@Module({
  imports: [NonAuthAuthModule, AuthMyProfileModule],
})
export class AppModule {}