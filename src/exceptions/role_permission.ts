import { ForbiddenException } from "@nestjs/common";

export class RolePermissionException extends ForbiddenException {
  constructor(message: string = "Role permission error") {
    super(message);
  }
}