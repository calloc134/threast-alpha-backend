import { UnauthorizedException } from "@nestjs/common";

export class SessionNotFoundException extends UnauthorizedException {
  constructor(message: string = "Session not found") {
    super(message);
  }
}