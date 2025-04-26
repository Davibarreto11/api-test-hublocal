import { Company } from "../entities/company";
import { CompaniesRepository } from "../repositories/companies-repository";

interface CreateCompanyRequest {
  name: string;
  url: string;
  cnpj: string;
  userId: string;
}

interface CreateUserResponse {
  company: Company;
}

export class CreateCompanyCase {
  constructor(private companiesRepository: CompaniesRepository) {}

  async execute(request: CreateCompanyRequest): Promise<CreateUserResponse> {
    const { cnpj, name, url, userId } = request;

    const companyExists = await this.companiesRepository.findByCNPJ(cnpj);

    if (companyExists) {
      throw new Error("CNPJ já cadastrado no sistema.");
    }

    const company = new Company({
      cnpj,
      name,
      userId,
      url,
      createdAt: new Date(),
    });

    await this.companiesRepository.create(company);

    return {
      company,
    };
  }
}
