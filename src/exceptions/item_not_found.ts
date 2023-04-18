import { BadRequestException } from "@nestjs/common";

export class ItemNotFound extends BadRequestException {
  constructor(message: string = "Item not found") {
    super(message);
  }
}