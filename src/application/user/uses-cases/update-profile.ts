import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UsersRepository } from "../repositories/users-repository";
import type { User } from "../entities/user";

interface UpdateUserRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

interface UpdateUserResponse {
  user: User;
}

@Injectable()
export class UpdateProfileCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute(request: UpdateUserRequest): Promise<UpdateUserResponse> {
    const { id, name, email, password } = request;

    const emailExists = await this.usersRepository.findByEmail(email);

    if (emailExists)
      throw new BadRequestException("E-mail já existe no sistema");

    const user = await this.usersRepository.findById(id);

    if (!user) throw new NotFoundException("Usuário não encontrado.");

    const newUser = await this.usersRepository.update({
      id,
      name,
      email,
      password,
    });

    return { user: newUser };
  }
}
