import { z } from "zod";

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
