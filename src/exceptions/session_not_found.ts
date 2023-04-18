import { UnauthorizedException } from "@nestjs/common";

export class SessionNotFoundError extends UnauthorizedException {
  constructor(message: string = "Session not found") {
    super(message);
  }
}