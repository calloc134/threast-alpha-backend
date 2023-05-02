import { BadRequestException } from "@nestjs/common";

export class ItemNotFoundException extends BadRequestException {
  constructor(message: string = "The item you are trying to access does not exist. Please check the identifier and try again.") {
    super(message);
  }
}