import { cookies } from "next/headers";

export async function isAuthenticated() {
  const cookieStore = await cookies();
  return !!cookieStore.get("token")?.value;
}

export async function getCurrentCompany() {
  const cookieStore = await cookies();
  const companyId = cookieStore.get("company")?.value ?? null;
  return companyId;
}
