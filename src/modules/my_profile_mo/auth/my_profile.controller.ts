import { StandardUserResDto } from "@dto/res/user/standard";
import { Controller, Get,Post, Session, Body, Put, Delete } from "@nestjs/common";
import { AuthMyProfileService } from "./my_profile.service";
import { Session as SecureSession } from "@fastify/secure-session";
import { ApiOkResponse } from "@nestjs/swagger";
import { SetSessionGuard } from "@guards/session_guard/session.decorator";
import { UpdateUserReqDto } from "@dto/req/user/update";

@Controller("api")
@SetSessionGuard()
export class AuthMyProfileController {

  constructor(private readonly authMyProfileService: AuthMyProfileService) {}

  @Get("me")
  @ApiOkResponse({type: StandardUserResDto})
  async getMe(@Session() session: SecureSession): Promise<StandardUserResDto> {
    return await this.authMyProfileService.getMe(session.user_cuid);
  }

  @Put("me")
  @ApiOkResponse({type: StandardUserResDto})
  async updateMe(@Session() session: SecureSession, @Body() updateUserReqDto: UpdateUserReqDto) {
    return await this.authMyProfileService.updateMe(session.user_cuid, updateUserReqDto);
  }

  @Delete("me")
  @ApiOkResponse({type: StandardUserResDto})
  async deleteMe(@Session() session: SecureSession) {
    return await this.authMyProfileService.deleteMe(session.user_cuid);
  }
}