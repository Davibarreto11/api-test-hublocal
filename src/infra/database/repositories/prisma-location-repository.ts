import { Injectable } from "@nestjs/common";

import { LocationsRepository } from "@application/location/repositories/locations-repository";
import { PrismaService } from "../prisma.service";
import { Location } from "@application/location/entities/location";
import { PrismaLocationMapper } from "../mappers/prisma-location-mapper";

@Injectable()
export class PrismaLocationsRepository implements LocationsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(location: Location): Promise<void> {
    const raw = PrismaLocationMapper.toPrisma(location);

    await this.prismaService.location.create({
      data: raw,
    });
  }

  async findById(id: string): Promise<Location | null> {
    const location = await this.prismaService.location.findFirst({
      where: { id },
    });

    if (!location) {
      return null;
    }

    return new Location({
      id: location.id,
      name: location.name,
      cep: location.cep,
      state: location.state,
      neighborhood: location.neighborhood,
      street: location.street,
      city: location.city,
      number: location.number,
      companyId: location.companyId,
      createdAt: location.createdAt,
      updatedAt: location.updatedAt,
      deletedAt: location.deletedAt,
    });
  }

  async update({
    cep,
    city,
    companyId,
    id,
    name,
    neighborhood,
    number,
    state,
    street,
  }: Partial<Location>): Promise<Location> {
    const location = await this.prismaService.location.update({
      where: { id: id },
      data: {
        name: name,
        cep: cep,
        state: state,
        neighborhood: neighborhood,
        street: street,
        city: city,
        number: number,
        companyId: companyId,
      },
    });

    return new Location({
      id: location.id,
      name: location.name,
      cep: location.cep,
      state: location.state,
      neighborhood: location.neighborhood,
      street: location.street,
      city: location.city,
      number: location.number,
      companyId: location.companyId,
      createdAt: location.createdAt,
      updatedAt: location.updatedAt,
      deletedAt: location.deletedAt,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.location.delete({
      where: { id },
    });
  }

  async findManyByCompanyId(companyId: string): Promise<Location[]> {
    const locations = await this.prismaService.location.findMany({
      where: { companyId },
    });

    return locations.map(
      (location) =>
        new Location({
          id: location.id,
          name: location.name,
          cep: location.cep,
          state: location.state,
          neighborhood: location.neighborhood,
          street: location.street,
          city: location.city,
          number: location.number,
          companyId: location.companyId,
          createdAt: location.createdAt,
          updatedAt: location.updatedAt,
          deletedAt: location.deletedAt,
        })
    );
  }
}
