"use client";

import { Box, Button, TextField } from "@mui/material";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useUserStore } from "@/store/user";
import { toast } from "react-toastify";

export const signUpSchema = z
  .object({
    name: z.string().nonempty("Por favor, insira um nome."),
    email: z
      .string()
      .email("Por favor, insira um email válido.")
      .min(1, "O email é obrigatório."),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
    passwordConfirmation: z
      .string()
      .min(6, "A confirmação de senha deve ter pelo menos 6 caracteres.")
      .max(20, "A confirmação de senha não pode exceder 20 caracteres."),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "As senhas não coincidem.",
    path: ["passwordConfirmation"],
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;

export default function SignUpPage() {
  const router = useRouter();
  const { createUser, loading, reset } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = useCallback(
    async (data: SignUpSchema) => {
      reset();

      try {
        await createUser({
          name: data.name,
          email: data.email,
          password: data.password,
        });
        toast.success("Conta criada com sucesso!");
        router.push("/auth/sign-in");
      } catch (err: any) {
        toast.error(err.message);
      }
    },
    [router, createUser, reset]
  );

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box textAlign="center" mb={4}>
        <Image src={Logo} alt="HubLocal" width={250} height={80} />
      </Box>

      <TextField
        label="Nome"
        fullWidth
        margin="normal"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        label="Senha"
        type="password"
        fullWidth
        margin="normal"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <TextField
        label="Repetir Senha"
        type="password"
        fullWidth
        margin="normal"
        {...register("passwordConfirmation")}
        error={!!errors.passwordConfirmation}
        helperText={errors.passwordConfirmation?.message}
      />

      <Button
        loading={loading}
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 2, mb: 1, fontWeight: "bold", paddingY: 2 }}
      >
        Registrar
      </Button>

      <Button
        onClick={() => router.push("/auth/sign-in")}
        sx={{
          paddingY: 2,
          fontWeight: "bold",
          width: "100%",
          bgcolor: "#00CC99",
          "&:hover": {
            bgcolor: "#00B38A",
          },
          color: "white",
        }}
        variant="contained"
        autoCapitalize="on"
        fullWidth
      >
        Logar
      </Button>
    </Box>
  );
}
