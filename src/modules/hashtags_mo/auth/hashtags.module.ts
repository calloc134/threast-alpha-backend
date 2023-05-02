import { SessionGuardModule } from "@guards/session_guard/session.module";
import { Module } from "@nestjs/common";
import { PrismaModule } from "@submodules/prisma_mo/prisma.module";
import { AuthHashtagsService } from "./hashtags.service";
import { AuthHashtagsController } from "./hashtags.controller";

@Module({
  imports: [PrismaModule, SessionGuardModule],
  providers: [AuthHashtagsService],
  controllers: [AuthHashtagsController]
})
export class AuthHashtagsModule {}