import { Injectable } from '@nestjs/common';
import { PrismaService } from '@submodules/prisma_mo/prisma.service';
import { TinyPostResDto } from '@dto/res/post/tiny';
import { PaginatedResDtoTinyPost } from '@dto/res/wrapper/paginatedResDto';
import { StandardPostResDto } from '@dto/res/post/standard';
import { TinyUserResDto } from '@dto/res/user/tiny';
import { PrivateItemException } from '@exceptions/private_item.exception';
import { TinyHashtagResDto } from '@dto/res/hashtag/tiny';

@Injectable()
export class NonAuthPostsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllPosts(current_page: number, per_page: number) {
    let result = (
      await this.prisma.post.findMany({
        where: {
          // 公開されているものだけ取得
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

  async getPostByCuid(current_user_cuid: string, post_cuid: string) {
    let result = await this.prisma.post.findUniqueOrThrow({
      where: {
        cuid: post_cuid,
      },
      include: {
        src_user: true,
        hashtags: true,
      },
    });

    // 公開されていない、もしくは自分の投稿でない場合はエラー
    // ただし公開されていないが自分の投稿の場合はOK
    if (result.private && result.src_user.cuid !== current_user_cuid) {
      throw new PrivateItemException();
    }

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
      hashtags: result.hashtags.map((hashtag) => new TinyHashtagResDto(hashtag)),
      likes: likes_num,
      comments: comments_num,
    });
  }
}
