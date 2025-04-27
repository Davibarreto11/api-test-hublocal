import type { Company } from "@application/company/entities/company";

export class CompanyViewModel {
  static toHTTP(company: Company) {
    return {
      id: company.id,
      name: company.name,
      cnpj: company.cnpj,
      userId: company.userId,
      url: company.url,
      createdAt: company.createdAt,
      updateAt: company.updatedAt,
    };
  }
}
