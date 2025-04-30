import { api } from "./api-client";

export interface UserResponse {
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
  };
}

export async function getProfile(): Promise<UserResponse> {
  const { data } = await api.patch<UserResponse>("users");

  return data;
}
