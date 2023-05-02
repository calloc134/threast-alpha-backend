import { ForbiddenException } from "@nestjs/common";

export class RolePermissionException extends ForbiddenException {
  constructor(message: string = "Access denied. You do not have sufficient permissions to perform this action.") {
    super(message);
  }
}