import { api } from "./api-client";

export interface Location {
  id: string;
  name: string;
  cep: string;
  state: string;
  neighborhood: string;
  city: string;
  street: string;
  number: string;
  companyId: string;
  createdAt?: Date;
  updatedAt?: Date | undefined;
  deletedAt?: Date | null;
}

type GetLocationsResponse = Location[];

export async function getLocations(
  companyId: string
): Promise<GetLocationsResponse> {
  const { data } = await api.get(`locations/${companyId}`);

  return data;
}
