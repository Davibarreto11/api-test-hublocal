import { User } from "../../../application/entities/user";
import { PrismaService } from "../prisma.service";
import { hash } from "bcrypt";
import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../../../application/repositories/users-repository";
import { PrismaUserMapper } from "../mappers/prisma-user-mapper";

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prismaService: PrismaService) {}

  async create(user: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user);

    await this.prismaService.user.create({
      data: { ...raw, passwordHash: await hash(user.password, 7) },
    });
  }
}
