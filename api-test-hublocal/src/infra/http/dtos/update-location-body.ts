import { IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateLocationBody {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  cep?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  neighborhood?: string;

  @IsOptional()
  @IsString()
  street?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  number?: string;

  @IsOptional()
  @IsUUID()
  companyId?: string;
}
