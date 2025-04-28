import { redirect } from "next/navigation";

import { isAuthenticated } from "@/auth/auth";
import Header from "@/components/header";
import { getProfile } from "@/http/get-profile";

export default async function AppLayout({
  children,
}: // sheet,
Readonly<{
  children: React.ReactNode;
  // sheet: React.ReactNode
}>) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/auth/sign-in");
  }
  const { user } = await getProfile();
  return (
    <div className="flex flex-col px-10">
      <Header profile={user} />
      {children}
      {/* {sheet} */}
    </div>
  );
}
