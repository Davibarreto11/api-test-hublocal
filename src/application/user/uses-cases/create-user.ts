import { BadRequestException, Injectable } from "@nestjs/common";
import { User } from "../entities/user";
import { UsersRepository } from "../repositories/users-repository";

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateUserResponse {
  user: User;
}

@Injectable()
export class CreateUserCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const { email, name, password } = request;

    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new BadRequestException("Usuário já existe no sistema.");
    }

    const user = new User({
      email,
      name,
      password,
      createdAt: new Date(),
    });

    await this.usersRepository.create(user);

    return {
      user,
    };
  }
}
