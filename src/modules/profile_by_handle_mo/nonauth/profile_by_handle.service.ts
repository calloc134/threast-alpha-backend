import { TinyUserResDto } from '@dto/res/user/tiny';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@submodules/prisma_mo/prisma.service';
import { PaginatedResDtoTinyUser } from '@dto/res/wrapper/paginatedResDto';
import { LimitedUserResDto } from '@dto/res/user/limited';

@Injectable()
export class ProfileByHandleService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserByHandle(handle: string) {
    let result = await this.prisma.user.findUniqueOrThrow({
      where: {
        handle: handle,
      },
    });

    return new LimitedUserResDto(result);
  }

  async getAllUsers(current_page: number, per_page: number) {
    let result = (
      await this.prisma.user.findMany({
        skip: (current_page - 1) * per_page,
        take: per_page,
      })
    ).map((user) => new TinyUserResDto(user));

    return new PaginatedResDtoTinyUser({
      data: result,
      current_page,
      per_page,
    });
  }
}
