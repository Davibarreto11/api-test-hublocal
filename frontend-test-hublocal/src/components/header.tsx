"use client";

import {
  AppBar,
  Toolbar,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

interface Profile {
  profile: {
    name: string;
    email: string;
  };
}

export default function Header({ profile }: Profile) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: "1px solid #eee" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" gap={1}>
          <BusinessIcon fontSize="small" />
          <Typography variant="h6" fontWeight="bold">
            Minhas Empresas
          </Typography>
        </Box>

        <Box display="flex" alignItems="center" gap={1}>
          <Avatar
            alt="Usuário"
            src="/avatar.png"
            sx={{ width: 32, height: 32 }}
          />
          <Typography variant="body1">{profile.name}</Typography>
          <IconButton onClick={handleMenuOpen} size="small">
            <ExpandMoreIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Perfil</MenuItem>
            <MenuItem onClick={handleMenuClose}>Sair</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
