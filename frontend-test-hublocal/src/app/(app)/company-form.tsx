"use client";

import { Box, Button, TextField } from "@mui/material";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { useCompaniesStore } from "@/store/company";

export const companySchema = z.object({
  name: z.string().nonempty("Por favor, insira um nome."),
  cnpj: z
    .string()
    .email("Por favor, insira um email válido.")
    .min(1, "O email é obrigatório."),
  url: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

export type SignUpSchema = z.infer<typeof companySchema>;

interface CompanyFormProps {
  companyId?: string;
}

export function CompanyForm({ companyId }: CompanyFormProps) {
  const { getCompany, company, loading, reset } = useCompaniesStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(companySchema),
  });

  useEffect(() => {
    companyId ? getCompany(companyId) : reset();
  }, [companyId, getCompany]);

  const onSubmit = useCallback(async (data: SignUpSchema) => {
    try {
      if (companyId) {
        // await createUser({
        //   name: data.name,
        //   email: data.email,
        //   password: data.password,
        // });
        toast.success("Empresa atualizada com sucesso!");
      } else {
        // await createUser({
        //   name: data.name,
        //   email: data.email,
        //   password: data.password,
        // });
        toast.success("Empresa criada com sucesso!");
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  }, []);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Nome"
        fullWidth
        defaultValue={company?.name}
        margin="normal"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <Box
        sx={{
          display: "flex",
          gap: 5,
        }}
      >
        <TextField
          label="CNPJ"
          fullWidth
          margin="normal"
          defaultValue={company?.cnpj}
          {...register("cnpj")}
          error={!!errors.cnpj}
          helperText={errors.cnpj?.message}
        />
        <TextField
          label="Website"
          type="text"
          fullWidth
          defaultValue={company?.url}
          margin="normal"
          {...register("url")}
          error={!!errors.url}
          helperText={errors.url?.message}
        />
      </Box>

      <hr
        style={{
          marginTop: 60,
        }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end", // Alinha o botão para a direita
          mt: 2,
          mb: 1,
        }}
      >
        <Button
          loading={loading}
          type="submit"
          variant="contained"
          sx={{
            fontWeight: "bold",
            paddingY: 2,
          }}
        >
          {companyId ? "Salvar" : "Adiconar"}
        </Button>
      </Box>
    </Box>
  );
}
