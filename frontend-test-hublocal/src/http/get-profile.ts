import { api } from "./api-client";

export interface UserResponse {
  user: {
    name: string;
    email: string;
  };
}

export async function getProfile(): Promise<UserResponse> {
  const { data } = await api.patch<UserResponse>("users");

  return data;
}
