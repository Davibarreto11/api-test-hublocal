import { InMemoryLocationsRepository } from "../../../../test/repositories/in-memory-locations-repository";
import { CreateLocationCase } from "./create-location";

describe("Create Location", () => {
  it("should be able to create a location", async () => {
    const locationsRepository = new InMemoryLocationsRepository();
    const createLocation = new CreateLocationCase(locationsRepository);

    const { location } = await createLocation.execute({
      name: "Unidade São Paulo",
      cep: "01001-000",
      state: "SP",
      neighborhood: "Sé",
      street: "Praça da Sé",
      city: "São Paulo",
      number: "100",
      companyId: "company-123",
    });

    expect(locationsRepository.locations).toHaveLength(1);
    expect(locationsRepository.locations[0]).toEqual(location);
    expect(location.name).toBe("Unidade São Paulo");
    expect(location.createdAt).toBeInstanceOf(Date);
  });
});
