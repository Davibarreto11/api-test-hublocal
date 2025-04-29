import { Company } from "./company";

describe("Company", () => {
  it("should be able to create a company", () => {
    const createdAt = new Date();
    const company = new Company({
      name: "Tech Corp",
      url: "https://techcorp.com",
      cnpj: "12345678000100",
      userId: "user-123",
      createdAt: createdAt,
    });

    expect(company).toBeTruthy();
    expect(company.name).toBe("Tech Corp");
    expect(company.url).toBe("https://techcorp.com");
    expect(company.cnpj).toBe("12345678000100");
    expect(company.userId).toBe("user-123");
    expect(company.createdAt).toBe(createdAt);
  });

  it("should be able to update company's name", () => {
    const createdAt = new Date();
    const company = new Company({
      name: "Tech Corp",
      url: "https://techcorp.com",
      cnpj: "12345678000100",
      userId: "user-123",
      createdAt: createdAt,
    });

    company.name = "Tech Corporation";
    expect(company.name).toBe("Tech Corporation");
  });

  it("should be able to update company's url", () => {
    const createdAt = new Date();
    const company = new Company({
      name: "Tech Corp",
      url: "https://techcorp.com",
      cnpj: "12345678000100",
      userId: "user-123",
      createdAt: createdAt,
    });

    company.url = "https://techcorpnew.com";
    expect(company.url).toBe("https://techcorpnew.com");
  });

  it("should be able to update company's cnpj", () => {
    const createdAt = new Date();
    const company = new Company({
      name: "Tech Corp",
      url: "https://techcorp.com",
      cnpj: "12345678000100",
      userId: "user-123",
      createdAt: createdAt,
    });

    company.cnpj = "98765432000100";
    expect(company.cnpj).toBe("98765432000100");
  });

  it("should return undefined for updatedAt and deletedAt initially", () => {
    const createdAt = new Date();
    const company = new Company({
      name: "Tech Corp",
      url: "https://techcorp.com",
      cnpj: "12345678000100",
      userId: "user-123",
      createdAt: createdAt,
    });

    expect(company.updatedAt).toBeUndefined();
    expect(company.deletedAt).toBeNull();
  });

  it("should be able to set updatedAt and deletedAt", () => {
    const createdAt = new Date();
    const company = new Company({
      name: "Tech Corp",
      url: "https://techcorp.com",
      cnpj: "12345678000100",
      userId: "user-123",
      createdAt: createdAt,
    });

    const updatedAt = new Date();
    const deletedAt = new Date();

    // Setting updatedAt and deletedAt
    company["props"].updatedAt = updatedAt;
    company["props"].deletedAt = deletedAt;

    expect(company.updatedAt).toBe(updatedAt);
    expect(company.deletedAt).toBe(deletedAt);
  });

  it("should return count", () => {
    const createdAt = new Date();
    const company = new Company({
      name: "Tech Corp",
      url: "https://techcorp.com",
      cnpj: "12345678000100",
      userId: "user-123",
      createdAt: createdAt,
      _count: 5,
    });

    expect(company.count).toBe(5);
  });
});
