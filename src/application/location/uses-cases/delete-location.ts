import { Injectable } from "@nestjs/common";
import { LocationsRepository } from "../repositories/locations-repository";

@Injectable()
export class DeleteLocationCase {
  constructor(private locationsRepository: LocationsRepository) {}

  async execute(id: string): Promise<void> {
    const location = await this.locationsRepository.findById(id);

    if (!location) {
      throw new Error("Localização não encontrada.");
    }

    await this.locationsRepository.delete(id);
  }
}
