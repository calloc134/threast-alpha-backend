import { Injectable } from '@nestjs/common';
import { PrismaService } from '@submodules/prisma_mo/prisma.service';
import { TinyUserResDto } from '@dto/res/user/tiny';
import { StandardPostCommentResDtoWithTinyUser } from '@dto/res/post_comment/standard_users';
import { PaginatedResDtoStandardPostCommentWithTinyUser } from '@dto/res/wrapper/paginatedResDto';
import { CreatePostCommentReqDto } from '@dto/req/post_comment/create';
import { UpdatePostCommentReqDto } from '@dto/req/post_comment/update';
import { PrivateItemException } from '@exceptions/private_item.exception';
import { NotOwnerException } from '@exceptions/not_owner.exception';

@Injectable()
export class AuthPostCommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllPostCommentsByPostCuid(post_cuid: string, current_page: number, per_page: number) {
    
    // 投稿が公開されているか確認
    let post = await this.prisma.post.findUniqueOrThrow({
      where: {
        cuid: post_cuid,
      },
    });

    if (post.private) {
      throw new PrivateItemException();
    }

    let result = (
      await this.prisma.postComment.findMany({
        where: {
          dst_post_cuid: post_cuid,
        },
        skip: (current_page - 1) * per_page,
        take: per_page,
        include: {
          src_user: true,
        },
      })
    ).map((postComment) => {
      return new StandardPostCommentResDtoWithTinyUser({
        user: new TinyUserResDto(postComment.src_user),
        ...postComment,
      });
    });

    return new PaginatedResDtoStandardPostCommentWithTinyUser({
      current_page: current_page,
      per_page: per_page,
      data: result,
    });
  }

  async getPostCommentByPostCommentCuid(post_cuid: string, post_comment_cuid: string) {

    // 投稿が公開されているか確認
    let post = await this.prisma.post.findUniqueOrThrow({
      where: {
        cuid: post_cuid,
      },
    });

    if (post.private) {
      throw new PrivateItemException();
    }

    let result = await this.prisma.postComment.findUniqueOrThrow({
      where: {
        cuid: post_comment_cuid,
      },
      include: {
        src_user: true,
      },
    });

    return new StandardPostCommentResDtoWithTinyUser({
      user: new TinyUserResDto(result.src_user),
      ...result,
    });

  }

  async createPostCommentByPostCuid(user_cuid: string, post_cuid: string, createPostCommentReqDto: CreatePostCommentReqDto) {
    
    // 投稿が公開されているか確認
    let post = await this.prisma.post.findUniqueOrThrow({
      where: {
        cuid: post_cuid,
      },
    });

    if (post.private) {
      throw new PrivateItemException();
    }

    let result = await this.prisma.postComment.create({
      data: {
        src_user_cuid: user_cuid,
        dst_post_cuid: post_cuid,
        content: createPostCommentReqDto.content,
      },
      include: {
        src_user: true,
      },
    });

    return new StandardPostCommentResDtoWithTinyUser({
      user: new TinyUserResDto(result.src_user),
      ...result,
    });
  }

  async deletePostCommentByPostCommentCuid(user_cuid: string, post_cuid: string, post_comment_cuid: string) {

    // コメントが自分のものか確認
    let post_comment = await this.prisma.postComment.findUniqueOrThrow({
      where: {
        cuid: post_comment_cuid,
      },
    });

    if (post_comment.src_user_cuid !== user_cuid) {
      throw new NotOwnerException()
    }

    await this.prisma.postComment.delete({
      where: {
        cuid: post_comment_cuid,
      },
    });

    return {
      success: true,
    };
  }

  async updatePostCommentByPostCommentCuid(user_cuid: string, post_cuid: string, post_comment_cuid: string, updatePostCommentReqDto: UpdatePostCommentReqDto) {
    
    // コメントが自分のものか確認
    let post_comment = await this.prisma.postComment.findUniqueOrThrow({
      where: {
        cuid: post_comment_cuid,
      },
    });

    if (post_comment.src_user_cuid !== user_cuid) {
      throw new NotOwnerException()
    }

    let result = await this.prisma.postComment.update({
      where: {
        cuid: post_comment_cuid,
      },
      data: {
        content: updatePostCommentReqDto.content,
      },
      include: {
        src_user: true,
      },
    });

    return new StandardPostCommentResDtoWithTinyUser({
      user: new TinyUserResDto(result.src_user),
      ...result,
    });
  }
}
