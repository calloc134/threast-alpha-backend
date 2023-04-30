import { UpdateUserReqDto } from '@dto/req/user/update';
import { UpdateUserPasswordReqDto } from '@dto/req/user_password/update';
import { StandardUserResDto } from '@dto/res/user/standard';
import { PasswordMismatchException } from '@exceptions/password_mismatch';
import { Injectable, Session } from '@nestjs/common';
import { PrismaService } from '@submodules/prisma_mo/prisma.service';
import { hash, verify } from 'argon2';
import { PagenatedResDto, PagenatedResDtoTinyPost, PagenatedResDtoTinyUser } from '@dto/wrapper/pagenatedResDto';
import { TinyUserResDto } from '@dto/res/user/tiny';
import { TinyPostResDto } from '@dto/res/post/tiny';

@Injectable()
export class AuthMyProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getMe(current_user_cuid: string) {
    let result = await this.prisma.user.findUniqueOrThrow({
      where: {
        cuid: current_user_cuid,
      },
    });

    return new StandardUserResDto(result);
  }

  async updateMe(
    current_user_cuid: string,
    updateUserReqDto: UpdateUserReqDto,
  ) {
    let result = await this.prisma.user.update({
      where: {
        cuid: current_user_cuid,
      },
      // ここではスプレッド構文を使って展開
      data: {
        ...updateUserReqDto,
      },
    });

    return new StandardUserResDto(result);
  }

  async deleteMe(current_user_cuid: string) {
    let result = await this.prisma.user.delete({
      where: {
        cuid: current_user_cuid,
      },
    });

    return new StandardUserResDto(result);
  }

  async updateMyPassword(
    current_user_cuid: string,
    updateUserPasswordReqDto: UpdateUserPasswordReqDto,
  ) {
    let current_password = await this.prisma.user.findUniqueOrThrow({
      where: {
        cuid: current_user_cuid,
      },
    });

    if (
      !(await verify(
        current_password.password,
        updateUserPasswordReqDto.old_password,
      ))
    ) {
      throw new PasswordMismatchException();
    }

    let result = await this.prisma.user.update({
      where: {
        cuid: current_user_cuid,
      },
      data: {
        password: await hash(updateUserPasswordReqDto.new_password),
      },
    });

    return new StandardUserResDto(result);
  }
  
  async getMyPosts(current_user_cuid: string, current_page: number, per_page: number) {
    let result = (
      await this.prisma.post.findMany({
        where: {
          src_user_cuid: current_user_cuid,
        },
        skip: (current_page - 1) * per_page,
        take: per_page,
      })
    ).map((post) => new TinyPostResDto(post));

    return new PagenatedResDtoTinyPost({
      current_page: current_page,
      per_page: per_page,
      data: result,
    });
  }

  async getMyFollowings(
    current_user_cuid: string,
    current_page: number,
    per_page: number,
  ) {
    let result = (
      // current_user_cuidのユーザにフォローされているユーザを取得
      await this.prisma.user.findMany({
        where: {
          followed_by: {
            some: {
              src_user_cuid: current_user_cuid,
            }
          }
        },
        skip: (current_page - 1) * per_page,
        take: per_page,
      })
    ).map((user) => new TinyUserResDto(user));

    console.log(result);

    return new PagenatedResDtoTinyUser({
      current_page,
      per_page,
      data: result,
    });
  }

  async getMyFollowers(current_user_cuid: string, current_page: number, per_page: number) {
    let result = (
      // current_user_cuidのユーザをフォローしているユーザを取得
      await this.prisma.user.findMany({
        where: {
          followings: {
            some: {
              dst_user_cuid: current_user_cuid,
            },
          },
        },
        skip: (current_page - 1) * per_page,
        take: per_page,
      })
    ).map((user) => new TinyUserResDto(user));

    return new PagenatedResDtoTinyUser({
      current_page: current_page,
      per_page: per_page,
      data: result,
    });
  }

  async createMyFollowing(current_user_cuid: string, dst_user_handle: string) {
    let result = await this.prisma.follow.create({
      data: {
        src_user: {
          connect: {
            cuid: current_user_cuid,
          },
        },
        dst_user: {
          connect: {
            handle: dst_user_handle,
          },
        },
      },
      include: {
        dst_user: true,
      },
    });

    return new TinyUserResDto(result['dst_user']);
  }

}
