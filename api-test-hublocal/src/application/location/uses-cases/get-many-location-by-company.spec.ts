import { InMemoryLocationsRepository } from "../../../../test/repositories/in-memory-locations-repository";
import { GetManyLocationByCompanyIdCase } from "./get-many-location-by-company";
import { CreateLocationCase } from "./create-location";

describe("Get Many Locations By Company ID", () => {
  it("should return all locations for a given company ID", async () => {
    const locationsRepository = new InMemoryLocationsRepository();
    const getManyLocations = new GetManyLocationByCompanyIdCase(
      locationsRepository
    );
    const createLocation = new CreateLocationCase(locationsRepository);

    const location1 = await createLocation.execute({
      name: "Unidade São Paulo",
      cep: "01001-000",
      state: "SP",
      neighborhood: "Sé",
      street: "Praça da Sé",
      city: "São Paulo",
      number: "100",
      companyId: "company-123",
    });

    const location2 = await createLocation.execute({
      name: "Unidade São Paulo",
      cep: "01001-000",
      state: "SP",
      neighborhood: "Sé",
      street: "Praça da Sé",
      city: "São Paulo",
      number: "100",
      companyId: "company-123",
    });

    await createLocation.execute({
      name: "Unidade São Paulo",
      cep: "01001-000",
      state: "SP",
      neighborhood: "Sé",
      street: "Praça da Sé",
      city: "São Paulo",
      number: "100",
      companyId: "company-12",
    });

    const locations = await getManyLocations.execute("company-123");

    expect(locations).toHaveLength(2);
    expect(locations).toEqual(
      expect.arrayContaining([location1.location, location2.location])
    );
  });

  it("should return an empty array if no locations exist for the given company ID", async () => {
    const locationsRepository = new InMemoryLocationsRepository();
    const getManyLocations = new GetManyLocationByCompanyIdCase(
      locationsRepository
    );

    const locations = await getManyLocations.execute("non-existent-company");

    expect(locations).toEqual([]);
  });
});
