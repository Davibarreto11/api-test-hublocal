import type { User } from "@application/entities/user";

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      passwordHash: user.password,
    };
  }
}
