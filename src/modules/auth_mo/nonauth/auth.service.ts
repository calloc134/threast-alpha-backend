import { TinyUserResDto } from '@dto/res/user/tiny';
import { PasswordMismatchException } from '@exceptions/password_mismatch';
import { Injectable } from '@nestjs/common';
import { PrismaService } from "@submodules/prisma_mo/prisma.service";
import { hash, verify } from "argon2"

@Injectable()
export class NonAuthAuthService {
  constructor (private readonly prisma: PrismaService) {}

  async signup(handle: string, screen_name: string, password: string): Promise<TinyUserResDto> {
      
    // ユーザを作成、既に存在している時は例外になるはず
    // profile_imageはデフォルトで空文字列 ここの扱いをどうしようか悩む
      let user = await this.prisma.user.create({
        data: {
          handle,
          screen_name,
          password: await hash(password),
          profile_image: ""
        }
      })
  
      return new TinyUserResDto(user)
  }

  async login(handle: string, password: string): Promise<TinyUserResDto> {

    let user = await this.prisma.user.findUniqueOrThrow({
      // handleに相当するユーザを取得 handleはユニークなのでこれでいい
      where: {
        handle
      },
    })

    // パスワードが一致するかargon2で検証
    if (await verify(user.password, password)) {
      // パスワードが一致したらユーザ情報を返す
      return new TinyUserResDto(user)
    } else {
      // パスワードが一致しなかったら例外を投げる
      throw new PasswordMismatchException()
    }
  }

}