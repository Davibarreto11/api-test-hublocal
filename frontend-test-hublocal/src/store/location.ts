import { create } from "zustand";

import { getLocations } from "@/http/get-locations";
import { getLocation } from "@/http/get-location";
import { createLocation } from "@/http/create-location";
import { updateLocation } from "@/http/update-location";
import { removeLocation } from "@/http/remove-location";

interface Location {
  id: string;
  name: string;
  cep: string;
  state: string;
  neighborhood: string;
  city: string;
  street: string;
  number: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
  companyId: string;
}

type CreateLocationInput = Omit<Location, "id"> & {
  id?: undefined;
};

interface LocationsStore {
  locations: Location[];
  location: Location | null;
  loading: boolean;
  error: string | null;

  getLocations: (companyId: string) => Promise<void>;
  getLocation: (id: string) => Promise<void>;
  createLocation: (input: CreateLocationInput) => Promise<void>;
  updateLocation: (location: Location) => Promise<void>;
  removeLocation: (id: string, companyId: string) => Promise<void>;
  reset: () => void;
}

export const useLocationsStore = create<LocationsStore>((set, get) => ({
  locations: [],
  location: null,
  loading: false,
  error: null,

  getLocations: async (companyId: string) => {
    set({ loading: true, error: null });
    try {
      const locations = await getLocations(companyId);
      set({ locations });
    } catch (error: any) {
      set({
        error: error?.response?.data?.message || "Erro ao remover localidade",
      });
      throw new Error(error?.response?.data?.message);
    } finally {
      set({ loading: false });
    }
  },

  getLocation: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const { location } = await getLocation(id);
      set({ location });
    } catch (error: any) {
      set({
        error: error?.response?.data?.message || "Erro ao remover localidade",
      });
      throw new Error(error?.response?.data?.message);
    } finally {
      set({ loading: false });
    }
  },

  createLocation: async (data: CreateLocationInput) => {
    set({ loading: true, error: null });
    try {
      await createLocation(data);
      await get().getLocations(data.companyId);
    } catch (error: any) {
      set({
        error: error?.response?.data?.message || "Erro ao remover localidade",
      });
      throw new Error(error?.response?.data?.message);
    } finally {
      set({ loading: false });
    }
  },

  updateLocation: async (data: Location) => {
    set({ loading: true, error: null });
    try {
      await updateLocation(data);
      await get().getLocations(data.companyId);
    } catch (error: any) {
      set({
        error: error?.response?.data?.message || "Erro ao remover localidade",
      });
      throw new Error(error?.response?.data?.message);
    } finally {
      set({ loading: false });
    }
  },

  removeLocation: async (id: string, companyId: string) => {
    set({ loading: true, error: null });
    try {
      await removeLocation({ id });
      await get().getLocations(companyId);
    } catch (error: any) {
      set({
        error: error?.response?.data?.message || "Erro ao remover localidade",
      });
      throw new Error(error?.response?.data?.message);
    } finally {
      set({ loading: false });
    }
  },

  reset: () => {
    set({ locations: [], location: null, loading: false, error: null });
  },
}));
