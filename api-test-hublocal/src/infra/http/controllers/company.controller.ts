import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Request,
} from "@nestjs/common";
import { CreateCompanyBody, UpdateCompanyBody } from "../dtos";
import { CompanyViewModel } from "../view-models/company-view-model";
import {
  CreateCompanyCase,
  DeleteCompanyCase,
  GetCompanyUseCase,
  GetManyCompaniesCase,
  UpdateCompanyCase,
} from "@application/company/uses-cases";

interface Request {
  user: {
    userId: string;
  };
}

@Controller("companies")
export class CompanyController {
  constructor(
    private createCompany: CreateCompanyCase,
    private getManyCompanies: GetManyCompaniesCase,
    private getComany: GetCompanyUseCase,
    private deleteCompany: DeleteCompanyCase,
    private updateCompany: UpdateCompanyCase
  ) {}

  @Post()
  async create(@Body() body: CreateCompanyBody, @Request() request: Request) {
    const { name, cnpj, url } = body;

    const { company } = await this.createCompany.execute({
      name,
      cnpj,
      url,
      userId: request.user.userId,
    });

    return { company: CompanyViewModel.toHTTP(company) };
  }

  @Get()
  async getAll() {
    const companies = await this.getManyCompanies.execute();

    return companies.map((company) => CompanyViewModel.toHTTP(company));
  }

  @Put("/:id")
  async update(@Param("id") id: string, @Body() body: UpdateCompanyBody) {
    const { url, name, cnpj } = body;

    const { company } = await this.updateCompany.execute({
      id,
      url,
      name,
      cnpj,
    });

    return { company: CompanyViewModel.toHTTP(company) };
  }

  @Patch("/:id")
  async get(@Param("id") id: string) {
    const commpany = await this.getComany.execute(id);

    return { company: CompanyViewModel.toHTTP(commpany) };
  }

  @Delete("/:id")
  async delete(@Param("id") id: string) {
    await this.deleteCompany.execute(id);
  }
}
