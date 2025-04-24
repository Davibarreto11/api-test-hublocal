import { Injectable } from "@nestjs/common";
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
export class CreateUser {
  constructor(private usersRepository: UsersRepository) {}
  async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
    const { email, name, password } = request;

    const user = new User({
      email,
      name,
      password,
    });

    await this.usersRepository.create(user);

    return {
      user,
    };
  }
}
