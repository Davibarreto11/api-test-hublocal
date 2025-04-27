import { Module, MiddlewareConsumer } from "@nestjs/common";
import { UserController } from "./controllers/user.controller";
import { CreateUserCase } from "@application/user/uses-cases/create-user";
import { DatabaseModule } from "../database/database.module";
import { ValidateSessionCase } from "@application/auth/use-cases/validate-session";
import { LocalStrategy } from "@application/auth/local.strategy";
import { SessionDTOMiddleware } from "@application/auth/middleware/SessionDTO";
import { SessionsUserCase } from "@application/auth/use-cases/sessions-user";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "@application/auth/jwt.stategy";
import { GetManyUsersCase } from "@application/user/uses-cases/get-many-users";
import { GetUserUseCase } from "@application/user/uses-cases/get-user";
import { UpdateUserCase } from "@application/user/uses-cases/update-user";
import { DeleteUserCase } from "@application/user/uses-cases/delete-user";
import { CompanyController } from "./controllers/company.controller";
import { CreateCompanyCase } from "@application/company/uses-cases/create-company";
import { GetCompanyUseCase } from "@application/company/uses-cases/get-company";
import { GetManyCompaniesCase } from "@application/company/uses-cases/get-many-companies";
import { DeleteCompanyCase } from "@application/company/uses-cases/delete-company";
import { UpdateCompanyCase } from "@application/company/uses-cases/update-company";

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES },
    }),
  ],
  controllers: [UserController, CompanyController],
  providers: [
    CreateUserCase,
    SessionsUserCase,
    GetManyUsersCase,
    GetUserUseCase,
    UpdateUserCase,
    DeleteUserCase,
    CreateCompanyCase,
    GetCompanyUseCase,
    GetManyCompaniesCase,
    DeleteCompanyCase,
    UpdateCompanyCase,
    ValidateSessionCase,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class HttpModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionDTOMiddleware).forRoutes("/users/session");
  }
}
