import { BadRequestException } from "@nestjs/common";

export class PasswordMismatchException extends BadRequestException {
  constructor(message: string = "Password mismatch") {
    super(message);
  }
}