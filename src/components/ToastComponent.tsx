import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import { useContext, useEffect, useState } from "react";
import { Alert, Typography } from "@mui/material";
import { ToastContext } from "../pages/providers/toast/toastContext";

export default function ToastComponent({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const [open, setOpen] = useState(true);
  const { toggleToast } = useContext(ToastContext);

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleClose = (
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    toggleToast({ title: "", description: "" });
    setOpen(false);
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          <Typography>
            {title} : {description}
          </Typography>
        </Alert>
      </Snackbar>
    </div>
  );
}
