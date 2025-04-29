import { redirect } from "next/navigation";

import { isAuthenticated } from "@/auth/auth";
import Header from "@/components/header";
import { getProfile } from "@/http/get-profile";
import { Box } from "@mui/material";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authenticated = await isAuthenticated();

  if (!authenticated) {
    redirect("/auth/sign-in");
  }
  const { user } = await getProfile();
  return (
    <Box
      height="100vh"
      sx={{
        bgcolor: "#F5F5F5",
      }}
    >
      <Header profile={user} />
      {children}
    </Box>
  );
}
