import { StandardUserResDto } from '@dto/res/user/standard';
import {
  Controller,
  Get,
  Post,
  Session,
  Body,
  Put,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { AuthMyProfileService } from './my_profile.service';
import { Session as SecureSession } from '@fastify/secure-session';
import { ApiOkResponse } from '@nestjs/swagger';
import { SetSessionGuard } from '@guards/session_guard/session.decorator';
import { UpdateUserReqDto } from '@dto/req/user/update';
import { UpdateUserPasswordReqDto } from '@dto/req/user_password/update';
import { PaginatedResDto, PaginatedResDtoTinyPost, PaginatedResDtoTinyUser } from '@dto/res/wrapper/paginatedResDto';
import { TinyUserResDto } from '@dto/res/user/tiny';
import { PaginatedQueryReqDto } from '@dto/req/query/queryReqDto';

@Controller('api/user')
@SetSessionGuard()
export class AuthMyProfileController {
  constructor(private readonly authMyProfileService: AuthMyProfileService) {}

  @Get('me')
  @ApiOkResponse({ type: StandardUserResDto })
  async getMe(@Session() session: SecureSession) {
    return await this.authMyProfileService.getMe(session.user_cuid);
  }

  @Put('me')
  @ApiOkResponse({ type: StandardUserResDto })
  async updateMe(
    @Session() session: SecureSession,
    @Body() updateUserReqDto: UpdateUserReqDto,
  ) {
    return await this.authMyProfileService.updateMe(
      session.user_cuid,
      updateUserReqDto,
    );
  }

  @Delete('me')
  @ApiOkResponse({ type: StandardUserResDto })
  async deleteMe(@Session() session: SecureSession) {
    return await this.authMyProfileService.deleteMe(session.user_cuid);
  }

  @Put('me/password')
  @ApiOkResponse({ type: StandardUserResDto })
  async updateMyPassword(
    @Session() session: SecureSession,
    @Body() updateUserPasswordReqDto: UpdateUserPasswordReqDto,
  ) {
    return await this.authMyProfileService.updateMyPassword(
      session.user_cuid,
      updateUserPasswordReqDto,
    );
  }

  @Get('me/posts')
  @ApiOkResponse({ type: PaginatedResDtoTinyPost })
  async getMyPosts(
    @Query() query: PaginatedQueryReqDto,
    @Session() session: SecureSession,
  ) {
    return await this.authMyProfileService.getMyPosts(
      session.user_cuid,
      query.current_page ?? 1,
      query.per_page ?? 10,
    );
  }

  @Get('me/followings')
  @ApiOkResponse({ type: PaginatedResDtoTinyUser })
  async getMyFollowings(
    @Query() query: PaginatedQueryReqDto,
    @Session() session: SecureSession,
  ) {
    return await this.authMyProfileService.getMyFollowings(
      session.user_cuid,
      query.current_page ?? 1,
      query.per_page ?? 10,
    );
  }

  @Get('me/followers')
  @ApiOkResponse({ type: PaginatedResDtoTinyUser })
  async getMyFollowers(
    @Query() query: PaginatedQueryReqDto,
    @Session() session: SecureSession,
  ) {
    return await this.authMyProfileService.getMyFollowers(
      session.user_cuid,
      query.current_page ?? 1,
      query.per_page ?? 10,
    );
  }

  @Post('me/followings/:handle')
  @ApiOkResponse({ type: TinyUserResDto })
  async createMyFollowing(
    @Session() session: SecureSession,
    @Query('handle') dst_user_handle: string,
  ) {
    return await this.authMyProfileService.createMyFollowing(
      session.user_cuid,
      dst_user_handle,
    );
  }

}
