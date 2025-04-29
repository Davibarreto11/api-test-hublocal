import { BadRequestException } from "@nestjs/common";
import { InMemoryCompaniesRepository } from "../../../../test/repositories/in-memory-companies-repository";
import { CreateCompanyCase } from "./create-company";

describe("Create Company", () => {
  let companiesRepository: InMemoryCompaniesRepository;
  let createCompany: CreateCompanyCase;

  beforeEach(() => {
    companiesRepository = new InMemoryCompaniesRepository();
    createCompany = new CreateCompanyCase(companiesRepository);
  });

  it("should be able to create a company", async () => {
    const { company } = await createCompany.execute({
      name: "Empresa Teste",
      url: "https://empresa-teste.com.br",
      cnpj: "12.345.678/0001-90",
      userId: "user-123",
    });

    expect(companiesRepository.companies).toHaveLength(1);
    expect(companiesRepository.companies[0]).toEqual(company);
    expect(company.name).toBe("Empresa Teste");
    expect(company.createdAt).toBeInstanceOf(Date);
  });

  // it("should throw an error if company already exists", async () => {
  //   await createCompany.execute({
  //     cnpj: "12.345.678/0001-90",
  //     name: "Davi Artur",
  //     url: "https://empresa-teste.com.br",
  //     userId: "user-123",
  //   });

  //   expect(
  //     await createCompany.execute({
  //       cnpj: "12.345.678/0001-90",
  //       name: "Davi Artur",
  //       url: "https://empresa-teste.com.br",
  //       userId: "user-123",
  //     })
  //   ).rejects.toThrow(BadRequestException);
  // });
});
