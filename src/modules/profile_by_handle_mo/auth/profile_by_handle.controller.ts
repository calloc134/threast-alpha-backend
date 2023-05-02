import { SetSessionGuard } from '@guards/session_guard/session.decorator';
import { Controller, Get, Param, Query } from '@nestjs/common';
import { AuthProfileByHandleService } from './profile_by_handle.service';
import { PaginatedQueryReqDto } from '@dto/req/query/queryReqDto';
import { PaginatedResDtoTinyPost, PaginatedResDtoTinyUser } from '@dto/res/wrapper/paginatedResDto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('api/users')
@SetSessionGuard()
export class AuthProfileByHandleController {
  constructor(private readonly authProfileByHandleService: AuthProfileByHandleService) {}

  @Get(':handle/posts')
  @ApiOkResponse({ type: PaginatedResDtoTinyPost })
  async getPostsByHandle(@Param('handle') handle: string, @Query() query: PaginatedQueryReqDto) {
    return await this.authProfileByHandleService.getUserPostsByHandle(handle, query.current_page ?? 1, query.per_page ?? 10);
  }

  @Get(':handle/followings')
  @ApiOkResponse({ type: PaginatedResDtoTinyUser })
  async getFollowingsByHandle(@Param('handle') handle: string, @Query() query: PaginatedQueryReqDto) {
    return await this.authProfileByHandleService.getUserFollowingsByHandle(handle, query.current_page ?? 1, query.per_page ?? 10);
  }

  @Get(':handle/followers')
  @ApiOkResponse({ type: PaginatedResDtoTinyUser })
  async getFollowersByHandle(@Param('handle') handle: string, @Query() query: PaginatedQueryReqDto) {
    return await this.authProfileByHandleService.getUserFollowersByHandle(handle, query.current_page ?? 1, query.per_page ?? 10);
  }
}
