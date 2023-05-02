import { ForbiddenException } from "@nestjs/common";

export class PrivateItemException extends ForbiddenException {
    constructor() {
        super('This item is not public and cannot be accessed.');
    }
}