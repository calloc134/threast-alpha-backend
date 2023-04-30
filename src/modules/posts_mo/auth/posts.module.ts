import { SessionGuardModule } from "@guards/session_guard/session.module";
import { Module } from "@nestjs/common";
import { PrismaModule } from "@submodules/prisma_mo/prisma.module";
import { AuthPostsService } from "./posts.service";
import { SessionGuard } from "@guards/session_guard/session.guard";
import { AuthPostsController } from "./posts.controller";

@Module({
  imports: [PrismaModule, SessionGuardModule],
  providers: [AuthPostsService, SessionGuard],
  controllers: [AuthPostsController]
})
export class AuthPostsModule {}