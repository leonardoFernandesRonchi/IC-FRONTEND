import { Snackbar, Alert } from "@mui/material";

const CustomSnackbar = ({
  open,
  message = "Snackbar",
  variant = "default",
  onClose,
}) => {
  const severityMap = {
    error: "error",
    success: "success",
    default: "info",
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "center", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
        severity={severityMap[variant]}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
