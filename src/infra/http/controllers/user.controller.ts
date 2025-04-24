import { Body, Controller, Get, Post } from "@nestjs/common";
import type { CreateUserBody } from "../dtos/create-user-body";
import { CreateUser } from "@application/uses-cases/create-user";
import { UserViewModel } from "../view-models/user-view-model";

@Controller("users")
export class UserController {
  constructor(private createUser: CreateUser) {}

  @Post()
  async create(@Body() body: CreateUserBody) {
    const { name, email, password } = body;

    const { user } = await this.createUser.execute({
      name,
      email,
      password,
    });

    return { user: UserViewModel.toHTTP(user) };
  }
}
