import type { Location } from "@application/location/entities/location";

export class LocationViewModel {
  static toHTTP(location: Location) {
    return {
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
    };
  }
}
