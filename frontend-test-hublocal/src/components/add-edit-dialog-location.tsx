import { LocationForm } from "@/app/(app)/[id]/locations/location-form";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";

interface AddEditDialogLocationProps {
  open: boolean;
  onClose: () => void;
  title: string;
  locationId?: string;
  companyId?: string;
}

export function AddEditDialogLocation({
  open,
  onClose,
  title,
  locationId,
  companyId,
}: AddEditDialogLocationProps) {
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
        <LocationForm
          locationId={locationId}
          companyId={companyId}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
}
