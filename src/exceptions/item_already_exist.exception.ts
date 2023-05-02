import { BadRequestException } from "@nestjs/common";

export class ItemAlreadyExistException extends BadRequestException {
  constructor(message: string = "This item already exists. Please choose a different name or identifier." ) {
    super(message);
  }
}