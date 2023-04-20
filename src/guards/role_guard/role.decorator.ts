import { applyDecorators, createParamDecorator, SetMetadata, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { RoleGuard } from './role.guard';
import { ApiForbiddenResponse, ApiCookieAuth, ApiSecurity } from '@nestjs/swagger';
import { TemplateException } from '@dto/types/exception';

export const SetRole = (...roles: Role[]) => SetMetadata('roles', roles);

export const SetRoleGuard = () => {
  return applyDecorators(
    UseGuards(RoleGuard),
    ApiForbiddenResponse({ type: TemplateException }),
    ApiSecurity("role")
  )
}