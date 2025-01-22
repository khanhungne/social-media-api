import React, { createContext, useContext, useState, useCallback } from "react";
import { Snackbar, Alert } from "@mui/material";
import { CheckCircle, Error, Info, Warning } from "@mui/icons-material";

// Tạo context để quản lý thông báo
const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ open: false, message: "", severity: "info" });

  const showToast = useCallback(
    (message, severity = "info", position = { vertical: "top", horizontal: "center" }) => {
      setToast({ open: true, message, severity, position });
    },
    []
  );

  const handleClose = () => {
    setToast((prev) => ({ ...prev, open: false }));
  };
  const getIcon = (severity) => {
    switch (severity) {
      case "success":
        return <CheckCircle fontSize="inherit" />;
      case "error":
        return <Error fontSize="inherit" />;
      case "warning":
        return <Warning fontSize="inherit" />;
      case "info":
      default:
        return <Info fontSize="inherit" />;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Snackbar
        open={toast.open}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={toast.position || { vertical: "top", horizontal: "center" }}

      >
        <Alert onClose={handleClose} 
        severity={toast.severity} 
        icon={getIcon(toast.severity)}
        variant="filled">
          {toast.message}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};

const useShowToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useShowToast must be used within a ToastProvider");
  }
  return context;
};

export default useShowToast;
