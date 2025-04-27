import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersRepository } from "../repositories/users-repository";
import type { User } from "../entities/user";

@Injectable()
export class GetUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);

    if (!user) throw new NotFoundException("Usuário não encontrado.");

    return user;
  }
}
