import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { PrismaUsersRepository } from "./repositories/prisma-users-repository";
import { PrismaCompaniesRepository } from "./repositories/prisma-companies-repository";
import { PrismaLocationsRepository } from "./repositories/prisma-location-repository";
import { CompaniesRepository } from "@application/company/repositories/companies-repository";
import { UsersRepository } from "@application/user/repositories/users-repository";
import { LocationsRepository } from "@application/location/repositories/locations-repository";

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
    {
      provide: LocationsRepository,
      useClass: PrismaLocationsRepository,
    },
  ],
  exports: [UsersRepository, CompaniesRepository, LocationsRepository],
})
export class DatabaseModule {}
