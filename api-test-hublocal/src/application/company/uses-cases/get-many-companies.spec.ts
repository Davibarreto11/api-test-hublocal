import { InMemoryCompaniesRepository } from "../../../../test/repositories/in-memory-companies-repository";
import { CreateCompanyCase } from "./create-company";
import { GetManyCompaniesCase } from "./get-many-companies";

describe("Get Many Companies", () => {
  it("should be able to retrieve all companies", async () => {
    const companiesRepository = new InMemoryCompaniesRepository();
    const createCompany = new CreateCompanyCase(companiesRepository);
    const getManyCompanies = new GetManyCompaniesCase(companiesRepository);

    await createCompany.execute({
      name: "Empresa Teste 1",
      url: "https://empresa-teste1.com.br",
      cnpj: "12.345.678/0001-01",
      userId: "user-123",
    });
    await createCompany.execute({
      name: "Empresa Teste 2",
      url: "https://empresa-teste2.com.br",
      cnpj: "12.345.678/0001-02",
      userId: "user-123",
    });

    const companies = await getManyCompanies.execute();

    // Verificações
    expect(companies).toHaveLength(2);
    expect(companies[0].name).toBe("Empresa Teste 1");
    expect(companies[1].name).toBe("Empresa Teste 2");
  });

  it("should return an empty array if no companies exist", async () => {
    const companiesRepository = new InMemoryCompaniesRepository();
    const getManyCompanies = new GetManyCompaniesCase(companiesRepository);

    const companies = await getManyCompanies.execute();

    expect(companies).toHaveLength(0);
  });
});
