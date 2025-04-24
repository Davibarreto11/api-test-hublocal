import { User } from "../../../application/entities/user";
import { PrismaService } from "../prisma.service";
import { hash } from "bcrypt";
import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../../../application/repositories/users-repository";

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prismaService: PrismaService) {}

  async create(user: User): Promise<void> {
    await this.prismaService.user.create({
      data: {
        name: user.name,
        email: user.email,
        passwordHash: await hash(user.password, 7),
      },
    });
  }
}
