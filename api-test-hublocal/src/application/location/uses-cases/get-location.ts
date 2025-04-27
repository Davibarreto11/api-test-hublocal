import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { LocationsRepository } from "../repositories/locations-repository";
import type { Location } from "../entities/location";

@Injectable()
export class GetLocationUseCase {
  constructor(private locationRepository: LocationsRepository) {}

  async execute(id: string): Promise<Location> {
    const location = await this.locationRepository.findById(id);

    if (!location) {
      throw new NotFoundException("Localização não encontrada.");
    }

    return location;
  }
}
