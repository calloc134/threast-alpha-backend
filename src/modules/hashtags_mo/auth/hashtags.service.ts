import { TinyHashtagResDto } from '@dto/res/hashtag/tiny';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@submodules/prisma_mo/prisma.service';
import { PaginatedResDtoTinyHashtag } from '@dto/res/wrapper/paginatedResDto';
import { StandardHashtagResDto } from '@dto/res/hashtag/standard';
import { CreateHashtagReqDto } from '@dto/req/hashtag/create';
import { UpdateHashtagReqDto } from '@dto/req/hashtag/update';

@Injectable()
export class AuthHashtagsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllHashtags(current_page: number, per_page: number) {
    let result = (
      await this.prisma.hashTag.findMany({
        skip: (current_page - 1) * per_page,
        take: per_page,
      })
    ).map((hashtag) => {
      return new TinyHashtagResDto({
        ...hashtag,
      });
    });

    return new PaginatedResDtoTinyHashtag({
      current_page: current_page,
      per_page: per_page,
      data: result,
    });
  }

  async getHashtagByHashtagName(hashtag_name: string) {
    let result = await this.prisma.hashTag.findUniqueOrThrow({
      where: {
        name: hashtag_name,
      },
    });

    return new StandardHashtagResDto(result);
  }

  async createHashtag(createHashTagReqDto: CreateHashtagReqDto) {
    let result = await this.prisma.hashTag.create({
      data: {
        name: createHashTagReqDto.name,
        description: '',
      },
    });

    return new StandardHashtagResDto(result);
  }

  async updateHashtag(hashtag_name: string, updateHashtagReqDto: UpdateHashtagReqDto) {
    let result = await this.prisma.hashTag.update({
      where: {
        name: hashtag_name,
      },
      data: {
        description: updateHashtagReqDto.description,
      },
    });

    return new StandardHashtagResDto(result);
  }
}
