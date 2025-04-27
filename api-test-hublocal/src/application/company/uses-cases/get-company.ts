import { Injectable, NotFoundException } from "@nestjs/common";
import { CompaniesRepository } from "../repositories/companies-repository";
import type { Company } from "../entities/company";

@Injectable()
export class GetCompanyUseCase {
  constructor(private companiesRepository: CompaniesRepository) {}

  async execute(id: string): Promise<Company> {
    const company = await this.companiesRepository.findById(id);

    if (!company) throw new NotFoundException("Empresa não encontrada.");

    return company;
  }
}
