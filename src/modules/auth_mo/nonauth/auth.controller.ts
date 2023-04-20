import { Post, Controller, Body, Session, HttpCode } from "@nestjs/common";
import { LoginFormReqDto } from "@dto/req/login_form/login";
import { Session as SecureSession } from "@fastify/secure-session";
import { NonAuthAuthService } from "./auth.service";
import { PasswordMismatchException } from "@exceptions/password_mismatch";
import { TinyUserResDto } from "@dto/res/user/tiny";
import { ApiBadRequestResponse, ApiOkResponse } from "@nestjs/swagger";
import { TemplateException } from "@dto/types/exception";
import { CreateUserReqDto } from "@dto/req/user/create";

@Controller("api")
export class NonAuthAuthController {

  constructor(private readonly authService: NonAuthAuthService) {}

  @Post("signup")
  @ApiOkResponse({type: TinyUserResDto})
  @ApiBadRequestResponse({type: TemplateException})
  async signup(
    @Body() body: CreateUserReqDto
  ): Promise<TinyUserResDto> {
    return await this.authService.signup(body.handle, body.screen_name, body.password)
  }

  @HttpCode(200)
  @Post("login")
  @ApiOkResponse({type: TinyUserResDto})
  @ApiBadRequestResponse({type: TemplateException})
  async login(
    @Body() body: LoginFormReqDto,
    @Session() session: SecureSession
  ): Promise<TinyUserResDto> {

    let {handle, password} = body
    
    let res_user_cuid = await this.authService.login(handle, password)
    if (res_user_cuid !== null) {
      session.set("user_cuid", res_user_cuid)
      return res_user_cuid
    } else {
      throw new PasswordMismatchException();
    }
  }
  
}