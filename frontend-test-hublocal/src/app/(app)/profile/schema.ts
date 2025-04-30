import { z } from "zod";
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
