import { BadRequestException } from "@nestjs/common";

export class SelfLikeException extends BadRequestException {
    constructor() {
        super("You cannot like your own post.");
    }
}