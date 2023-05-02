import { SessionGuard } from "./session.guard"
import { ApiCookieAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { TemplateException } from "@dto/types/exception.type"
import { applyDecorators, UseGuards } from "@nestjs/common";

export const SetSessionGuard = () => {
  return applyDecorators(
      // SessionGuardをガードとして適用
      UseGuards(SessionGuard),
      // swaggerドキュメント追加
      ApiUnauthorizedResponse({ type: TemplateException }),
      ApiCookieAuth("SESSIONID")
  )
}