import { Injectable } from '@nestjs/common';
import { PrismaService } from '@submodules/prisma_mo/prisma.service';
import { CreatePostRequestDto } from '@dto/req/post/create';
import { UpdatePostRequestDto } from '@dto/req/post/update';
import { StandardPostResDto } from '@dto/res/post/standard';
import { NotOwnerException } from '@exceptions/not_owner.exception';
import { TinyUserResDto } from '@dto/res/user/tiny';
import { ItemNotFoundException } from '@exceptions/item_not_found.exception';
import { StandardHashtagResDto } from '@dto/res/hashtag/standard';
import { TinyHashtagResDto } from '@dto/res/hashtag/tiny';

@Injectable()
export class AuthPostsService {
  constructor(private readonly prisma: PrismaService) {}

  async createPost(current_user_cuid: string, createPostRequestDto: CreatePostRequestDto) {

    // ハッシュタグが全て存在するかを確認
    let hashtags = await this.prisma.hashTag.findMany({
      where: {
        name: {
          in: createPostRequestDto.hashtags,
        },
      },
    });

    if (hashtags.length != createPostRequestDto.hashtags.length) {
      throw new ItemNotFoundException();
    }

    let result = await this.prisma.post.create({
      data: {
        title: createPostRequestDto.title,
        body: createPostRequestDto.body,
        private: createPostRequestDto.private,
        src_user_cuid: current_user_cuid,
        hashtags: {
          connect: createPostRequestDto.hashtags.map((hashtag) => {
            return {
              name: hashtag,
            };
          }),
        }
      },
      include: {
        src_user: true,
        hashtags: true
      },
    });

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

  async updatePostByCuid(current_user_cuid: string, post_cuid: string, updatePostRequestDto: UpdatePostRequestDto) {
    // 投稿者が自分であることを確認
    let post = await this.prisma.post.findUniqueOrThrow({
      where: {
        cuid: post_cuid,
      },
      select: {
        src_user_cuid: true,
      },
    });

    if (post.src_user_cuid !== current_user_cuid) {
      throw new NotOwnerException();
    }

    // もしハッシュタグの指定があれば、ハッシュタグが全て存在するかを確認
    if (updatePostRequestDto.hashtags) {
      let hashtags = await this.prisma.hashTag.findMany({
        where: {
          name: {
            in: updatePostRequestDto.hashtags,
          },
        },
      });

      if (hashtags.length != updatePostRequestDto.hashtags.length) {
        throw new ItemNotFoundException();
      }
    }

    let result = await this.prisma.post.update({
      where: {
        cuid: post_cuid,
      },
      data: {
        title: updatePostRequestDto.title,
        body: updatePostRequestDto.body,
        private: updatePostRequestDto.private,
        // 三項演算子で分岐 hashtagsがundefinedの場合は何もしない
        hashtags: updatePostRequestDto.hashtags ? {
          set: updatePostRequestDto.hashtags.map((hashtag) => {
            return {
              name: hashtag,
            };
          }),  
        } : undefined,
      },
      include: {
        src_user: true,
        hashtags: true,
      },
    });

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

  async deletePostByCuid(current_user_cuid: string, post_cuid: string) {
    // 投稿者が自分であることを確認
    let post = await this.prisma.post.findUniqueOrThrow({
      where: {
        cuid: post_cuid,
      },
      select: {
        src_user_cuid: true,
      },
    });

    if (post.src_user_cuid !== current_user_cuid) {
      throw new NotOwnerException();
    }

    await this.prisma.post.delete({
      where: {
        cuid: post_cuid,
      },
    });

    return {
      success: true,
    };
  }
}
