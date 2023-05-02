import { ForbiddenException } from "@nestjs/common";

export class NotOwnerException extends ForbiddenException {
  constructor(message: string = "You are not the owner of this item.") {
    super(message);
  }
}