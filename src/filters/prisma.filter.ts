import { ArgumentsHost, BadRequestException, Catch, HttpException } from "@nestjs/common";
import { BaseExceptionFilter } from "@nestjs/core";
import {
    Prisma,
} from "@prisma/client";
import { ItemAlreadyExistException } from "@exceptions/item_already_exist";
import { ItemNotFoundException } from "@exceptions/item_not_found";

@Catch(Prisma.PrismaClientKnownRequestError, Prisma.NotFoundError)
export class PrismaExceptionFilter extends BaseExceptionFilter {
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
        if (exception.code === "P2025") {
            super.catch(new ItemNotFoundException(), host);
        }
        else if (exception.code === "P2002"){
          super.catch(new ItemAlreadyExistException(), host)
        } else {
          super.catch(new BadRequestException(exception.message), host)
        }
    }
}
