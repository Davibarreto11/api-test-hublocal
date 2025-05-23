import type { User } from "@application/user/entities/user";

export class UserViewModel {
  static toHTTP(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updateAt: user.updatedAt,
    };
  }
}
