import { UsersRepository } from "../repositories/users-repository";
import { Injectable, NotFoundException } from "@nestjs/common";

@Injectable()
export class DeleteUserCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: string): Promise<void> {
    const user = await this.usersRepository.findById(id);

    if (!user) throw new NotFoundException("Usuário não encontrado.");

    await this.usersRepository.delete(id);
  }
}
