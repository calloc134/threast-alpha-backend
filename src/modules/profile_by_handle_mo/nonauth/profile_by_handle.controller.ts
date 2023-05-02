import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProfileByHandleService } from './profile_by_handle.service';
import { ApiOkResponse } from '@nestjs/swagger';
import { PaginatedQueryReqDto } from '@dto/req/query/queryReqDto';
import { PaginatedResDtoTinyUser } from '@dto/res/wrapper/paginatedResDto';
import { LimitedUserResDto } from '@dto/res/user/limited';

@Controller('api/users')
export class ProfileByHandleController {
  constructor(private readonly profileByHandleService: ProfileByHandleService) {}

  @Get('')
  @ApiOkResponse({ type: PaginatedResDtoTinyUser })
  async getAllUsers(@Query() query: PaginatedQueryReqDto) {
    return await this.profileByHandleService.getAllUsers(query.current_page ?? 1, query.per_page ?? 10);
  }

  @Get('@:handle')
  @ApiOkResponse({ type: LimitedUserResDto })
  async getUserByHandle(@Param('handle') handle: string) {
    return await this.profileByHandleService.getUserByHandle(handle);
  }
}
