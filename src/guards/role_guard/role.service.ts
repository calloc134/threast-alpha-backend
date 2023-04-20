import { RolePermissionException } from "@exceptions/role_permission";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@submodules/prisma_mo/prisma.service";

@Injectable()
export class RoleGuardService {

  constructor(private readonly prisma: PrismaService) {}

  async validateRole(user_cuid: string, setRoles: Role[]): Promise<boolean> {

    if (!setRoles) {
      throw new RolePermissionException();
    }

    console.log("user_cuid: " + user_cuid);

    const user = await this.prisma.user.findUnique({
      where: { cuid: user_cuid },
      select: { role: true },
    });

    if (setRoles.includes(user.role)) {
      return true;
    } else {
      throw new RolePermissionException();
    }
  }
}