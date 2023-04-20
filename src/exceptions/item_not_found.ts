import { BadRequestException } from "@nestjs/common";

export class ItemNotFoundException extends BadRequestException {
  constructor(message: string = "Item not found") {
    super(message);
  }
}