import React, { createContext, useState, useCallback } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Box, CircularProgress } from "@mui/material";

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "info",
    loading: false,
    id: null,
  });

  const showToast = useCallback(
    (message, severity = "info", duration = 3000, id = null) => {
      setToast({ open: true, message, severity, duration, id, loading: false });
    },
    []
  );

  const showLoadingToast = useCallback((message, id) => {
    setToast({ open: true, message, severity: "info", loading: true, id });
  }, []);

  const dismissToast = useCallback((id) => {
    setToast((prev) => {
      if (prev.id === id) {
        return { ...prev, open: false };
      }
      return prev;
    });
  }, []);

  const closeToast = (_, reason) => {
    if (reason === "clickaway") return;
    setToast((prev) => ({ ...prev, open: false }));
  };

  return (
    <ToastContext.Provider
      value={{ showToast, showLoadingToast, dismissToast }}
    >
      {children}
      <Snackbar
        open={toast.open}
        autoHideDuration={toast.loading ? null : toast.duration}
        onClose={closeToast}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Alert
          onClose={closeToast}
          severity={toast.severity}
          sx={{ width: "100%" }}
        >
          {toast.message}{" "}
          {toast.loading && (
            <Box sx={{ display: "flex" }}>
              <CircularProgress size={20} />
            </Box>
          )}
        </Alert>
      </Snackbar>
    </ToastContext.Provider>
  );
};
