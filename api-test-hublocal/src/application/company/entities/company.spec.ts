import { Company } from "./company";

describe("Company", () => {
  it("should be able to create a company", () => {
    const company = new Company({
      name: "Test Company",
      url: "https://testcompany.com",
      cnpj: "12.345.678/0001-90",
      userId: "user-id-123",
      createdAt: new Date(),
    });

    expect(company).toBeTruthy();
  });
});
