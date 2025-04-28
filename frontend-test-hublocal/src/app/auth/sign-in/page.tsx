"use client";

import { Box, Button, TextField } from "@mui/material";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "./actions";
import { toast } from "react-toastify";

export const loginSchema = z.object({
  email: z.string().email({ message: "E-mail inválido" }),
  password: z
    .string()
    .min(6, { message: "Senha deve ter no mínimo 6 caracteres" }),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = useCallback(
    async (data: LoginSchema) => {
      const token = await signInWithEmailAndPassword(data);
      if (typeof token !== "string") {
        toast.error("Falha no login. Verifique suas credenciais.");
        return;
      }
    },
    [router]
  );

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Box textAlign="center" mb={4}>
        <Image src={Logo} alt="HubLocal" width={250} height={80} />
      </Box>

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

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 2, mb: 1, fontWeight: "bold", paddingY: 2 }}
      >
        LOGAR
      </Button>

      <Button
        onClick={() => router.push("/auth/sign-up")}
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
      >
        CRIAR CONTA
      </Button>
    </Box>
  );
}
