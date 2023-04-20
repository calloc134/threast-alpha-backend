import { Module } from "@nestjs/common";
import {RoleGuardService } from "./role.service";
import { RoleGuard } from "./role.guard";
import { PrismaModule } from "@submodules/prisma_mo/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [RoleGuardService, RoleGuard],
  exports: [RoleGuardService, RoleGuard],
})
export class RoleGuardModule {}