import { Injectable, NotFoundException } from "@nestjs/common";
import { CompaniesRepository } from "../repositories/companies-repository";

@Injectable()
export class GetCompanyUseCase {
  constructor(private companiesRepository: CompaniesRepository) {}

  async execute(id: string) {
    const company = await this.companiesRepository.findById(id);

    if (!company) throw new NotFoundException("Empresa não encontrada.");

    return company;
  }
}
