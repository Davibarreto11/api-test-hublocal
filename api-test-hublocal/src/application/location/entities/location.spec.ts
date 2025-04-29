import { Location } from "./location";

describe("Location", () => {
  it("should be able to create a location", () => {
    const createdAt = new Date();
    const location = new Location({
      name: "Unidade São Paulo",
      cep: "01001-000",
      state: "SP",
      neighborhood: "Sé",
      street: "Praça da Sé",
      city: "São Paulo",
      number: "100",
      companyId: "company-123",
      createdAt: createdAt,
    });

    expect(location).toBeTruthy();
    expect(location.name).toBe("Unidade São Paulo");
    expect(location.cep).toBe("01001-000");
    expect(location.state).toBe("SP");
    expect(location.neighborhood).toBe("Sé");
    expect(location.street).toBe("Praça da Sé");
    expect(location.city).toBe("São Paulo");
    expect(location.number).toBe("100");
    expect(location.companyId).toBe("company-123");
    expect(location.createdAt).toBe(createdAt);
  });

  it("should be able to update location's name", () => {
    const createdAt = new Date();
    const location = new Location({
      name: "Unidade São Paulo",
      cep: "01001-000",
      state: "SP",
      neighborhood: "Sé",
      street: "Praça da Sé",
      city: "São Paulo",
      number: "100",
      companyId: "company-123",
      createdAt: createdAt,
    });

    location.name = "Unidade São Paulo - Nova";
    expect(location.name).toBe("Unidade São Paulo - Nova");
  });

  it("should be able to update location's cep", () => {
    const createdAt = new Date();
    const location = new Location({
      name: "Unidade São Paulo",
      cep: "01001-000",
      state: "SP",
      neighborhood: "Sé",
      street: "Praça da Sé",
      city: "São Paulo",
      number: "100",
      companyId: "company-123",
      createdAt: createdAt,
    });

    location.cep = "01002-000";
    expect(location.cep).toBe("01002-000");
  });

  it("should be able to update location's street", () => {
    const createdAt = new Date();
    const location = new Location({
      name: "Unidade São Paulo",
      cep: "01001-000",
      state: "SP",
      neighborhood: "Sé",
      street: "Praça da Sé",
      city: "São Paulo",
      number: "100",
      companyId: "company-123",
      createdAt: createdAt,
    });

    location.street = "Avenida Paulista";
    expect(location.street).toBe("Avenida Paulista");
  });

  it("should return undefined for updatedAt and deletedAt initially", () => {
    const createdAt = new Date();
    const location = new Location({
      name: "Unidade São Paulo",
      cep: "01001-000",
      state: "SP",
      neighborhood: "Sé",
      street: "Praça da Sé",
      city: "São Paulo",
      number: "100",
      companyId: "company-123",
      createdAt: createdAt,
    });

    expect(location.updatedAt).toBeUndefined();
    expect(location.deletedAt).toBeNull();
  });

  it("should be able to set updatedAt and deletedAt", () => {
    const createdAt = new Date();
    const location = new Location({
      name: "Unidade São Paulo",
      cep: "01001-000",
      state: "SP",
      neighborhood: "Sé",
      street: "Praça da Sé",
      city: "São Paulo",
      number: "100",
      companyId: "company-123",
      createdAt: createdAt,
    });

    const updatedAt = new Date();
    const deletedAt = new Date();

    // Setting updatedAt and deletedAt
    location["props"].updatedAt = updatedAt;
    location["props"].deletedAt = deletedAt;

    expect(location.updatedAt).toBe(updatedAt);
    expect(location.deletedAt).toBe(deletedAt);
  });
});
