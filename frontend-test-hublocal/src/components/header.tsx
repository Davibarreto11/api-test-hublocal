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
import { useEffect, useState } from "react";
import { useCompaniesStore } from "@/store/company";
import { getCurrentCompany } from "@/auth/auth";

interface Profile {
  profile: {
    name: string;
    email: string;
  };
}

export default function Header({ profile }: Profile) {
  const { company, getCompany } = useCompaniesStore();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // useEffect(() => {
  //   companyId && getCompany(companyId);
  // }, [companyId]);

  // console.log(company, companyId);

  const handleMenuOpenProfile = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuOpenCompanies = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      color="inherit"
      sx={{
        borderBottom: "1px solid #eee",
      }}
    >
      <Toolbar
        style={{
          padding: 0,
        }}
        sx={{
          display: "flex",
          width: "100vw",
          padding: 0,
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            padding: 2,
            margin: 0,
            bgcolor: "#F5F5F5",
          }}
        >
          <BusinessIcon fontSize="small" />
          <Typography variant="h6" fontWeight="bold">
            {company?.name || "Minhas Empresas"}
          </Typography>
          <IconButton onClick={handleMenuOpenCompanies} size="small">
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

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            padding: 2,
            bgcolor: "#F5F5F5",
          }}
        >
          <Avatar
            alt="Usuário"
            src="/avatar.png"
            sx={{ width: 32, height: 32 }}
          />
          <Typography variant="body1">{profile.name}</Typography>
          <IconButton onClick={handleMenuOpenProfile} size="small">
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
