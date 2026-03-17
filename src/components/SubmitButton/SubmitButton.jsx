import { Button } from "@mui/material";

const SubmitButton = ({ disabled, children }) => {
  return (
    <Button
      fullWidth
      variant="contained"
      color="primary"
      disabled={disabled}
      style={{ marginTop: 16 }}
      type="submit"
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
