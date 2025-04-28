import { api } from "./api-client";

interface CreateLocationRequest {
  name: string;
  cep: string;
  state: string;
  street: string;
  neighborhood: string;
  city: string;
  number: string;
  companyId: string;
}

interface CreateLocationResponse {
  location: {
    name: string;
    cep: string;
    state: string;
    street: string;
    neighborhood: string;
    city: string;
    number: string;
    companyId: string;
  };
}

export async function createLocation({
  cep,
  city,
  name,
  neighborhood,
  street,
  number,
  state,
  companyId,
}: CreateLocationRequest): Promise<CreateLocationResponse> {
  const { data } = await api.post(`locations`, {
    cep,
    city,
    name,
    neighborhood,
    number,
    state,
    street,
    companyId,
  });

  return data;
}
