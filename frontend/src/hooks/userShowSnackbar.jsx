import { useState, useCallback } from "react";
import { Snackbar } from "@mui/material";
import { Alert } from "@mui/material"; 

const useShowToast = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const showToast = useCallback((message, severity = "success") => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  }, []);
  const handleClose = () => {
    setOpen(false);
  };
  return {
    showToast,
    ToastComponent: (
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    ),
  };
};

export default useShowToast;
