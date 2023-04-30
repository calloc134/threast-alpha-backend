import { SessionGuardModule } from "@guards/session_guard/session.module";
import { Module } from "@nestjs/common";
import { PrismaModule } from "@submodules/prisma_mo/prisma.module";
import { AuthPostLikesService } from "./post_likes.service";
import { AuthPostLikesController } from "./post_likes.controller";

@Module({
  imports: [PrismaModule, SessionGuardModule],
  providers: [AuthPostLikesService],
  controllers: [AuthPostLikesController]
})
export class AuthPostLikesModule {}