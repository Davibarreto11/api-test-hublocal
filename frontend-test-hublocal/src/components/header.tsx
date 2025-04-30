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
import Link from "next/link";
import { useRouter } from "next/navigation";
import profileFoto from "@/assets/profile-foto.png";

interface Profile {
  profile: {
    name: string;
    email: string;
  };
}

export default function Header({ profile }: Profile) {
  const router = useRouter();

  const {
    company: companyStore,
    getCompany,
    getCompanies,
    companies,
  } = useCompaniesStore();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorE2, setAnchorE2] = useState<null | HTMLElement>(null);

  useEffect(() => {
    getCompanies();
  }, []);

  const handleMenuOpenProfile = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuOpenCompanies = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorE2(event.currentTarget);
  };

  const handleMenuCloseCompanies = () => {
    setAnchorE2(null);
  };

  const handleMenuCloseProfile = () => {
    router.push("/profile");
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
          <Typography
            sx={{
              cursor: "pointer",
            }}
            onClick={() => router.push("/")}
            variant="h6"
            fontWeight="bold"
          >
            {companyStore?.name || "Minhas Empresas"}
          </Typography>
          <IconButton onClick={handleMenuOpenCompanies} size="small">
            <ExpandMoreIcon />
          </IconButton>
          <Menu
            anchorEl={anchorE2}
            open={Boolean(anchorE2)}
            onClose={handleMenuCloseCompanies}
            sx={{
              mt: 1,
              minWidth: 200,
              boxShadow: 3,
              borderRadius: 2,
            }}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
          >
            {companies.map((company) => (
              <Link key={company.id} href={`/${company.id}/locations`}>
                <MenuItem
                  sx={{
                    fontWeight:
                      company.id === companyStore?.id ? "bold" : "normal",
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                  onClick={() => {
                    getCompany(company.id);
                    handleMenuCloseCompanies();
                  }}
                >
                  {company.name}
                </MenuItem>
              </Link>
            ))}
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
            src={profileFoto.src}
            sx={{ width: 32, height: 32 }}
          />
          <Typography variant="body1">{profile.name}</Typography>
          <IconButton onClick={handleMenuOpenProfile} size="small">
            <ExpandMoreIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuCloseProfile}
          >
            <MenuItem onClick={handleMenuCloseProfile}>Perfil</MenuItem>
            <a href="/api/auth/sign-out">
              <MenuItem onClick={handleMenuCloseProfile}>Sair</MenuItem>
            </a>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
