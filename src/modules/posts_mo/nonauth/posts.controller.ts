import { Controller, Get, Query, Param, Session } from '@nestjs/common';
import { NonAuthPostsService } from './posts.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { PaginatedResDtoTinyPost } from '@dto/res/wrapper/paginatedResDto';
import { PaginatedQueryReqDto } from '@dto/req/query/queryReqDto';
import { StandardPostResDto } from '@dto/res/post/standard';
import { Session as SecureSession } from '@fastify/secure-session';

@Controller('api/posts')
export class NonAuthPostsController {
  constructor(private readonly postsService: NonAuthPostsService) {}

  @Get('')
  @ApiOkResponse({ type: PaginatedResDtoTinyPost })
  async getAllPosts(@Query() query: PaginatedQueryReqDto) {
    return await this.postsService.getAllPosts(query.current_page ?? 1, query.per_page ?? 10);
  }

  @Get(':post_cuid')
  @ApiOkResponse({ type: StandardPostResDto })
  async getPostByCuid(@Param('post_cuid') post_cuid: string, @Session() session: SecureSession) {
    return await this.postsService.getPostByCuid(session.user_cuid ?? "NULL", post_cuid);
  }
}
