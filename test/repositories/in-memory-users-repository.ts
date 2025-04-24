import type { User } from "src/application/entities/user";
import type { UsersRepository } from "@application/repositories/users-repository";

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = [];

  async create(user: User) {
    this.users.push(user);
  }
}
