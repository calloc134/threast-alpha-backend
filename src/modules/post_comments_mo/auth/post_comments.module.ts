import { SessionGuardModule } from "@guards/session_guard/session.module";
import { Module } from "@nestjs/common";
import { PrismaModule } from "@submodules/prisma_mo/prisma.module";
import { AuthPostCommentsController } from "./post_comments.controller";
import { AuthPostCommentsService } from "./post_comments.service";

@Module({
  imports: [PrismaModule, SessionGuardModule],
  controllers: [AuthPostCommentsController],
  providers: [AuthPostCommentsService],
})
export class AuthPostCommentsModule {}