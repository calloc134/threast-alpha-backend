import { applyDecorators, createParamDecorator, SetMetadata, UseGuards } from '@nestjs/common';
import { Role } from '@prisma/client';
import { RoleGuard } from './role.guard';
import { ApiForbiddenResponse, ApiCookieAuth, ApiSecurity } from '@nestjs/swagger';
import { TemplateException } from '@dto/types/exception';

// ロール指定用のデコレータ
export const SetRole = (...roles: Role[]) => SetMetadata('roles', roles);

export const SetRoleGuard = () => {
  return applyDecorators(
    // RoleGuardをガードとして適用
    UseGuards(RoleGuard),
    // swaggerドキュメント追加
    ApiForbiddenResponse({ type: TemplateException }),
    ApiSecurity("role")
  )
}