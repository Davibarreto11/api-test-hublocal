"use client";

import { Box, Button, TextField } from "@mui/material";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { useLocationsStore } from "@/store/location";

export const locationSchema = z.object({
  name: z.string().nonempty("O nome é obrigatório."),
  cep: z
    .string()
    .min(8, "O CEP deve ter 8 dígitos.")
    .max(9, "O CEP deve ter no máximo 9 caracteres."),
  state: z.string().min(2, "Estado inválido."),
  street: z.string().min(2, "Rua obrigatória."),
  neighborhood: z.string().nonempty("O bairro é obrigatório."),
  city: z.string().nonempty("A cidade é obrigatória."),
  number: z.string().nonempty("O número é obrigatório."),
});

export type LocationSchema = z.infer<typeof locationSchema>;

interface LocationFormProps {
  locationId?: string;
  companyId?: string;
  onClose: () => void;
}

export function LocationForm({
  locationId,
  onClose,
  companyId,
}: LocationFormProps) {
  const {
    getLocation,
    location,
    loading,
    reset,
    createLocation,
    updateLocation,
  } = useLocationsStore();

  const {
    register,
    handleSubmit,
    setValue,
    reset: resetForm,
    formState: { errors },
  } = useForm<LocationSchema>({
    resolver: zodResolver(locationSchema),
  });

  useEffect(() => {
    locationId && getLocation(locationId);
  }, [locationId, getLocation, reset]);

  useEffect(() => {
    if (locationId && location) {
      resetForm({
        name: location.name,
        cep: location.cep,
        state: location.state,
        neighborhood: location.neighborhood,
        street: location.street,
        city: location.city,
        number: location.number,
      });
    }
  }, [locationId, location, resetForm, setValue]);

  const onSubmit = useCallback(
    async (data: LocationSchema) => {
      try {
        if (locationId && companyId) {
          await updateLocation({ id: locationId, companyId, ...data });
          toast.success("Local atualizado com sucesso!");
        } else if (companyId) {
          await createLocation({ companyId: String(companyId), ...data });
          toast.success("Local criado com sucesso!");
        }
        onClose();
      } catch (err: any) {
        toast.error(err.message || "Erro ao salvar local.");
      }
    },
    [createLocation, updateLocation, locationId, onClose]
  );

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Nome"
        fullWidth
        margin="normal"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <TextField
          label="Rua"
          fullWidth
          margin="normal"
          {...register("street")}
          error={!!errors.street}
          helperText={errors.street?.message}
        />
        <TextField
          label="CEP"
          fullWidth
          margin="normal"
          {...register("cep")}
          error={!!errors.cep}
          helperText={errors.cep?.message}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <TextField
          label="Estado"
          fullWidth
          margin="normal"
          {...register("state")}
          error={!!errors.state}
          helperText={errors.state?.message}
        />
        <TextField
          label="Bairro"
          fullWidth
          margin="normal"
          {...register("neighborhood")}
          error={!!errors.neighborhood}
          helperText={errors.neighborhood?.message}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <TextField
          label="Cidade"
          fullWidth
          margin="normal"
          {...register("city")}
          error={!!errors.city}
          helperText={errors.city?.message}
        />
        <TextField
          label="Número"
          fullWidth
          margin="normal"
          {...register("number")}
          error={!!errors.number}
          helperText={errors.number?.message}
        />
      </Box>
      <hr style={{ marginTop: 60 }} />

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2, mb: 1 }}>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{
            fontWeight: "bold",
            paddingY: 2,
          }}
        >
          {locationId ? "Salvar" : "Adicionar"}
        </Button>
      </Box>
    </Box>
  );
}
