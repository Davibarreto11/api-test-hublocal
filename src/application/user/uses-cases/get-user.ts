import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersRepository } from "../repositories/users-repository";

@Injectable()
export class GetUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute(id: string) {
    const user = await this.usersRepository.findById(id);

    if (!user) throw new NotFoundException();

    return user;
  }
}
