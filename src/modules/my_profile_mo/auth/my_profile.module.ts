import { Module } from "@nestjs/common";
import { PrismaModule } from "@submodules/prisma_mo/prisma.module";
import { AuthMyProfileService } from "./my_profile.service";
import { AuthMyProfileController } from "./my_profile.controller";
import { SessionGuardModule } from "@guards/session_guard/session.module";
import { SessionGuard } from "@guards/session_guard/session.guard";

@Module({
  imports: [PrismaModule, SessionGuardModule],
  providers: [AuthMyProfileService, SessionGuard],
  controllers: [AuthMyProfileController]
})
export class AuthMyProfileModule {}