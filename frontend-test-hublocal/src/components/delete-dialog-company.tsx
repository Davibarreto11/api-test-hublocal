import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useCompaniesStore } from "@/store/company";
import { useCallback } from "react";
import { toast } from "react-toastify";

interface DeleteDialogProps {
  id: string;
  open: boolean;
  name: string;
  onClose: () => void;
}

export function DeleteDialogCompany({
  id,
  open,
  name,
  onClose,
}: DeleteDialogProps) {
  const { removeCompany } = useCompaniesStore();

  const onDelete = useCallback(async () => {
    try {
      await removeCompany(id);
      toast.success("Deletedado com sucesso");
      onClose();
    } catch (err: any) {
      toast.error(err.message);
    }
  }, [id]);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <Box
        sx={{
          backgroundColor: "error.main",
          color: "common.white",
          paddingX: 2,
        }}
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontWeight: 700,
          }}
        >
          Confirmação de exclusão
          <DialogActions>
            <IconButton color="inherit" aria-label="close" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </DialogActions>
        </DialogTitle>
      </Box>
      <DialogContent sx={{ mb: 3 }}>
        <Typography variant="body2">
          A empresa <strong>{name}</strong> será excluída. Tem certeza dessa
          ação?
        </Typography>
      </DialogContent>
      <hr className="" />
      <DialogActions>
        <Button
          sx={{
            paddingY: 2,
          }}
          variant="contained"
          color="error"
          onClick={() => onDelete()}
        >
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
}
