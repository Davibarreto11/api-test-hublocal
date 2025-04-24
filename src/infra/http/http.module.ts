import { Module, type MiddlewareConsumer } from "@nestjs/common";
import { UserController } from "./controllers/user.controller";
import { CreateUser } from "@application/user/uses-cases/create-user";
import { DatabaseModule } from "../database/database.module";
import { ValidateSession } from "@application/user/uses-cases/validate-session";
import { LocalStrategy } from "@application/auth/local.strategy";
import { SessionDTOMiddleware } from "@application/auth/middleware/SessionDTO";
import { SessionsUser } from "@application/user/uses-cases/sessions-user";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "@application/auth/jwt.stategy";

@Module({
  imports: [
    DatabaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES },
    }),
  ],
  controllers: [UserController],
  providers: [
    CreateUser,
    ValidateSession,
    LocalStrategy,
    SessionsUser,
    JwtStrategy,
  ],
})
export class HttpModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionDTOMiddleware).forRoutes("/users/session");
  }
}
