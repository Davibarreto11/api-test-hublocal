"use server";

import { createUser } from "@/http/create-user";
import { type SignUpSchema } from "./page";

export async function createPatientAction({
  email,
  name,
  password,
}: SignUpSchema) {
  try {
    const patient = await createUser({
      email,
      name,
      password,
    });

    return patient;
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;

      return { success: false, message, errors: null };
    }
  }
}
