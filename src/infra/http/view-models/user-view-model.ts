import type { User } from "@application/user/entities/user";

export class UserViewModel {
  static toHTTP(user: User) {
    return {
      _id: user.id,
      name: user.name,
      email: user.email,
      _createdAt: user.createdAt,
      _updateAt: user.updatedAt,
    };
  }
}
