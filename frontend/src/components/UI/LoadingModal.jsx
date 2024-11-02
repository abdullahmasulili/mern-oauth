/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogContent,
  DialogTitle,
  LinearProgress,
} from "@mui/material";

export default function LoadingModal({ isOpen, title }) {
  return (
    <Dialog open={isOpen} fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <LinearProgress />
      </DialogContent>
    </Dialog>
  );
}
