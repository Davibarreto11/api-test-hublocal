import { InMemoryCompaniesRepository } from "../../../../test/repositories/in-memory-companies-repository";
import { CreateCompanyCase } from "./create-company";
import { UpdateCompanyCase } from "./update-company";
import { BadRequestException, NotFoundException } from "@nestjs/common";

describe("Update Company", () => {
  it("should be able to update a company", async () => {
    const companiesRepository = new InMemoryCompaniesRepository();
    const createCompany = new CreateCompanyCase(companiesRepository);
    const updateCompany = new UpdateCompanyCase(companiesRepository);

    const { company: createdCompany } = await createCompany.execute({
      name: "Empresa Teste",
      url: "https://empresa-teste.com.br",
      cnpj: "12.345.678/0001-01",
      userId: "user-123",
    });

    const { company: updatedCompany } = await updateCompany.execute({
      id: createdCompany.id!,
      name: "Empresa Teste Atualizada",
      cnpj: "12.345.678/0001-02",
      url: "https://empresa-teste-atualizada.com.br",
    });

    expect(updatedCompany.name).toBe("Empresa Teste Atualizada");
    expect(updatedCompany.cnpj).toBe("12.345.678/0001-02");
    expect(updatedCompany.url).toBe("https://empresa-teste-atualizada.com.br");
  });

  it("should throw an error if company with given id does not exist", async () => {
    const companiesRepository = new InMemoryCompaniesRepository();
    const updateCompany = new UpdateCompanyCase(companiesRepository);

    await expect(
      updateCompany.execute({
        id: "non-existing-id",
        name: "Empresa Inexistente",
        cnpj: "12.345.678/0001-03",
        url: "https://empresa-inexistente.com.br",
      })
    ).rejects.toThrowError(NotFoundException);
  });

  // it("should throw an error if the CNPJ is already registered", async () => {
  //   const companiesRepository = new InMemoryCompaniesRepository();
  //   const createCompany = new CreateCompanyCase(companiesRepository);
  //   const updateCompany = new UpdateCompanyCase(companiesRepository);

  //   await createCompany.execute({
  //     name: "Empresa Teste 1",
  //     url: "https://empresa-teste1.com.br",
  //     cnpj: "12.345.678/0001-01",
  //     userId: "user-123",
  //   });
  //   const { company: company2 } = await createCompany.execute({
  //     name: "Empresa Teste 2",
  //     url: "https://empresa-teste2.com.br",
  //     cnpj: "12.345.678/0001-02",
  //     userId: "user-123",
  //   });

  //   console.log(`ID DA COMPANY2`, company2);

  //   await expect(
  //     updateCompany.execute({
  //       id: company2.id!,
  //       name: "Empresa Teste 2 Atualizada",
  //       cnpj: "12.345.678/0001-01",
  //       url: "https://empresa-teste2-atualizada.com.br",
  //     })
  //   ).rejects.toThrowError(BadRequestException);
  // });
});
