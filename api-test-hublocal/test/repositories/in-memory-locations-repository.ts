import type { Location } from "@application/location/entities/location";
import type { LocationsRepository } from "@application/location/repositories/locations-repository";

export class InMemoryLocationsRepository implements LocationsRepository {
  public locations: Location[] = [];

  async create(location: Location): Promise<void> {
    this.locations.push(location);
  }

  async findById(id: string): Promise<Location | null> {
    const location = this.locations.find((location) => location.id === id);

    if (!location) return null;

    return location;
  }

  async update(newLocation: Location): Promise<Location> {
    const index = this.locations.findIndex((loc) => loc.id === newLocation.id);

    if (index >= 0) {
      this.locations[index] = newLocation;
    }

    return this.locations[index];
  }

  async delete(id: string): Promise<void> {
    this.locations = this.locations.filter((location) => location.id !== id);
  }

  async findManyByCompanyId(companyId: string): Promise<Location[]> {
    return this.locations.filter(
      (location) => location.companyId === companyId
    );
  }
}
