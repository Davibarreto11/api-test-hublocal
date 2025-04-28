import { create } from "zustand";
import { getCompanies } from "@/http/get-companies";
import { removeCompany } from "@/http/remove-company";
import { getCompany } from "@/http/get-company";
import { createCompany } from "@/http/create-company";
import { updateCompany } from "@/http/update-company";

interface Company {
  id: string;
  name: string;
  cnpj: string;
  url: string;
  _count?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CompaniesStore {
  companies: Company[];
  company: Company | null;
  error: null;
  loading: boolean;
  getCompanies: () => Promise<void>;
  removeCompany: (id: string) => Promise<void>;
  getCompany: (id: string) => Promise<void>;
  createCompany: (company: CreateCompanyInput) => Promise<void>;
  updateCompany: (company: Company) => Promise<void>;
  reset: () => void;
}

type CreateCompanyInput = Omit<Company, "id"> & { id?: undefined };

export const useCompaniesStore = create<CompaniesStore>((set, get) => ({
  loading: false,
  error: null,
  companies: [],
  company: null,

  createCompany: async ({ cnpj, name, url }: CreateCompanyInput) => {
    set({ loading: true });
    try {
      await createCompany({ cnpj, name, url });
      await get().getCompanies();
    } catch (error) {
    } finally {
      set({ loading: false });
    }
  },

  updateCompany: async ({ cnpj, name, url, id }: Company) => {
    set({ loading: true });
    try {
      await updateCompany({ cnpj, name, url, id });
      await get().getCompanies();
    } catch (error) {
    } finally {
      set({ loading: false });
    }
  },

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

  removeCompany: async (id: string) => {
    set({ loading: true });
    try {
      await removeCompany({ id });
      await get().getCompanies();
    } catch (error: any) {
      set({ error: error?.response?.data?.message || "Erro desconhecido" });
      throw new Error(error?.response?.data?.message);
    } finally {
      set({ loading: false });
    }
  },

  getCompany: async (id: string) => {
    set({ loading: true });
    try {
      const { company } = await getCompany(id);
      set({ company });
    } catch (error: any) {
      set({ error: error?.response?.data?.message || "Erro desconhecido" });
      throw new Error(error?.response?.data?.message);
    } finally {
      set({ loading: false });
    }
  },

  reset: () => {
    set({ loading: false, error: null, company: null });
  },
}));
