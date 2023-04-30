import { Controller, Get, Param, Query } from "@nestjs/common";
import { ProfileByHandleService } from "./profile_by_handle.service";
import { ApiOkResponse } from "@nestjs/swagger";
import { TinyUserResDto } from "@dto/res/user/tiny";
import { PaginatedQueryReqDto } from "@dto/req/query/queryReqDto";
import { PaginatedResDto } from "@dto/res/wrapper/paginatedResDto";
import { StandardUserResDto } from "@dto/res/user/standard";

@Controller('api/users')
export class ProfileByHandleController {
  constructor(private readonly profileByHandleService: ProfileByHandleService) {}

  @Get('')
  @ApiOkResponse({ type: PaginatedResDto })
  async getAllUsers(
    @Query() query: PaginatedQueryReqDto
  ) {
    return await this.profileByHandleService.getAllUsers(
      query.current_page ?? 1,
      query.per_page ?? 10
    );
  }

  @Get('@:handle')
  @ApiOkResponse({ type: StandardUserResDto })
  async getUserByHandle(
    @Param('handle') handle: string
  ) {
    return await this.profileByHandleService.getUserByHandle(handle);
  }

}