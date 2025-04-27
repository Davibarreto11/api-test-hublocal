import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { LocationsRepository } from "../repositories/locations-repository";
import type { Location } from "../entities/location";

interface UpdateLocationRequest {
  id: string;
  name?: string;
  cep?: string;
  state?: string;
  neighborhood?: string;
  street?: string;
  city?: string;
  number?: string;
}

interface UpdateLocationResponse {
  location: Location;
}

@Injectable()
export class UpdateLocationCase {
  constructor(private locationsRepository: LocationsRepository) {}

  async execute(
    request: UpdateLocationRequest
  ): Promise<UpdateLocationResponse> {
    const { id, cep, city, name, neighborhood, number, state, street } =
      request;

    const location = await this.locationsRepository.findById(id);

    if (!location) {
      throw new NotFoundException("Localização não encontrada.");
    }

    const newLocation = await this.locationsRepository.update({
      id,
      cep,
      city,
      name,
      neighborhood,
      number,
      state,
      street,
    });

    return { location: newLocation };
  }
}
