"use client";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Avatar,
} from "@mui/material";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { useUserStore } from "@/store/user";
import profileFoto from "@/assets/profile-foto.png";
import { toast } from "react-toastify";

export const schema = z
  .object({
    name: z.string().min(1, "Nome é obrigatório"),
    email: z.string().email("E-mail inválido"),
    password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
    passwordConfirmation: z
      .string()
      .min(6, "A confirmação de senha deve ter pelo menos 6 caracteres.")
      .max(20, "A confirmação de senha não pode exceder 20 caracteres."),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "As senhas não coincidem.",
    path: ["passwordConfirmation"],
  });
export type SchemaUser = z.infer<typeof schema>;

export default function ProfilePage() {
  const { getProfile, profile, updateProfile, loading } = useUserStore();

  const {
    register,
    handleSubmit,
    reset: resetForm,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      resetForm({
        name: profile.name,
        email: profile.email,
        password: "",
        passwordConfirmation: "",
      });
    }
  }, [resetForm, profile]);

  const onSubmit = useCallback(
    async ({ email, name, password }: SchemaUser) => {
      try {
        await updateProfile({ email, name, password });
        toast.success("Usuário atualizada com sucesso!");
      } catch (error: any) {
        toast.error(error.message);
      }
    },
    [updateProfile]
  );

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8 }}>
        <Box display="flex" justifyContent="center" mb={2}>
          <Avatar
            alt="Foto de Perfil"
            src={profileFoto.src}
            sx={{ width: 250, height: 250 }}
          />
        </Box>

        <Typography variant="h5" gutterBottom>
          Editar Perfil
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          display="flex"
          flexDirection="column"
          gap={3}
        >
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            label="Nome"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
            fullWidth
            variant="outlined"
          />

          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            label="E-mail"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />

          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Nova Senha "
            label="Senha"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
          />

          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Confirmar senha"
            label="Confirmar senha"
            type="password"
            {...register("passwordConfirmation")}
            error={!!errors.passwordConfirmation}
            helperText={errors.passwordConfirmation?.message}
            fullWidth
          />

          <Button
            loading={loading}
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              paddingY: 2,
            }}
          >
            Salvar Alterações
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
