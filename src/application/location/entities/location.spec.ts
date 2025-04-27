import { Location } from "./location";

describe("Location", () => {
  it("should be able to create a location", () => {
    const location = new Location({
      name: "Test Location",
      cep: "12345-678",
      state: "SP",
      neighborhood: "Centro",
      street: "Rua Teste",
      city: "São Paulo",
      number: "123",
      companyId: "company-id-123",
      createdAt: new Date(),
    });

    expect(location).toBeTruthy();
  });
});
