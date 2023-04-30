import { Module } from "@nestjs/common";
import { PrismaService } from "@submodules/prisma_mo/prisma.service";
import { AuthProfileByHandleService } from "./profile_by_handle.service";
import { AuthProfileByHandleController } from "./profile_by_handle.controller";
import { SessionGuardModule } from "@guards/session_guard/session.module";
import { SessionGuard } from "@guards/session_guard/session.guard";
import { PrismaModule } from "@submodules/prisma_mo/prisma.module";

@Module({
  imports: [PrismaModule, SessionGuardModule],
  providers: [AuthProfileByHandleService, SessionGuard],
  controllers: [AuthProfileByHandleController]
})
export class AuthProfileByHandleModule {}