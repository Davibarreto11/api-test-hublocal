import { Module } from "@nestjs/common";
import { HttpModule } from "./infra/http/http.module";
import { DatabaseModule } from "./infra/database/database.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "@application/auth/guards/jwt-guards";

@Module({
  imports: [HttpModule, DatabaseModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
