"use server";

import { signInWithPassword } from "@/http/sign-in-with-password";
import { cookies } from "next/headers";
import { LoginSchema } from "./schema";

export async function signInWithEmailAndPassword({
  email,
  password,
}: LoginSchema) {
  try {
    const { token } = await signInWithPassword({
      email,
      password,
    });

    (await cookies()).set("token", token, {
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return token;
  } catch (err) {
    if (err instanceof Error) {
      const { message } = err;

      console.error(err);
      return { success: false, message, errors: null };
    }
  }
}
