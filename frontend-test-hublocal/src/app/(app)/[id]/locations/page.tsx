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
import { useParams } from "next/navigation";

import { Edit, Delete } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocationsStore } from "@/store/location";
import { DeleteDialogLocation } from "@/components/delete-dialog-location";
import { AddEditDialogLocation } from "@/components/add-edit-dialog-location";

export default function LocationsPage() {
  const { id } = useParams();
  const { locations, loading, getLocations } = useLocationsStore();

  const [deleteDialog, setDeleteDialog] = useState<{
    id: string;
    companyId: string;
    name: string;
    open: boolean;
  }>({ id: "", companyId: id as string, name: "", open: false });

  const [addEditDialog, setAddEditDialog] = useState<{
    id?: string;
    companyId?: string;
    name: string;
    open: boolean;
  }>({ id: "", companyId: id as string, name: "", open: false });

  useEffect(() => {
    getLocations(id as string);
  }, [getLocations]);

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
      {locations.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="60vh"
          borderRadius={2}
        >
          <Typography variant="h4" fontWeight="bold" mb={2}>
            Nenhuma local cadastrado!
          </Typography>
          <Button
            sx={{
              paddingY: 2,
              fontWeight: 700,
            }}
            variant="contained"
            color="primary"
            onClick={() =>
              setAddEditDialog({
                id: "",
                companyId: id as string,
                name: "",
                open: true,
              })
            }
          >
            Adicionar Local
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
              onClick={() =>
                setAddEditDialog({
                  id: "",
                  companyId: id as string,
                  name: "",
                  open: true,
                })
              }
            >
              Adicionar Local
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
                      <b>Local</b>
                    </TableCell>
                    <TableCell
                      sx={{
                        fontWeight: "700",
                        textAlign: "center",
                      }}
                    >
                      <b>Ações</b>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {locations
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((location) => (
                      <TableRow key={location.id}>
                        <TableCell>{location.name}</TableCell>
                        <TableCell
                          sx={{
                            textAlign: "center",
                          }}
                        >
                          <IconButton
                            color="primary"
                            onClick={() =>
                              setAddEditDialog({
                                id: location.id,
                                companyId: location.companyId,
                                name: location.name,
                                open: true,
                              })
                            }
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() =>
                              setDeleteDialog({
                                id: location?.id,
                                companyId: location.companyId,
                                name: location.name,
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
              count={locations.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Qt por página:"
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} de ${count}`
              }
            />
          </Paper>
        </Box>
      )}
      <AddEditDialogLocation
        companyId={addEditDialog?.companyId}
        locationId={addEditDialog.id}
        title={
          addEditDialog.id
            ? `Editar: ${addEditDialog.name}`
            : "Adicionar Empresa"
        }
        open={addEditDialog.open}
        onClose={() =>
          setAddEditDialog({ id: "", companyId: "", name: "", open: false })
        }
      />
      <DeleteDialogLocation
        id={deleteDialog.id}
        name={deleteDialog.name}
        companyId={deleteDialog.companyId}
        open={deleteDialog.open}
        onClose={() =>
          setDeleteDialog({ id: "", companyId: "", name: "", open: false })
        }
      />
    </Box>
  );
}
