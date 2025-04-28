import { api } from "./api-client";

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateUserResponse {
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
  };
}

export async function createUser({
  name,
  email,
  password,
}: CreateUserRequest): Promise<CreateUserResponse> {
  const { data } = await api.post<CreateUserResponse>("users", {
    name,
    email,
    password,
  });

  return data;
}
