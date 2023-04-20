import { NonAuthAuthModule } from "@modules/auth_mo/nonauth/auth.module";
import { Module } from "@nestjs/common";

@Module({
  imports: [NonAuthAuthModule],
})
export class AppModule {}