import { api } from "./api-client";

interface SignInWithPasswordRequest {
  email: string;
  password: string;
}

interface SignInWithPasswordResponse {
  token: string;
}

export async function signInWithPassword({
  email,
  password,
}: SignInWithPasswordRequest): Promise<SignInWithPasswordResponse> {
  const { data } = await api.post<SignInWithPasswordResponse>("users/session", {
    email,
    password,
  });

  return data;
}
