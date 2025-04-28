// stores/companies-store.ts
import { create } from "zustand";
import { getCompanies } from "@/http/get-companies";

interface Company {
  id: string;
  name: string;
  cnpj: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CompaniesStore {
  companies: Company[];
  loading: boolean;
  getCompanies: () => Promise<void>;
}

export const useCompaniesStore = create<CompaniesStore>((set) => ({
  companies: [],
  loading: false,

  getCompanies: async () => {
    set({ loading: true });
    try {
      const companies = await getCompanies();
      set({ companies });
    } catch (error) {
    } finally {
      set({ loading: false });
    }
  },
}));
