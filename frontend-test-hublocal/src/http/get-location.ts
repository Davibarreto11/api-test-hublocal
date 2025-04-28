import { api } from "./api-client";

export interface LocationResponse {
  location: {
    id: string;
    name: string;
    cep: string;
    state: string;
    neighborhood: string;
    street: string;
    city: string;
    number: string;
    companyId: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
  };
}

export async function getLocation(id: string): Promise<LocationResponse> {
  const { data } = await api.patch<LocationResponse>(`locations/${id}`);

  return data;
}
