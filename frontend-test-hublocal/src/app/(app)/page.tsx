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
} from "@mui/material";
import { Edit, Delete, Business, LocationOn } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useCompaniesStore } from "@/store/company";
import { DeleteDialogCompany } from "@/components/delete-dialog-company";
import { AddEditDialogCompany } from "@/components/add-edit-dialog-company";
import { useRouter } from "next/navigation";

interface Company {
  id: number;
  name: string;
  locations: number;
}

export default function Home() {
  const router = useRouter();
  const { companies, loading, getCompanies, getCompany, reset } =
    useCompaniesStore();

  const [deleteDialog, setDeleteDialog] = useState<{
    id: string;
    name: string;
    open: boolean;
  }>({ id: "", name: "", open: false });

  const [addEditDialog, setAddEditDialog] = useState<{
    id?: string;
    name?: string;
    open: boolean;
  }>({ id: "", name: "", open: false });

  useEffect(() => {
    reset();
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
            onClick={() => setAddEditDialog({ id: "", name: "", open: true })}
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
              onClick={() => setAddEditDialog({ id: "", name: "", open: true })}
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
                        <TableCell>{company._count}</TableCell>
                        <TableCell>
                          <IconButton
                            color="primary"
                            onClick={() =>
                              setAddEditDialog({
                                id: company.id,
                                name: company.name,
                                open: true,
                              })
                            }
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton
                            color="primary"
                            onClick={() => {
                              getCompany(company.id);
                              router.push(`${company.id}/locations`);
                            }}
                          >
                            <Business fontSize="small" />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() =>
                              setDeleteDialog({
                                id: company?.id,
                                name: company.name,
                                open: true,
                              })
                            }
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
              // getItemAriaLabel={(type) => {
              //   if (type === "next") return "Próxima página";
              //   if (type === "previous") return "Página anterior";
              //   if (type === "first") return "Primeira página";
              //   if (type === "last") return "Última página";
              //   return "";
              // }}
            />
          </Paper>
        </Box>
      )}
      <AddEditDialogCompany
        companyId={addEditDialog?.id}
        title={
          addEditDialog.id
            ? `Editar: ${addEditDialog.name}`
            : "Adicionar Empresa"
        }
        open={addEditDialog.open}
        onClose={() => setAddEditDialog({ id: "", name: "", open: false })}
      />
      <DeleteDialogCompany
        id={deleteDialog.id}
        name={deleteDialog.name}
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ id: "", name: "", open: false })}
      />
    </Box>
  );
}
