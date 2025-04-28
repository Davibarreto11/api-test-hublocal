import { api } from "./api-client";

interface CreateCompanyRequest {
  name: string;
  cnpj: string;
  url: string;
}

interface CreateCompanyResponse {
  company: {
    name: string;
    cnpj: string;
    url: string;
    createdAt: string;
  };
}

export async function createCompany({
  cnpj,
  name,
  url,
}: CreateCompanyRequest): Promise<CreateCompanyResponse> {
  const { data } = await api.post<CreateCompanyResponse>("companies", {
    name,
    cnpj,
    url,
  });

  return data;
}
