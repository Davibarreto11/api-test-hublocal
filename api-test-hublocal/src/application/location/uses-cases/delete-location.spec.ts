import { DeleteLocationCase } from "./delete-location";
import { InMemoryLocationsRepository } from "../../../../test/repositories/in-memory-locations-repository";
import { CreateLocationCase } from "./create-location";

describe("Delete Location", () => {
  it("should be able to delete a location", async () => {
    const locationsRepository = new InMemoryLocationsRepository();
    const deleteLocationCase = new DeleteLocationCase(locationsRepository);
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

    await deleteLocationCase.execute(location.id!);

    expect(locationsRepository.locations).toHaveLength(0);
  });

  it("should throw an error if location does not exist", async () => {
    const locationsRepository = new InMemoryLocationsRepository();
    const deleteLocationCase = new DeleteLocationCase(locationsRepository);

    await expect(
      deleteLocationCase.execute("non-existent-id")
    ).rejects.toThrowError("Localização não encontrada.");
  });
});
