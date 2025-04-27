import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { UsersRepository } from "@application/user/repositories/users-repository";
import { PrismaUsersRepository } from "./repositories/prisma-users-repository";
import { CompaniesRepository } from "@application/company/repositories/companies-repository";
import { PrismaCompaniesRepository } from "./repositories/prisma-companies-repository";

@Module({
  imports: [],
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: CompaniesRepository,
      useClass: PrismaCompaniesRepository,
    },
  ],
  exports: [UsersRepository, CompaniesRepository],
})
export class DatabaseModule {}
