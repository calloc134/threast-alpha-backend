import { Post, Controller, Body, Session, HttpCode } from '@nestjs/common';
import { LoginFormReqDto } from '@dto/req/login_form/login';
import { Session as SecureSession } from '@fastify/secure-session';
import { NonAuthAuthService } from './auth.service';
import { PasswordMismatchException } from '@exceptions/password_mismatch.exception';
import { TinyUserResDto } from '@dto/res/user/tiny';
import { ApiBadRequestResponse, ApiOkResponse } from '@nestjs/swagger';
import { TemplateException } from '@dto/types/exception.type';
import { CreateUserReqDto } from '@dto/req/user/create';
import { SuccessResDto } from '@dto/types/success.type';

@Controller('api/auth')
export class NonAuthAuthController {
  constructor(private readonly authService: NonAuthAuthService) {}

  @Post('signup')
  @ApiOkResponse({ type: TinyUserResDto })
  @ApiBadRequestResponse({ type: TemplateException })
  async signup(@Body() body: CreateUserReqDto) {
    return await this.authService.signup(body.handle, body.screen_name, body.password);
  }

  @HttpCode(200)
  @Post('login')
  @ApiOkResponse({ type: SuccessResDto })
  @ApiBadRequestResponse({ type: TemplateException })
  async login(@Body() body: LoginFormReqDto, @Session() session: SecureSession) {
    
    // セッションは引数で受け取り、サービスにセッション自体は渡さないように
    let { handle, password } = body;

    // ログイン処理の可否を判断
    let res_user_cuid = await this.authService.login(handle, password);

    // レスポンスのcuidがnullでなければログイン成功
    if (res_user_cuid !== null) {
      // セッションにcuidを保存
      session.set('user_cuid', res_user_cuid.cuid);
      return {
        success: true,
      };
    } else {
      // レスポンスのcuidがnullならログイン失敗、例外を投げる
      throw new PasswordMismatchException();
    }
  }
}
