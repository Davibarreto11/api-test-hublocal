import { api } from "./api-client";

export interface removeCompanyRequest {
  id: string;
}

export async function removeCompany({
  id,
}: removeCompanyRequest): Promise<void> {
  const { data } = await api.delete(`companies/${id}`);

  return data;
}
