import { User } from "../../../application/user/entities/user";
import { PrismaService } from "../prisma.service";
import { hash } from "bcrypt";
import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../../../application/user/repositories/users-repository";
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

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    return new User({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.passwordHash,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    });
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prismaService.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      return null;
    }

    return new User({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.passwordHash,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.user.delete({
      where: {
        id,
      },
    });
  }

  async update({ id, name, email, password }: Partial<User>): Promise<User> {
    let passwordHash = password;

    if (passwordHash) {
      passwordHash = await hash(passwordHash, 7);
    }

    const user = await this.prismaService.user.update({
      where: { id },
      data: { email, name, passwordHash },
    });

    return new User({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.passwordHash,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
    });
  }

  async findManyUsers(): Promise<User[]> {
    const users = await this.prismaService.user.findMany();
    return users.map(
      (user) =>
        new User({
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.passwordHash,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          deletedAt: user.deletedAt,
        })
    );
  }
}
