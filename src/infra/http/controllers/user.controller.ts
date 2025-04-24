import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import type { CreateUserBody } from "../dtos/create-user-body";
import { CreateUser } from "@application/user/uses-cases/create-user";
import { UserViewModel } from "../view-models/user-view-model";
import { SessionsUser } from "@application/user/uses-cases/sessions-user";
import { LocalAuthGuard } from "@application/auth/guards/local-guards";
import { Public } from "@application/auth/decorators/is-public";

@Controller("users")
export class UserController {
  constructor(
    private createUser: CreateUser,
    private sessionUser: SessionsUser
  ) {}

  @Post("session")
  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async session(@Request() request: any) {
    const token = await this.sessionUser.execute({
      user: request.user,
    });

    return { token };
  }

  @Post()
  @Public()
  async create(@Body() body: CreateUserBody) {
    const { name, email, password } = body;

    const { user } = await this.createUser.execute({
      name,
      email,
      password,
    });

    return { user: UserViewModel.toHTTP(user) };
  }

  @Get()
  async get() {
    return { message: "Nao deu certo" };
  }
}
