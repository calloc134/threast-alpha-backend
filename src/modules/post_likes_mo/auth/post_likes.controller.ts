import { PaginatedQueryReqDto } from "@dto/req/query/queryReqDto";
import { SetSessionGuard } from "@guards/session_guard/session.decorator";
import { Controller, Delete, Get, Param, Post, Query, Session } from "@nestjs/common";
import { AuthPostLikesService } from "./post_likes.service";
import { Session as SecureSession } from "@fastify/secure-session";
import { ApiOkResponse } from "@nestjs/swagger";
import { PaginatedResDtoStandardPostLikeWithTinyPost, PaginatedResDtoTinyUser } from "@dto/res/wrapper/paginatedResDto";
import { StandardPostLikeResDto } from "@dto/res/post_like/standard";
import { SuccessResDto } from "@dto/types/success";

@Controller("api/posts")
@SetSessionGuard()
export class AuthPostLikesController {
  constructor(private readonly authPostLikesService: AuthPostLikesService) {}

  @Get(":post_cuid/likes")
  @ApiOkResponse({type: PaginatedResDtoStandardPostLikeWithTinyPost})
  async getPostsLikesByPostCuid(
    @Param("post_cuid") post_cuid: string,
    @Query() query: PaginatedQueryReqDto
  )
  {
    return await this.authPostLikesService.getPostsLikesByPostCuid(
      post_cuid,
      query.current_page ?? 1,
      query.per_page ?? 10
    );

  }

  @Post(":post_cuid/likes")
  @ApiOkResponse({type: StandardPostLikeResDto})
  async createPostLikeByPostCuid(
    @Session() session: SecureSession,
    @Param("post_cuid") post_cuid: string,
  )
  {
    return await this.authPostLikesService.createPostLikeByPostCuid(
      session.user_cuid,
      post_cuid
    );
  }

  @Delete(":post_cuid/likes")
  @ApiOkResponse({type: SuccessResDto})
  async deletePostLikeByPostCuid(
    @Session() session: SecureSession,
    @Param("post_cuid") post_cuid: string,
  )
  {
    return await this.authPostLikesService.deletePostLikeByPostCuid(
      session.user_cuid,
      post_cuid
    );
  }

}