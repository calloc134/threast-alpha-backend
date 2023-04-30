import {
  Controller,
  Session,
  Body,
  Post,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthPostsService } from './posts.service';
import { SetSessionGuard } from '@guards/session_guard/session.decorator';
import { CreatePostRequestDto } from '@dto/req/post/create';
import { UpdatePostRequestDto } from '@dto/req/post/update';
import { Session as SecureSession } from '@fastify/secure-session';
import { ApiOkResponse } from '@nestjs/swagger';
import { SuccessResDto } from '@dto/types/success';
import { StandardPostResDto } from '@dto/res/post/standard';

@Controller('api/posts')
@SetSessionGuard()
export class AuthPostsController {
  constructor(private readonly nonAuthPostsService: AuthPostsService) {}

  @Post()
  @ApiOkResponse({ type: StandardPostResDto })
  async createPost(
    @Session() session: SecureSession,
    @Body() createPostRequestDto: CreatePostRequestDto,
  ) {
    return await this.nonAuthPostsService.createPost(
      session.user_cuid,
      createPostRequestDto,
    );
  }

  @Put(':post_cuid')
  @ApiOkResponse({ type: StandardPostResDto })
  async updatePostByCuid(
    @Param('post_cuid') post_cuid: string,
    @Session() session: SecureSession,
    @Body() updatePostRequestDto: UpdatePostRequestDto,
  ) {
    return await this.nonAuthPostsService.updatePostByCuid(
      session.user_cuid,
      post_cuid,
      updatePostRequestDto,
    );
  }

  @Delete(':post_cuid')
  @ApiOkResponse({ type: SuccessResDto })
  async deletePostByCuid(
    @Param('post_cuid') post_cuid: string,
    @Session() session: SecureSession,
  ) {
    return await this.nonAuthPostsService.deletePostByCuid(
      session.user_cuid,
      post_cuid,
    );
  }
}
