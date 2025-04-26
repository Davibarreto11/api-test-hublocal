import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Request,
  UseGuards,
} from "@nestjs/common";
import { CreateUserBody } from "../dtos/create-user-body";
import { CreateUserCase } from "@application/user/uses-cases/create-user";
import { UserViewModel } from "../view-models/user-view-model";
import { SessionsUserCase } from "@application/auth/use-cases/sessions-user";
import { LocalAuthGuard } from "@application/auth/guards/local-guards";
import { Public } from "@application/auth/decorators/is-public";
import { GetUserUseCase } from "@application/user/uses-cases/get-user";
import { DeleteUserCase } from "@application/user/uses-cases/delete-user";
import { GetManyUsers } from "@application/user/uses-cases/get-many-users";
import { UpdateUserCase } from "@application/user/uses-cases/update-user";
import { UpdateUserBody } from "../dtos/update-user-body";

@Controller("users")
export class UserController {
  constructor(
    private createUser: CreateUserCase,
    private sessionUser: SessionsUserCase,
    private getUser: GetUserUseCase,
    private deleteUser: DeleteUserCase,
    private getManyUsers: GetManyUsers,
    private updateUser: UpdateUserCase
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
  async getAll() {
    const users = await this.getManyUsers.execute();

    return users;
  }

  @Put("/:id")
  async update(@Param("id") id: string, @Body() body: UpdateUserBody) {
    const { email, name, password } = body;

    const { user } = await this.updateUser.execute({
      id,
      email,
      name,
      password,
    });

    return { user: UserViewModel.toHTTP(user) };
  }

  @Patch("/:id")
  async get(@Param("id") id: string) {
    const user = await this.getUser.execute(id);

    return { user: UserViewModel.toHTTP(user) };
  }

  @Delete("/:id")
  async delete(@Param("id") id: string) {
    await this.deleteUser.execute(id);
  }
}
