import { InMemoryCompaniesRepository } from "../../../../test/repositories/in-memory-companies-repository";
import { CreateCompanyCase } from "./create-company";
import { GetCompanyUseCase } from "./get-company";

describe("Get Company", () => {
  it("should be able to retrieve a company by ID", async () => {
    const companiesRepository = new InMemoryCompaniesRepository();
    const createCompany = new CreateCompanyCase(companiesRepository);
    const getCompany = new GetCompanyUseCase(companiesRepository);

    // Criação da empresa
    const { company } = await createCompany.execute({
      name: "Empresa Teste",
      url: "https://empresa-teste.com.br",
      cnpj: "12.345.678/0001-90",
      userId: "user-123",
    });

    const retrievedCompany = await getCompany.execute(company.id!);

    // Verificações
    expect(retrievedCompany).toEqual(company);
  });

  it("should throw an error if the company does not exist", async () => {
    const companiesRepository = new InMemoryCompaniesRepository();
    const getCompany = new GetCompanyUseCase(companiesRepository);

    await expect(getCompany.execute("non-existing-id")).rejects.toThrowError(
      "Empresa não encontrada."
    );
  });
});
