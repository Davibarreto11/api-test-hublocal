import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CompaniesRepository } from "../repositories/companies-repository";
import type { Company } from "../entities/company";

interface UpdateCompanyRequest {
  id: string;
  name: string;
  cnpj: string;
  url: string;
}

interface UpdateCompanyResponse {
  company: Company;
}

@Injectable()
export class UpdateCompanyCase {
  constructor(private companiesRepository: CompaniesRepository) {}
  async execute(request: UpdateCompanyRequest): Promise<UpdateCompanyResponse> {
    const { id, name, cnpj, url } = request;

    const cnpjExists = await this.companiesRepository.findByCNPJ(cnpj);

    if (cnpjExists)
      throw new BadRequestException("CNPJ já cadastrado no sistema.");

    const company = await this.companiesRepository.findById(id);

    if (!company) throw new NotFoundException("Empresa não encontrada.");

    const newCompany = await this.companiesRepository.update({
      id,
      name,
      cnpj,
      url,
    });

    return { company: newCompany };
  }
}
