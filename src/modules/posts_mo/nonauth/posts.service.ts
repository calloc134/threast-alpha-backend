import { Injectable } from "@nestjs/common";
import { PrismaService } from "@submodules/prisma_mo/prisma.service";
import { TinyPostResDto } from "@dto/res/post/tiny";
import { PaginatedResDtoTinyPost } from "@dto/res/wrapper/paginatedResDto";
import { StandardPostResDto } from "@dto/res/post/standard";
import { TinyUserResDto } from "@dto/res/user/tiny";

@Injectable()
export class NonAuthPostsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllPosts(current_page: number, per_page: number) {
    let result = (
      await this.prisma.post.findMany({
        where: {
          private: false,
        },
        skip: (current_page - 1) * per_page,
        take: per_page,
      })
    ).map((post) => new TinyPostResDto(post));

    return new PaginatedResDtoTinyPost({
      current_page: current_page,
      per_page: per_page,
      data: result,
      });
  }

  async getPostByCuid(post_cuid: string) {
    let result = (
      await this.prisma.post.findUniqueOrThrow({
        where: {
          cuid: post_cuid,
        },
        include: {
          src_user: true,
        },
      })
    );

    let likes_num = await this.prisma.postLike.count({
      where: {
        dst_post_cuid: result.cuid,
      },
    });

    let comments_num = await this.prisma.postComment.count({
      where: {
        dst_post_cuid: result.cuid,
      },
    });


    return new StandardPostResDto({
      ...result,
      user: new TinyUserResDto(result.src_user),
      likes: likes_num,
      comments: comments_num,

    });
  }
}