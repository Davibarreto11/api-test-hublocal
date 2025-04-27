import { Company } from "../entities/company";

export abstract class CompaniesRepository {
  abstract create(company: Company): Promise<void>;
  abstract findByCNPJ(cnpj: string): Promise<Company | null>;
  abstract findById(id: string): Promise<Company | null>;
  abstract update(Company: Partial<Company>): Promise<Company>;
  abstract findManyCompanies(): Promise<Company[]>;
  abstract delete(id: string): Promise<void>;
}
