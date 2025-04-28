import { api } from "./api-client";

interface Company {
  id: string;
  name: string;
  cnpj: string;
  url: string;
  _count: number;
  createdAt: Date;
  updatedAt: Date;
}

type GetCompaniesReponse = Company[];

export async function getCompanies(): Promise<GetCompaniesReponse> {
  const { data } = await api.get("companies");

  return data;
}
