import { Injectable } from "@nestjs/common";
import { Location } from "../entities/location";
import { LocationsRepository } from "../repositories/locations-repository";

interface CreateLocationRequest {
  name: string;
  cep: string;
  state: string;
  neighborhood: string;
  street: string;
  city: string;
  number: string;
  companyId: string;
}

interface CreateLocationResponse {
  location: Location;
}

@Injectable()
export class CreateLocationCase {
  constructor(private locationRepository: LocationsRepository) {}

  async execute(
    request: CreateLocationRequest
  ): Promise<CreateLocationResponse> {
    const { name, cep, state, neighborhood, street, city, number, companyId } =
      request;

    const location = new Location({
      name,
      cep,
      state,
      neighborhood,
      street,
      city,
      number,
      companyId,
      createdAt: new Date(),
    });

    await this.locationRepository.create(location);

    return { location };
  }
}
