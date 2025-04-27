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
import { UserViewModel } from "../view-models/user-view-model";
import { SessionsUserCase } from "@application/auth/use-cases/sessions-user";
import { LocalAuthGuard } from "@application/auth/guards/local-guards";
import { Public } from "@application/auth/decorators/is-public";
import { UpdateUserBody, CreateUserBody } from "../dtos";
import {
  CreateUserCase,
  DeleteUserCase,
  GetManyUsersCase,
  GetUserUseCase,
  UpdateUserCase,
} from "@application/user/uses-cases";

@Controller("users")
export class UserController {
  constructor(
    private createUser: CreateUserCase,
    private sessionUser: SessionsUserCase,
    private getUser: GetUserUseCase,
    private deleteUser: DeleteUserCase,
    private getManyUsers: GetManyUsersCase,
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

    return users.map((user) => UserViewModel.toHTTP(user));
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
