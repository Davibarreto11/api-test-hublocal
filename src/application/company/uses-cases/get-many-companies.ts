import { Injectable } from "@nestjs/common";
import { CompaniesRepository } from "../repositories/companies-repository";
import { Company } from "../entities/company";

@Injectable()
export class GetManyCompaniesCase {
  constructor(private companiesRepository: CompaniesRepository) {}

  async execute(): Promise<Company[]> {
    const companies = await this.companiesRepository.findManyCompanies();

    return companies;
  }
}
