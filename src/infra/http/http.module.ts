import { Module, MiddlewareConsumer } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { ValidateSessionCase } from "@application/auth/use-cases/validate-session";
import { LocalStrategy } from "@application/auth/local.strategy";
import { SessionDTOMiddleware } from "@application/auth/middleware/SessionDTO";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "@application/auth/jwt.stategy";

import { UserController } from "./controllers/user.controller";
import { CompanyController } from "./controllers/company.controller";
import { LocationController } from "./controllers/location.controller";

import { SessionsUserCase } from "@application/auth/use-cases/sessions-user";
import {
  CreateLocationCase,
  DeleteLocationCase,
  GetLocationUseCase,
  GetManyLocationByCompanyIdCase,
  UpdateLocationCase,
} from "@application/location/uses-cases";

import {
  CreateUserCase,
  DeleteUserCase,
  GetManyUsersCase,
  GetUserUseCase,
  UpdateUserCase,
} from "@application/user/uses-cases";
import {
  CreateCompanyCase,
  DeleteCompanyCase,
  GetCompanyUseCase,
  GetManyCompaniesCase,
  UpdateCompanyCase,
} from "@application/company/uses-cases";

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES },
    }),
  ],
  controllers: [UserController, CompanyController, LocationController],
  providers: [
    SessionsUserCase,
    CreateUserCase,
    GetManyUsersCase,
    GetUserUseCase,
    UpdateUserCase,
    DeleteUserCase,
    CreateCompanyCase,
    GetCompanyUseCase,
    GetManyCompaniesCase,
    DeleteCompanyCase,
    UpdateCompanyCase,
    CreateLocationCase,
    DeleteLocationCase,
    GetLocationUseCase,
    GetManyLocationByCompanyIdCase,
    UpdateLocationCase,
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
