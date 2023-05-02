import { UnauthorizedException } from "@nestjs/common";

export class SessionNotFoundException extends UnauthorizedException {
  constructor(message: string = "Session not found. Please log in again to continue.") {
    super(message);
  }
}