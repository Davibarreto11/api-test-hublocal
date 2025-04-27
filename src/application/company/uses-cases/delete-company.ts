import { Injectable, NotFoundException } from "@nestjs/common";
import { CompaniesRepository } from "../repositories/companies-repository";

@Injectable()
export class DeleteCompanyCase {
  constructor(private companiesRepository: CompaniesRepository) {}

  async execute(id: string): Promise<void> {
    const company = await this.companiesRepository.findById(id);

    if (!company) throw new NotFoundException("Empresa não encontrada.");

    await this.companiesRepository.delete(id);
  }
}
