import { Injectable } from "@nestjs/common";
import type { User } from "../entities/user";
import { UsersRepository } from "../repositories/users-repository";

@Injectable()
export class GetManyUsersCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<User[]> {
    const users = await this.usersRepository.findManyUsers();

    return users;
  }
}
