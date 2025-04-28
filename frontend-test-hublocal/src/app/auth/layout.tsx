import Grid from "@mui/material/Grid";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Background from "@/assets/client.png";
import { isAuthenticated } from "@/auth/auth";
import { redirect } from "next/navigation";

// import { isAuthenticated } from "@/auth/auth";
// import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authenticated = await isAuthenticated();

  if (authenticated) {
    redirect("/");
  }

  return (
    <Grid
      container
      sx={{
        minHeight: "100vh",
      }}
    >
      <Grid
        size={{ xl: 6, lg: 6, md: 6, sm: 0, xs: 0 }}
        sx={{
          backgroundColor: "#0077FF",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "white",
          textAlign: "center",
        }}
      >
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            width: "100%",
            height: "100%",
            flex: 1,
          }}
        >
          <Image
            style={{ objectFit: "cover", flex: 1 }}
            src={Background}
            fill
            alt="Clientes Satisfeitos"
          />
        </Box>

        <Box
          sx={{
            width: "100%",
            bgcolor: "#00CC99",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyItems: "center",
            paddingY: 2,
          }}
        >
          <Typography variant="h3" fontWeight="bold" maxWidth="450px" mb={2}>
            Junte-se a vários clientes satisfeitos.
          </Typography>
          <Typography variant="subtitle1" fontWeight="normal" maxWidth="600px">
            Cliente HubLocal ganha mais relevância, autoridade e visibilidade.
            Mais de 2000 marcas confiam na nossa plataforma. Seja uma delas!
          </Typography>
        </Box>
      </Grid>

      <Grid
        size={{ xl: 6, lg: 6, md: 6, sm: 12, xs: 12 }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 4,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 400 }}>{children}</Box>
      </Grid>
    </Grid>
  );
}
