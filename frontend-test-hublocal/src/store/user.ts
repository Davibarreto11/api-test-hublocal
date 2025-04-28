import { createUser } from "@/http/create-user";
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
  createUser: (data: CreateUserRequest) => Promise<void>;
  reset: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  loading: false,
  error: null,
  user: null,

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

  reset: () => {
    set({ loading: false, error: null, user: null });
  },
}));
