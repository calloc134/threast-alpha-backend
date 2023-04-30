import { Injectable } from "@nestjs/common";
import { PrismaService } from "@submodules/prisma_mo/prisma.service";
import { TinyUserResDto } from "@dto/res/user/tiny";
import { TinyPostResDto } from "@dto/res/post/tiny";
import { PaginatedResDtoTinyPost, PaginatedResDtoTinyUser } from "@dto/res/wrapper/paginatedResDto";

@Injectable()
export class AuthProfileByHandleService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserFollowingsByHandle(handle: string, current_page: number, per_page: number) {
    // handleのユーザが起点のフォローがfolloed_byにあるユーザを取得
    let result = (
      await this.prisma.user.findMany({
        where: {
          followed_by: {
            some: {
              src_user: {
                handle: handle,
              }
            },
          },
        },
        skip: (current_page - 1) * per_page,
        take: per_page,
      })
    ).map((user) => new TinyUserResDto(user));
    
    return new PaginatedResDtoTinyUser({
      current_page: current_page,
      per_page: per_page,
      data: result,
    });
  }

  async getUserFollowersByHandle(handle: string, current_page: number, per_page: number) {

    // handleのユーザが終点のフォローがfollowingsにあるユーザを取得
    let result = (
      await this.prisma.user.findMany({
        where: {
          followings: {
            some: {
              dst_user: {
                handle: handle,
              }
            },
          },
        },
        skip: (current_page - 1) * per_page,
        take: per_page,
      })

    ).map((user) => new TinyUserResDto(user));

    return new PaginatedResDtoTinyUser({
      current_page: current_page,
      per_page: per_page,
      data: result,
    });
  }

  async getUserPostsByHandle(handle: string, current_page: number, per_page: number) {
    let result = (
      await this.prisma.post.findMany({
        where: {
          src_user: {
            handle: handle,
          },
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
}