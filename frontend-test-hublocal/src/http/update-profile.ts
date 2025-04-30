import { api } from "./api-client";

interface UpdateUserRequest {
  email: string;
  name: string;
  password: string;
}

interface UpdateUserResponse {
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
  };
}

export async function updateUser({
  email,
  name,
  password,
}: UpdateUserRequest): Promise<UpdateUserResponse> {
  const { data } = await api.put(`users`, {
    email,
    name,
    password,
  });

  return data;
}
