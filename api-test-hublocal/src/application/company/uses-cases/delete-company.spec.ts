import { InMemoryCompaniesRepository } from "../../../../test/repositories/in-memory-companies-repository";
import { CreateCompanyCase } from "./create-company";
import { DeleteCompanyCase } from "./delete-company";

describe("Delete Company", () => {
  it("should be able to delete a company", async () => {
    const companiesRepository = new InMemoryCompaniesRepository();
    const createCompany = new CreateCompanyCase(companiesRepository);
    const deleteCompany = new DeleteCompanyCase(companiesRepository);

    const { company } = await createCompany.execute({
      name: "Empresa Teste",
      url: "https://empresa-teste.com.br",
      cnpj: "12.345.678/0001-90",
      userId: "user-123",
    });

    await deleteCompany.execute(company.id!);

    const deletedCompany = await companiesRepository.findById(company.id!);
    expect(deletedCompany).toBeNull();
  });

  it("should throw an error if the company does not exist", async () => {
    const companiesRepository = new InMemoryCompaniesRepository();
    const deleteCompany = new DeleteCompanyCase(companiesRepository);

    await expect(deleteCompany.execute("non-existing-id")).rejects.toThrowError(
      "Empresa não encontrada."
    );
  });
});
