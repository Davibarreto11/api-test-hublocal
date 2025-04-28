import { api } from "./api-client";

interface UpdateLocationRequest {
  id: string;
  name: string;
  cep: string;
  state: string;
  street: string;
  neighborhood: string;
  city: string;
  number: string;
}

interface UpdateLocationResponse {
  location: {
    id: string;
    name: string;
    cep: string;
    state: string;
    neighborhood: string;
    city: string;
    number: string;
    companyId: string;
    createdAt: string;
    updatedAt?: Date;
    deletedAt: Date | null;
  };
}

export async function updateLocation({
  cep,
  city,
  id,
  name,
  street,
  neighborhood,
  number,
  state,
}: UpdateLocationRequest): Promise<UpdateLocationResponse> {
  console.log(street);
  const { data } = await api.put(`locations/${id}`, {
    cep,
    city,
    id,
    name,
    street,
    neighborhood,
    number,
    state,
  });

  return data;
}
