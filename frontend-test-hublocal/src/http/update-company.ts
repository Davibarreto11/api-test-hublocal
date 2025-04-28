import { api } from "./api-client";

interface UpdateCompanyRequest {
  id: string;
  name: string;
  cnpj: string;
  url: string;
}

interface UpdateCompanyResponse {
  company: {
    name: string;
    cnpj: string;
    url: string;
    createdAt: string;
  };
}

export async function updateCompany({
  id,
  cnpj,
  name,
  url,
}: UpdateCompanyRequest): Promise<UpdateCompanyResponse> {
  const { data } = await api.put<UpdateCompanyResponse>(`companies/${id}`, {
    name,
    cnpj,
    url,
  });

  return data;
}
