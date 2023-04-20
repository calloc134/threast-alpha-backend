import { Module } from "@nestjs/common";
import { SessionGuard } from "./session.guard";
import { SessionGuardService } from "./session.service";

@Module({
  providers: [SessionGuardService, SessionGuard],
  exports: [SessionGuardService, SessionGuard],
})
export class SessionGuardModule {}