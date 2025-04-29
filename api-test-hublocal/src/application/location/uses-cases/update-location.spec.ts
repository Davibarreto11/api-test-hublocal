import { InMemoryLocationsRepository } from "../../../../test/repositories/in-memory-locations-repository";
import { UpdateLocationCase } from "./update-location";
import { CreateLocationCase } from "./create-location";
import { NotFoundException } from "@nestjs/common";

describe("Update Location", () => {
  it("should update an existing location", async () => {
    const locationsRepository = new InMemoryLocationsRepository();
    const createLocation = new CreateLocationCase(locationsRepository);
    const updateLocation = new UpdateLocationCase(locationsRepository);

    const { location } = await createLocation.execute({
      name: "Antigo Nome",
      cep: "00000-000",
      state: "SP",
      neighborhood: "Bairro A",
      street: "Rua A",
      city: "São Paulo",
      number: "100",
      companyId: "company-123",
    });

    const result = await updateLocation.execute({
      id: location.id!,
      name: "Novo Nome",
      city: "Campinas",
      state: "SP",
    });

    expect(result.location.id).toBe(location.id);
    expect(result.location.name).toBe("Novo Nome");
    expect(result.location.city).toBe("Campinas");
    expect(result.location.state).toBe("SP");
  });

  it("should throw if location does not exist", async () => {
    const locationsRepository = new InMemoryLocationsRepository();
    const updateLocation = new UpdateLocationCase(locationsRepository);

    await expect(
      updateLocation.execute({
        id: "non-existent-id",
        name: "Nome qualquer",
      })
    ).rejects.toThrow(NotFoundException);
  });
});
