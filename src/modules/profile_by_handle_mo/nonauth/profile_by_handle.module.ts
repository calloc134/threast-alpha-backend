import { Module } from "@nestjs/common";
import { PrismaModule } from "@submodules/prisma_mo/prisma.module";
import { ProfileByHandleService } from "./profile_by_handle.service";
import { ProfileByHandleController } from "./profile_by_handle.controller";

@Module(
  {
    imports: [PrismaModule],
    providers: [ProfileByHandleService],
    controllers: [ProfileByHandleController]
  })
export class NonAuthProfileByHandleModule {}