import { BadRequestException } from "@nestjs/common";

export class PasswordMismatchException extends BadRequestException {
  constructor(message: string = "Passwords do not match. Please try again.") {
    super(message);
  }
}