import { Location } from "../entities/location";

export abstract class LocationsRepository {
  abstract create(location: Location): Promise<void>;
  abstract findById(id: string): Promise<Location | null>;
  abstract update(location: Partial<Location>): Promise<Location>;
  abstract delete(id: string): Promise<void>;
  abstract findManyByCompanyId(companyId: string): Promise<Location[]>;
}
