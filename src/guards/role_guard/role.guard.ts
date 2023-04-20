import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { RoleGuardService } from './role.service';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly roleService: RoleGuardService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const setRoles = this.reflector.get<Role[]>('roles', context.getHandler());

    const user_cuid = context.switchToHttp().getRequest().session.user_cuid;

    return await this.roleService.validateRole(user_cuid, setRoles);
  }
}
