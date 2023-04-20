import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { SessionGuardService } from "./session.service";

@Injectable()
export class SessionGuard implements CanActivate {

  constructor(private readonly sessionService: SessionGuardService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const user_cuid = context.switchToHttp().getRequest().session.user_cuid

    return await this.sessionService.validateSession(user_cuid);
  }
}