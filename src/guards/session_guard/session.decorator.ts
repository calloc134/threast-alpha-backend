import { SessionGuard } from "./session.guard"
import { ApiCookieAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { TemplateException } from "@dto/types/exception"
import { applyDecorators, UseGuards } from "@nestjs/common";

export const SetSessionGuard = () => {
  return applyDecorators(
      UseGuards(SessionGuard),
      ApiUnauthorizedResponse({ type: TemplateException }),
      ApiCookieAuth("SESSIONID")
  )
}