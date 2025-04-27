import { Company } from "@application/company/entities/company";

export class PrismaCompanyMapper {
  static toPrisma(company: Company) {
    return {
      id: company.id,
      name: company.name,
      cnpj: company.cnpj,
      url: company.url,
      userId: company.userId,
    };
  }
}
