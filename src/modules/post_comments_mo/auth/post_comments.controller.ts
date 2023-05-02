import { Controller, Get, Query, Session, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { AuthPostCommentsService } from './post_comments.service';
import { PaginatedQueryReqDto } from '@dto/req/query/queryReqDto';
import { ApiOkResponse } from '@nestjs/swagger';
import { PaginatedResDtoStandardPostCommentWithTinyUser } from '@dto/res/wrapper/paginatedResDto';
import { StandardPostCommentResDtoWithTinyUser } from '@dto/res/post_comment/standard_users';
import { Session as SecureSession } from '@fastify/secure-session';
import { CreatePostCommentReqDto } from '@dto/req/post_comment/create';
import { UpdatePostCommentReqDto } from '@dto/req/post_comment/update';
import { SuccessResDto } from '@dto/types/success.type';

@Controller('api/posts')
export class AuthPostCommentsController {
  constructor(private readonly authPostCommentsService: AuthPostCommentsService) {}

  @Get(':post_cuid/comments')
  @ApiOkResponse({ type: PaginatedResDtoStandardPostCommentWithTinyUser })
  async getAllPostsCommentsByPostCuid(@Param('post_cuid') post_cuid: string, @Query() query: PaginatedQueryReqDto) {
    return await this.authPostCommentsService.getAllPostCommentsByPostCuid(post_cuid, query.current_page ?? 1, query.per_page ?? 10);
  }

  @Get(':post_cuid/comments/:post_comment_cuid')
  @ApiOkResponse({ type: StandardPostCommentResDtoWithTinyUser })
  async getPostCommentByPostCommentCuid(@Param('post_cuid') post_cuid: string, @Param('post_comment_cuid') post_comment_cuid: string) {
    return await this.authPostCommentsService.getPostCommentByPostCommentCuid(post_cuid, post_comment_cuid);
  }

  @Post(':post_cuid/comments')
  @ApiOkResponse({ type: StandardPostCommentResDtoWithTinyUser })
  async createPostCommentByPostCuid(
    @Session() session: SecureSession,
    @Param('post_cuid') post_cuid: string,
    @Body() createPostCommentReqDto: CreatePostCommentReqDto,
  ) {
    return await this.authPostCommentsService.createPostCommentByPostCuid(session.user_cuid, post_cuid, createPostCommentReqDto);
  }

  @Put(':post_cuid/comments/:post_comment_cuid')
  @ApiOkResponse({ type: StandardPostCommentResDtoWithTinyUser })
  async updatePostCommentByPostCommentCuid(
    @Session() session: SecureSession,
    @Param('post_cuid') post_cuid: string,
    @Param('post_comment_cuid') post_comment_cuid: string,
    @Body() updatePostCommentReqDto: UpdatePostCommentReqDto,
  ) {
    return await this.authPostCommentsService.updatePostCommentByPostCommentCuid(session.user_cuid, post_cuid, post_comment_cuid, updatePostCommentReqDto);
  }

  @Delete(':post_cuid/comments/:post_comment_cuid')
  @ApiOkResponse({ type: SuccessResDto })
  async deletePostCommentByPostCommentCuid(
    @Session() session: SecureSession,
    @Param('post_cuid') post_cuid: string,
    @Param('post_comment_cuid') post_comment_cuid: string,
  ) {
    return await this.authPostCommentsService.deletePostCommentByPostCommentCuid(session.user_cuid, post_cuid, post_comment_cuid);
  }
}
