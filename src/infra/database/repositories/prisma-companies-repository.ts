import { PrismaService } from "../prisma.service";
import { Injectable } from "@nestjs/common";
import { CompaniesRepository } from "@application/company/repositories/companies-repository";
import { Company } from "@application/company/entities/company";
import { PrismaCompanyMapper } from "../mappers/prisma-company-mapper";

@Injectable()
export class PrismaCompaniesRepository implements CompaniesRepository {
  constructor(private prismaService: PrismaService) {}

  async create(company: Company): Promise<void> {
    const raw = PrismaCompanyMapper.toPrisma(company);

    await this.prismaService.company.create({
      data: { ...raw },
    });
  }

  async findByCNPJ(cnpj: string): Promise<Company | null> {
    const company = await this.prismaService.company.findUnique({
      where: {
        cnpj,
      },
    });

    if (!company) {
      return null;
    }

    return new Company({
      id: company.id,
      name: company.name,
      cnpj: company.cnpj,
      url: company.url,
      userId: company.userId,
      createdAt: company.createdAt,
      updatedAt: company.updatedAt,
      deletedAt: company.deletedAt,
    });
  }

  async findById(id: string): Promise<Company | null> {
    const company = await this.prismaService.company.findFirst({
      where: {
        id,
      },
    });

    if (!company) {
      return null;
    }

    return new Company({
      id: company.id,
      name: company.name,
      cnpj: company.cnpj,
      url: company.url,
      userId: company.userId,
      createdAt: company.createdAt,
      updatedAt: company.updatedAt,
      deletedAt: company.deletedAt,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.company.delete({
      where: {
        id,
      },
    });
  }

  async update({
    id,
    name,
    userId,
    cnpj,
    url,
  }: Partial<Company>): Promise<Company> {
    const company = await this.prismaService.company.update({
      where: { id },
      data: { cnpj, name, url, userId },
    });

    return new Company({
      id: company.id,
      name: company.name,
      cnpj: company.cnpj,
      url: company.url,
      userId: company.userId,
      createdAt: company.createdAt,
      updatedAt: company.updatedAt,
      deletedAt: company.deletedAt,
    });
  }

  async findManyCompanies(): Promise<Company[]> {
    const companies = await this.prismaService.company.findMany();
    return companies.map(
      (company) =>
        new Company({
          id: company.id,
          name: company.name,
          cnpj: company.cnpj,
          url: company.url,
          userId: company.userId,
          createdAt: company.createdAt,
          updatedAt: company.updatedAt,
          deletedAt: company.deletedAt,
        })
    );
  }
}
