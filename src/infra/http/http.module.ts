import { Module } from "@nestjs/common";
import { UserController } from "./controllers/user.controller";
import { CreateUser } from "@application/uses-cases/create-user";
import { DatabaseModule } from "../database/database.module";

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [CreateUser],
})
export class HttpModule {}
