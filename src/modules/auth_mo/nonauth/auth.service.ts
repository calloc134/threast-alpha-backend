import { TinyUserResDto } from '@dto/res/user/tiny';
import { PasswordMismatchException } from '@exceptions/password_mismatch';
import { Injectable } from '@nestjs/common';
import { PrismaService } from "@submodules/prisma_mo/prisma.service";
import { hash, verify } from "argon2"

@Injectable()
export class NonAuthAuthService {
  constructor (private readonly prisma: PrismaService) {}

  async signup(handle: string, screen_name: string, password: string): Promise<TinyUserResDto> {
      
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
      where: {
        handle
      }
    })

    if (await verify(user.password, password)) {
      return new TinyUserResDto(user)
    } else {
      throw new PasswordMismatchException()
    }
  }

}