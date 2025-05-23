import { createUser } from "@/http/create-user";
import { getProfile } from "@/http/get-profile";
import { updateUser } from "@/http/update-profile";
import { create } from "zustand";

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

interface UserStore {
  loading: boolean;
  error: string | null;
  user: CreateUserResponse["user"] | null;
  profile: CreateUserResponse["user"] | null;
  createUser: (data: CreateUserRequest) => Promise<void>;
  getProfile: () => Promise<void>;
  updateProfile: ({
    email,
    name,
    password,
  }: Partial<CreateUserRequest>) => Promise<void>;
  reset: () => void;
}

export const useUserStore = create<UserStore>((set, get) => ({
  loading: false,
  error: null,
  user: null,
  profile: null,

  createUser: async (userData) => {
    set({ loading: true, error: null, user: null });

    try {
      const { user } = await createUser(userData);
      set({ user });
    } catch (error: any) {
      console.error("Erro ao criar usuário", error);
      set({ error: error?.response?.data?.message || "Erro desconhecido" });
      throw new Error(error?.response?.data?.message);
    } finally {
      set({ loading: false });
    }
  },

  getProfile: async () => {
    set({ loading: true });
    try {
      const { user } = await getProfile();
      set({ profile: user });
    } catch (error: any) {
      set({ error: error?.response?.data?.message || "Erro desconhecido" });
      throw new Error(error?.response?.data?.message);
    } finally {
      set({ loading: false });
    }
  },

  updateProfile: async ({
    email,
    name,
    password,
  }: Partial<CreateUserRequest>) => {
    set({ loading: true, error: null });
    try {
      if (!email || !name || !password) return;
      await updateUser({ email, name, password });
      await get().getProfile();
    } catch (error: any) {
      set({
        error: error?.response?.data?.message || "Erro ao atualizar localidade",
      });
      throw new Error(error?.response?.data?.message);
    } finally {
      set({ loading: false });
    }
  },

  reset: () => {
    set({ loading: false, error: null, user: null });
  },
}));
