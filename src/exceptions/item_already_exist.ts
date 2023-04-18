import { BadRequestException } from "@nestjs/common";

export class ItemAlreadyExistException extends BadRequestException {
  constructor(message: string = "Item already exist" ) {
    super(message);
  }
}