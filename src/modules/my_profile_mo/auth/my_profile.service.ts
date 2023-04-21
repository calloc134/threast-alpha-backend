import { UpdateUserReqDto } from "@dto/req/user/update";
import { StandardUserResDto } from "@dto/res/user/standard";
import { Injectable, Session } from "@nestjs/common";
import { PrismaService } from "@submodules/prisma_mo/prisma.service";

@Injectable()
export class AuthMyProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getMe(current_user_cuid: string): Promise<StandardUserResDto> {

    let result = await this.prisma.user.findUniqueOrThrow({
      where: {
        cuid: current_user_cuid
      }
    })

    return new StandardUserResDto(result);
  }

  async updateMe(current_user_cuid: string, updateUserReqDto: UpdateUserReqDto) {
    let result = await this.prisma.user.update({
      where: {
        cuid: current_user_cuid
      }, 
      // ここではスプレッド構文を使って展開
      data: {
        ...updateUserReqDto
      }
    })

    return new StandardUserResDto(result);
  }

  async deleteMe(current_user_cuid: string) {
    let result = await this.prisma.user.delete({
      where: {
        cuid: current_user_cuid
      }
    })

    return new StandardUserResDto(result);
  }
}