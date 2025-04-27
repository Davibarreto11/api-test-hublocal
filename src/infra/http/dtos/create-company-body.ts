import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateCompanyBody {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  cnpj: string;

  @IsNotEmpty()
  url: string;
}
