import { api } from "./api-client";

export interface CompanyResponse {
  company: {
    id: string;
    name: string;
    cnpj: string;
    url: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export async function getCompany(id: string): Promise<CompanyResponse> {
  const { data } = await api.patch<CompanyResponse>(`companies/${id}`);

  return data;
}
