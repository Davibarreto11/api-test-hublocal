import type { User } from "@application/user/entities/user";
import type { UsersRepository } from "@application/user/repositories/users-repository";

export class InMemoryUsersRepository implements UsersRepository {
  public users: User[] = [];

  async create(user: User) {
    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);

    if (!user) return null;

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);

    if (!user) return null;

    return user;
  }

  async delete(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id);
  }

  async update(newUser: User): Promise<User> {
    const userIndex = this.users.findIndex((user) => user.id === newUser.id);

    if (userIndex >= 0) this.users[userIndex] = newUser;

    return this.users[userIndex];
  }

  async findManyUsers(): Promise<User[]> {
    return this.users;
  }
}
