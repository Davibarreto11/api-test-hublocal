import { InMemoryLocationsRepository } from "../../../../test/repositories/in-memory-locations-repository";
import { GetLocationUseCase } from "./get-location";
import { CreateLocationCase } from "./create-location";

describe("Get Location", () => {
  it("should be able to get a location by ID", async () => {
    const locationsRepository = new InMemoryLocationsRepository();
    const getLocation = new GetLocationUseCase(locationsRepository);
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

    await locationsRepository.create(location);

    const result = await getLocation.execute(location.id!);

    expect(result).toEqual(location);
  });

  it("should throw if location does not exist", async () => {
    const locationsRepository = new InMemoryLocationsRepository();
    const getLocation = new GetLocationUseCase(locationsRepository);

    await expect(getLocation.execute("invalid-id")).rejects.toThrowError(
      "Localização não encontrada."
    );
  });
});
