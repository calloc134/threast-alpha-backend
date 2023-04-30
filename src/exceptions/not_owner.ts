import { ForbiddenException } from "@nestjs/common";

export class NotOwnerException extends ForbiddenException {
  constructor(message: string = "Not owner") {
    super(message);
  }
}