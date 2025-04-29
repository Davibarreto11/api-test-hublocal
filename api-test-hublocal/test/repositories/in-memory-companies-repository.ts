import type { Company } from "@application/company/entities/company";
import type { CompaniesRepository } from "@application/company/repositories/companies-repository";

export class InMemoryCompaniesRepository implements CompaniesRepository {
  public companies: Company[] = [];

  async create(company: Company): Promise<void> {
    this.companies.push(company);
  }

  async findByCNPJ(cnpj: string, id?: string): Promise<Company | null> {
    const company = this.companies.find(
      (company) => company.cnpj === cnpj && company.id !== id
    );

    if (!company) return null;

    return company;
  }

  async findById(id: string): Promise<Company | null> {
    const company = this.companies.find((company) => company.id === id);

    if (!company) return null;

    return company;
  }

  async update(newCompany: Company): Promise<Company> {
    const companyIndex = this.companies.findIndex(
      (company) => company.id === newCompany.id
    );

    if (companyIndex >= 0) this.companies[companyIndex] = newCompany;

    return this.companies[companyIndex];
  }
  async findManyCompanies(): Promise<Company[]> {
    return this.companies;
  }

  async delete(id: string): Promise<void> {
    this.companies = this.companies.filter((company) => company.id !== id);
  }
}
