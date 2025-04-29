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
  cnpj: z.string().min(1, "O CNPJ é obrigatório."),
  url: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

export type CompanySchema = z.infer<typeof companySchema>;

interface CompanyFormProps {
  companyId?: string;
  onClose: () => void;
}

export function CompanyForm({ companyId, onClose }: CompanyFormProps) {
  const { getCompany, company, loading, reset, createCompany, updateCompany } =
    useCompaniesStore();

  const {
    register,
    handleSubmit,
    setValue,
    reset: resetForm,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(companySchema),
  });

  useEffect(() => {
    companyId ? getCompany(companyId) : reset();
  }, [companyId, getCompany]);

  useEffect(() => {
    if (companyId && company) {
      resetForm({
        name: company.name,
        cnpj: company.cnpj,
        url: company.url,
      });
    }
  }, [companyId, company, resetForm]);

  const onSubmit = useCallback(
    async (data: CompanySchema) => {
      try {
        if (companyId) {
          await updateCompany({
            id: companyId,
            cnpj: data.cnpj,
            name: data.name,
            url: data.url,
          });
          toast.success("Empresa atualizada com sucesso!");
          onClose();
        }

        if (!companyId) {
          await createCompany({
            name: data.name,
            cnpj: data.cnpj,
            url: data.url,
          });
          toast.success("Empresa criada com sucesso!");
          onClose();
        }
      } catch (err: any) {
        toast.error(err.message);
      }
    },
    [companyId, toast]
  );

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
          justifyContent: "flex-end",
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
