"use client";

import { Box, Button, TextField } from "@mui/material";
import Image from "next/image";
import Logo from "@/assets/logo.png";

export default function LoginPage() {
  return (
    <Box>
      <Box textAlign="center" mb={4}>
        <Image src={Logo} alt="HubLocal" width={250} height={80} />
      </Box>

      <TextField label="Email" fullWidth margin="normal" />
      <TextField label="Senha" type="password" fullWidth margin="normal" />
      <TextField label="Senha" type="password" fullWidth margin="normal" />
      <TextField
        label="Repeti senha"
        type="passwordConfirmation"
        fullWidth
        margin="normal"
      />

      <Button
        variant="contained"
        fullWidth
        autoCapitalize="on"
        sx={{ mt: 2, mb: 1, fontWeight: "bold", paddingY: 2 }}
      >
        Registrar
      </Button>

      <Button
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
