import { Module } from "@nestjs/common";
import { NonAuthAuthService } from "./auth.service";
import { PrismaModule } from "@submodules/prisma_mo/prisma.module";
import { NonAuthAuthController } from "./auth.controller";

@Module({
  imports: [PrismaModule],
  controllers: [NonAuthAuthController],
  providers: [NonAuthAuthService],
})
export class NonAuthAuthModule {}