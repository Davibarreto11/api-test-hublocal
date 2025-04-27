import { IsString, IsOptional } from "class-validator";

export class UpdateCompanyBody {
  @IsOptional()
  @IsString()
  name: string;

  @IsString()
  cnpj: string;

  @IsOptional()
  @IsString()
  url: string;
}
