import { api } from "./api-client";

export interface removeLocationRequest {
  id: string;
}

export async function removeLocation({
  id,
}: removeLocationRequest): Promise<void> {
  const { data } = await api.delete(`locations/${id}`);

  return data;
}
