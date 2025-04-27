import { Injectable } from "@nestjs/common";
import { LocationsRepository } from "../repositories/locations-repository";
import type { Location } from "../entities/location";

@Injectable()
export class GetManyLocationByCompanyIdCase {
  constructor(private locationsRepository: LocationsRepository) {}

  async execute(companyId: string): Promise<Location[]> {
    const locations =
      await this.locationsRepository.findManyByCompanyId(companyId);

    return locations;
  }
}
