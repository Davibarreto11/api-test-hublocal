import { CompanyForm } from "@/app/(app)/company-form";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";

interface AddEditDialogCompanyProps {
  open: boolean;
  onClose: () => void;
  title: string;
  companyId?: string;
}

export function AddEditDialogCompany({
  open,
  onClose,
  title,
  companyId,
}: AddEditDialogCompanyProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.primary.main,
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
            color: "white",
          }}
        >
          {title}
          <DialogActions>
            <IconButton color="inherit" aria-label="close" onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </DialogActions>
        </DialogTitle>
      </Box>
      <DialogContent>
        <CompanyForm companyId={companyId} onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
}
