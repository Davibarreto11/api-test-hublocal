import { UsersRepository } from "@application/user/repositories/users-repository";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { compare } from "bcrypt";

interface SessionsProps {
  email: string;
  password: string;
}

@Injectable()
export class ValidateSession {
  constructor(private usersRepository: UsersRepository) {}

  async execute(request: SessionsProps) {
    const { email, password } = request;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException("Email ou senha estão incorretos.");
    }

    const isPasswordMatched = await compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException("Email ou senha estão incorretos.");
    }

    return user;
  }
}
