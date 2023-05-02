import { StandardPostLikeResDto } from '@dto/res/post_like/standard';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@submodules/prisma_mo/prisma.service';
import { PaginatedResDtoStandardPostLike } from '@dto/res/wrapper/paginatedResDto';
import { TinyUserResDto } from '@dto/res/user/tiny';
import { StandardPostLikeResDtoWithTinyUser } from '@dto/res/post_like/standard_users';
import { PrivateItemException } from '@exceptions/private_item.exception';
import { SelfLikeException } from '@exceptions/self_like.exception';

@Injectable()
export class AuthPostLikesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllPostsLikesByPostCuid(post_cuid: string, current_page: number, per_page: number) {

    // 投稿が公開されているか確認
    let post = await this.prisma.post.findUniqueOrThrow({
      where: {
        cuid: post_cuid,
      },
    });
    
    if (post.private) {
      throw new PrivateItemException();
    }

    // 特定の投稿にいいねしたユーザーを取得
    let result = (
      await this.prisma.postLike.findMany({
        where: {
          dst_post_cuid: post_cuid,
        },
        skip: (current_page - 1) * per_page,
        take: per_page,
        include: {
          src_user: true,
        },
      })
    ).map((postLike) => {
      return new StandardPostLikeResDtoWithTinyUser({
        user: new TinyUserResDto(postLike.src_user),
        ...postLike,
      });
    });

    return new PaginatedResDtoStandardPostLike({
      current_page: current_page,
      per_page: per_page,
      data: result,
    });
  }

  async createPostLikeByPostCuid(user_cuid: string, post_cuid: string) {

    // 投稿が公開されているか確認
    let post = await this.prisma.post.findUniqueOrThrow({
      where: {
        cuid: post_cuid,
      },
    });

    if (post.private) {
      throw new PrivateItemException();
    }
    
    // 自分の投稿にいいねはできない
    if (post.src_user_cuid === user_cuid) {
      throw new SelfLikeException();
    }

    let result = await this.prisma.postLike.create({
      data: {
        src_user_cuid: user_cuid,
        dst_post_cuid: post_cuid,
      }, include: {
        src_user: true
      }
    });

    return new StandardPostLikeResDtoWithTinyUser(result);
  }

  async deletePostLikeByPostCuid(user_cuid: string, post_cuid: string) {

    // 投稿が公開されているか確認
    let post = await this.prisma.post.findUniqueOrThrow({
      where: {
        cuid: post_cuid,
      },
    });

    if (post.private) {
      throw new PrivateItemException();
    }

    let result = await this.prisma.postLike.delete({
      where: {
        src_user_cuid_dst_post_cuid: {
          src_user_cuid: user_cuid,
          dst_post_cuid: post_cuid,
        },
      },
    });

    return new StandardPostLikeResDto(result);
  }
}
