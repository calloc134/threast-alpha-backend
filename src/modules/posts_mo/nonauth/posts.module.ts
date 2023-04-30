import { NonAuthAuthService } from "@modules/auth_mo/nonauth/auth.service";
import { Module } from "@nestjs/common";
import { PrismaModule } from "@submodules/prisma_mo/prisma.module";
import { NonAuthPostsService } from "./posts.service";
import { NonAuthPostsController } from "./posts.controller";

@Module({
  imports: [PrismaModule],
  providers: [NonAuthPostsService],
  controllers: [NonAuthPostsController]
})
export class NonAuthPostsModule {}