"use client";

import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Pagination,
  TablePagination,
  CircularProgress,
} from "@mui/material";
import { Edit, Delete, Business, LocationOn } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useCompaniesStore } from "@/store/company";

interface Company {
  id: number;
  name: string;
  locations: number;
}

export default function Home() {
  const { companies, loading, getCompanies } = useCompaniesStore();

  useEffect(() => {
    getCompanies();
  }, [getCompanies]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddCompany = () => {
    // lógica para adicionar empresa
    alert("Adicionar Empresa");
  };

  const handleEdit = (id: string) => {
    alert(`Editar empresa ${id}`);
  };

  const handleDelete = (id: string) => {
    alert(`Deletar empresa ${id}`);
  };

  const handleLocations = (id: string) => {
    alert(`Ver locais da empresa ${id}`);
  };

  // if (loading && !companies) {
  //   return (
  //     <Box
  //       height="60vh"
  //       display="flex"
  //       alignItems="center"
  //       justifyContent="center"
  //     >
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  return (
    <Box p={2}>
      {companies.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="60vh"
          borderRadius={2}
        >
          <Typography variant="h4" fontWeight="bold" mb={2}>
            Nenhuma empresa cadastrada!
          </Typography>
          <Button
            sx={{
              paddingY: 2,
              fontWeight: 700,
            }}
            variant="contained"
            color="primary"
            onClick={handleAddCompany}
          >
            Adicionar Empresa
          </Button>
        </Box>
      ) : (
        <Box>
          <Box display="flex" justifyContent="flex-end" mb={2}>
            <Button
              sx={{
                paddingY: 2,
                fontWeight: 700,
              }}
              variant="contained"
              color="primary"
              onClick={handleAddCompany}
            >
              Adicionar Empresa
            </Button>
          </Box>

          <Paper elevation={2}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        fontWeight: "700",
                      }}
                    >
                      <b>Empresa</b>
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "700",
                      }}
                    >
                      <b>Qt de Locais</b>
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "700",
                      }}
                    >
                      <b>Ações</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {companies
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((company) => (
                      <TableRow key={company.id}>
                        <TableCell>{company.name}</TableCell>
                        {/* <TableCell>{company.locations}</TableCell> */}
                        <TableCell>
                          <IconButton
                            color="primary"
                            onClick={() => handleEdit(company.id)}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton
                            color="primary"
                            onClick={() => handleLocations(company.id)}
                          >
                            <Business fontSize="small" />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleDelete(company.id)}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={companies.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Qt por página:"
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} de ${count}`
              }
              nextIconButtonProps={{ title: "Próxima" }}
              backIconButtonProps={{ title: "Anterior" }}
            />
          </Paper>
        </Box>
      )}
    </Box>
  );
}
